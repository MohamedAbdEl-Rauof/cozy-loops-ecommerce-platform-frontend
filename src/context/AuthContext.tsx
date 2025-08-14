'use client';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback, useRef } from 'react';

import {
  useUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  USER_QUERY_KEYS
} from '@/hooks/useUser';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  emailVerified?: boolean;
  avatar?: string;
  phone?: string;
  [key: string]: unknown;
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
  [key: string]: unknown;
}

interface AuthError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (_email: string, _password: string) => Promise<AuthResponse>;
  loginWithToken: (_token: string, _refreshTokenValue?: string) => Promise<User>;
  loginWithGoogle: (_token: string) => Promise<AuthResponse>;
  loginWithInstagram: (_code: string) => Promise<AuthResponse>; // Fixed: added missing closing parenthesis
  register: (_userData: RegisterData) => Promise<unknown>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  clearError: () => void;
  checkAuthStatus: () => Promise<boolean>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAuthenticated: () => boolean;
  refetchUser: () => Promise<void>;
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
  loginWithGoogle: async () => ({ accessToken: '', refreshToken: '', user: {} as User }),
  loginWithInstagram: async () => ({ accessToken: '', refreshToken: '', user: {} as User }),
  register: async () => ({}),
  logout: async () => { },
  isAuthenticated: false,
  clearError: () => { },
  checkAuthStatus: async () => false,
  setIsAuthenticated: () => { },
  isUserAuthenticated: () => false,
  refetchUser: async () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [authCheckInProgress, setAuthCheckInProgress] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const authCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastAuthCheckRef = useRef<number>(0);
  const isRefreshingRef = useRef<boolean>(false);

  const { data: user, isLoading: userLoading, refetch: refetchUserQuery } = useUserQuery(isAuthenticated);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();
  const refreshTokenMutation = useRefreshTokenMutation();

  const loading = initialLoading || userLoading || loginMutation.isPending || logoutMutation.isPending || authCheckInProgress;

  const isUserAuthenticated = useCallback((): boolean => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    return Boolean((accessToken || refreshToken || isAuthenticated) && !loading);
  }, [isAuthenticated, loading]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const debouncedCheckAuthStatus = useCallback(async (): Promise<boolean> => {
    const now = Date.now();
    const timeSinceLastCheck = now - lastAuthCheckRef.current;

    if (timeSinceLastCheck < 1000 || authCheckInProgress || isRefreshingRef.current) {
      return isAuthenticated;
    }

    lastAuthCheckRef.current = now;
    setAuthCheckInProgress(true);

    try {
      const accessToken = Cookies.get('accessToken');
      const refreshTokenValue = Cookies.get('refreshToken');

      if (!accessToken && !refreshTokenValue) {
        setIsAuthenticated(false);
        queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.user });
        return false;
      }

      if (accessToken) {
        try {
          setIsAuthenticated(true);
          await refetchUserQuery();
          return true;
        } catch (error: unknown) {
          console.error('Failed to get user data with access token:', error);
          const authError = error as AuthError;
          if (authError?.response?.status === 401 && refreshTokenValue) {
          } else {
            setIsAuthenticated(false);
            return false;
          }
        }
      }

      if (refreshTokenValue && !isRefreshingRef.current) {
        try {
          isRefreshingRef.current = true;
          await refreshTokenMutation.mutateAsync(refreshTokenValue);
          setIsAuthenticated(true);
          await refetchUserQuery();
          return true;
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          setIsAuthenticated(false);
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.user });
          return false;
        } finally {
          isRefreshingRef.current = false;
        }
      }

      setIsAuthenticated(false);
      return false;
    } finally {
      setAuthCheckInProgress(false);
    }
  }, [isAuthenticated, authCheckInProgress, refetchUserQuery, refreshTokenMutation, queryClient]);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    if (authCheckTimeoutRef.current) {
      clearTimeout(authCheckTimeoutRef.current);
    }

    return new Promise((resolve) => {
      authCheckTimeoutRef.current = setTimeout(async () => {
        const result = await debouncedCheckAuthStatus();
        resolve(result);
      }, 100);
    });
  }, [debouncedCheckAuthStatus]);

  useEffect(() => {
    const initialAuthCheck = async () => {
      try {
        await debouncedCheckAuthStatus();
      } finally {
        setInitialLoading(false);
      }
    };

    initialAuthCheck();

    return () => {
      if (authCheckTimeoutRef.current) {
        clearTimeout(authCheckTimeoutRef.current);
      }
    };
  }, [debouncedCheckAuthStatus]);

  const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      clearError();

      const response = await loginMutation.mutateAsync({ email, password });
      setIsAuthenticated(true);

      await refetchUserQuery();

      setTimeout(() => {
        if (response.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }, 100);

      return response;
    } catch (error: unknown) {
      const authError = error as AuthError;
      const errorMessage = authError?.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    }
  };

  const loginWithToken = async (token: string, refreshTokenValue?: string): Promise<User> => {
    try {
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

      setIsAuthenticated(true);
      const { data: userData } = await refetchUserQuery();

      if (!userData) {
        throw new Error('Failed to fetch user data');
      }

      return userData;
    } catch (error: unknown) {
      console.error('Login with token failed:', error);
      Cookies.remove('accessToken');
      if (refreshTokenValue) Cookies.remove('refreshToken');
      setIsAuthenticated(false);

      const authError = error as AuthError;
      setError(authError?.message || 'Failed to authenticate with token');
      throw error;
    }
  };

  const handleRegister = async (userData: RegisterData): Promise<unknown> => {
    try {
      clearError();
      const response = await registerMutation.mutateAsync(userData);
      return response;
    } catch (error: unknown) {
      const authError = error as AuthError;
      const errorMessage = authError?.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw error;
    }
  };

  const handleLogout = async (redirect: boolean = true): Promise<void> => {
    try {
      await logoutMutation.mutateAsync();
      setIsAuthenticated(false);
      isRefreshingRef.current = false;
      lastAuthCheckRef.current = 0;

      if (redirect) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsAuthenticated(false);
      isRefreshingRef.current = false;
      lastAuthCheckRef.current = 0;
      if (redirect) {
        router.push('/');
      }
    }
  };

  const loginWithGoogle = async (token: string): Promise<AuthResponse> => {
    try {
      clearError();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }

      // Store tokens using cookies (consistent with your existing auth flow)
      Cookies.set('accessToken', data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1
      });

      Cookies.set('refreshToken', data.refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 7
      });

      // Update auth state
      setIsAuthenticated(true);
      await refetchUserQuery();

      // Redirect based on user role
      setTimeout(() => {
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }, 100);

      return data;
    } catch (error: unknown) {
      console.error('Google login error:', error);
      const authError = error as AuthError;
      const errorMessage = authError?.message || 'Google authentication failed';
      setError(errorMessage);
      throw error;
    }
  };

  const loginWithInstagram = async (code: string): Promise<AuthResponse> => {
    try {
      clearError();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/instagram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Instagram authentication failed');
      }

      // Store tokens using cookies (consistent with your existing auth flow)
      Cookies.set('accessToken', data.accessToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1
      });

      Cookies.set('refreshToken', data.refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 7
      });

      // Update auth state
      setIsAuthenticated(true);
      await refetchUserQuery();

      // Redirect based on user role
      setTimeout(() => {
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }, 100);

      return data;
    } catch (error: unknown) {
      console.error('Instagram login error:', error);
      const authError = error as AuthError;
      const errorMessage = authError?.message || 'Instagram authentication failed';
      setError(errorMessage);
      throw error;
    }
  };

  const refetchUser = useCallback(async (): Promise<void> => {
    try {
      await refetchUserQuery();
    } catch (error) {
      console.error('Failed to refetch user data:', error);
    }
  }, [refetchUserQuery]);

  const value: AuthContextType = {
    user: user || null,
    loading,
    error: error || loginMutation.error?.message || registerMutation.error?.message || null,
    login: handleLogin,
    loginWithToken,
    loginWithGoogle,
    loginWithInstagram,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated,
    clearError,
    checkAuthStatus,
    setIsAuthenticated,
    isUserAuthenticated,
    refetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isAuthenticated, loading, checkAuthStatus } = context;
  const lastCheckRef = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastCheck = now - lastCheckRef.current;

    if (timeSinceLastCheck < 2000) {
      return;
    }

    const hasAccessToken = !!Cookies.get('accessToken');
    const hasRefreshToken = !!Cookies.get('refreshToken');

    if ((hasAccessToken || hasRefreshToken) && !isAuthenticated && !loading) {
      lastCheckRef.current = now;
      checkAuthStatus();

    } else if (!hasAccessToken && !hasRefreshToken && isAuthenticated) {
      context.setIsAuthenticated(false);
    }
  }, [isAuthenticated, loading, checkAuthStatus, context]);

  return context;
};