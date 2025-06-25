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
    setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = Cookies.get('accessToken');
      const refreshTokenValue = Cookies.get('refreshToken');

      if (!accessToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const userData = await getUser(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        if (refreshTokenValue) {
          try {
            const response = await refreshToken(refreshTokenValue);

            Cookies.set('accessToken', response.accessToken, {
              secure: true,
              sameSite: 'strict',
              expires: 1
            });

            try {
              const userData = await getUser(response.accessToken);
              setUser(userData);
              setIsAuthenticated(true);
            } catch (userDataError) {
              setUser(response.user);
              setIsAuthenticated(true);
            }
          } catch (refreshError) {
            await handleLogout(false);
          }
        } else {
          await handleLogout(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
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

      setUser(userData);
      setIsAuthenticated(true);

      if (userData.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }

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

      const userData = await getUser(token);

      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error: any) {
      console.error('Login with token failed:', error);
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
        await logout(refreshTokenValue);
      }
    } catch (error) {
      console.error('Logout error:', error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};