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
  isUserAuthenticated: () => boolean;
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
  setIsAuthenticated: () => { },
  isUserAuthenticated: () => false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const isUserAuthenticated = useCallback((): boolean => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    return Boolean((accessToken || refreshToken || isAuthenticated) && !loading);
  }, [isAuthenticated, loading]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);


  const updateUserData = useCallback((userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser && userData.id) {
        setIsAuthenticated(true);
        return userData as User;
      }
      return prevUser ? { ...prevUser, ...userData } : null;
    });
  }, []);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    const accessToken = Cookies.get('accessToken');
    const refreshTokenValue = Cookies.get('refreshToken');

    if (!accessToken && !refreshTokenValue) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }

    if (accessToken) {
      try {
        const userData = await getUser();
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error('Failed to get user data with access token:', error);
      }
    }

    if (refreshTokenValue) {
      try {
        const response = await refreshToken(refreshTokenValue);

        Cookies.set('accessToken', response.accessToken, {
          secure: true,
          sameSite: 'strict',
          expires: 1
        });

        try {
          const userData = await getUser();
          setUser(userData);
          setIsAuthenticated(true);
          return true;
        } catch (userDataError) {
          if (response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
            return true;
          }
          throw userDataError;
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return false;
      }
    }

    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove('accessToken');
    return false;
  }, []);

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
    setLoading(true);

    try {
      clearError();

      const response = await login(email, password);

      Cookies.set('accessToken', response.accessToken, {
        secure: true,
        sameSite: 'strict',
        expires: 1
      });

      Cookies.set('refreshToken', response.refreshToken, {
        secure: true,
        sameSite: 'strict',
        expires: 7
      });

      let userData = response.user;

      try {
        const fullUserData = await getUser();
        userData = {
          ...userData,
          ...fullUserData,
          firstName: fullUserData.firstName || userData.firstName || '',
          lastName: fullUserData.lastName || userData.lastName || ''
        };
      } catch (profileError) {
        console.warn('Could not fetch complete profile, using basic user data', profileError);
      }

      setUser(userData);
      setIsAuthenticated(true);

      setTimeout(() => {
        if (userData.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }, 20000);

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

      const userData = await getUser();

      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error: any) {
      console.error('Login with token failed:', error);
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
      const refreshTokenValue = Cookies.get('refreshToken');
      if (refreshTokenValue) {
        await logout(refreshTokenValue).catch(err => {
          console.warn('Server logout failed, continuing with client logout:', err);
        });
      }
    } finally {
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
    isUserAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated, loading, checkAuthStatus } = context;

  useEffect(() => {
    const hasAccessToken = !!Cookies.get('accessToken');
    const hasRefreshToken = !!Cookies.get('refreshToken');

    if ((hasAccessToken || hasRefreshToken) && !isAuthenticated && !loading) {
      checkAuthStatus();
    } else if (!hasAccessToken && !hasRefreshToken && isAuthenticated && !loading) {
      context.setIsAuthenticated(false);
    }
  }, [context, isAuthenticated, loading, checkAuthStatus]);

  return context;
};