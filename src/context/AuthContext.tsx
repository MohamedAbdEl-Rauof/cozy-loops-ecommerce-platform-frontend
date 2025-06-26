'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout, refreshToken, getUser } from '@/services/authService';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  emailVerified?: boolean;
  [key: string]: any;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginWithToken: (token: string, refreshTokenValue?: string) => Promise<User>;
  register: (userData: RegisterData) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateUserData: (userData: Partial<User>) => void;
  clearError: () => void;
  checkAuthStatus: () => Promise<boolean>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => ({ accessToken: '', refreshToken: '', user: {} as User }),
  loginWithToken: async () => ({} as User),
  register: async () => ({}),
  logout: async () => { },
  isAuthenticated: false,
  updateUserData: () => { },
  clearError: () => { },
  checkAuthStatus: async () => false,
  setIsAuthenticated: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateUserData = useCallback((userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser && userData.id) {
        // If we're setting user data for the first time, ensure we mark as authenticated
        setIsAuthenticated(true);
        return userData as User;
      }
      return prevUser ? { ...prevUser, ...userData } : null;
    });
  }, []);

  // Improved checkAuthStatus function that can be called anywhere
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    const accessToken = Cookies.get('accessToken');
    const refreshTokenValue = Cookies.get('refreshToken');

    // If no tokens at all, we're definitely not authenticated
    if (!accessToken && !refreshTokenValue) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    // Try with access token first
    if (accessToken) {
      try {
        const userData = await getUser(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.log('Access token invalid, trying refresh token');
        // Access token failed, try refresh token if available
      }
    }

    // Try with refresh token if access token failed or doesn't exist
    if (refreshTokenValue) {
      try {
        const response = await refreshToken(refreshTokenValue);
        
        // Store the new access token
        Cookies.set('accessToken', response.accessToken, {
          secure: true,
          sameSite: 'strict',
          expires: 1
        });

        try {
          // Get full user data with new token
          const userData = await getUser(response.accessToken);
          setUser(userData);
          setIsAuthenticated(true);
          return true;
        } catch (userDataError) {
          // If we can't get full user data, use what we have from refresh response
          if (response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
            return true;
          }
          throw userDataError;
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Both tokens failed, clear everything
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return false;
      }
    }

    // If we got here with an access token but no refresh token and the access token failed
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove('accessToken');
    return false;
  }, []);

  // Initial auth check on mount
  useEffect(() => {
    const initialAuthCheck = async () => {
      try {
        await checkAuthStatus();
      } finally {
        setLoading(false);
      }
    };

    initialAuthCheck();
  }, [checkAuthStatus]);

  const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      clearError();

      const response = await login(email, password);

      // Store tokens in cookies with proper security settings
      Cookies.set('accessToken', response.accessToken, {
        secure: true,
        sameSite: 'strict',
        expires: 1 // 1 day
      });

      Cookies.set('refreshToken', response.refreshToken, {
        secure: true,
        sameSite: 'strict',
        expires: 7 // 7 days
      });

      let userData = response.user;

      try {
        // Get complete user profile
        const fullUserData = await getUser(response.accessToken);
        userData = {
          ...userData,
          ...fullUserData,
          firstName: fullUserData.firstName || userData.firstName || '',
          lastName: fullUserData.lastName || userData.lastName || ''
        };
      } catch (profileError) {
        console.warn('Could not fetch complete profile, using basic user data', profileError);
      }

      // Update auth state
      setUser(userData);
      setIsAuthenticated(true);

      // Navigate based on user role
      setTimeout(() => {
        if (userData.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }, 0);

      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: userData
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithToken = async (token: string, refreshTokenValue?: string): Promise<User> => {
    try {
      setLoading(true);
      clearError();

      // Store the provided token
      Cookies.set('accessToken', token, {
        secure: true,
        sameSite: 'strict',
        expires: 1
      });

      if (refreshTokenValue) {
        Cookies.set('refreshToken', refreshTokenValue, {
          secure: true,
          sameSite: 'strict',
          expires: 7
        });
      }

      // Verify token by getting user data
      const userData = await getUser(token);

      // Update auth state
      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error: any) {
      console.error('Login with token failed:', error);
      // Clean up invalid tokens
      Cookies.remove('accessToken');
      if (refreshTokenValue) Cookies.remove('refreshToken');
      
      setError(error.message || 'Failed to authenticate with token');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: RegisterData): Promise<any> => {
    try {
      setLoading(true);
      clearError();
      const response = await register(userData);
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (redirect: boolean = true): Promise<void> => {
    try {
      // Attempt to notify the server about logout
      const refreshTokenValue = Cookies.get('refreshToken');
      if (refreshTokenValue) {
        await logout(refreshTokenValue).catch(err => {
          // Just log the error but continue with client-side logout
          console.warn('Server logout failed, continuing with client logout:', err);
        });
      }
    } finally {
      // Always clear tokens and state regardless of server response
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      setUser(null);
      setIsAuthenticated(false);

      if (redirect) {
        router.push('/auth/login');
      }
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login: handleLogin,
    loginWithToken,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated,
    updateUserData,
    clearError,
    checkAuthStatus,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated, loading, checkAuthStatus } = context;

  // Enhanced authentication check that runs when the hook is used
  useEffect(() => {
    const hasAccessToken = !!Cookies.get('accessToken');
    const hasRefreshToken = !!Cookies.get('refreshToken');

    // If we have tokens but the context doesn't think we're authenticated,
    // this could be a state inconsistency that needs fixing
    if ((hasAccessToken || hasRefreshToken) && !isAuthenticated && !loading) {
      console.log('Token detected but not authenticated, refreshing auth state');
      checkAuthStatus();
    } else if (!hasAccessToken && !hasRefreshToken && isAuthenticated && !loading) {
      // If we don't have tokens but think we're authenticated, fix the state
      console.log('No tokens found but marked as authenticated, fixing state');
      context.setIsAuthenticated(false);
    }
  }, [context, isAuthenticated, loading, checkAuthStatus]);

  return context;
};