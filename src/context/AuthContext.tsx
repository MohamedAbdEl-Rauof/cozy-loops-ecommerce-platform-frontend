'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout, refreshToken } from '@/services/authService';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
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
  register: (userData: RegisterData) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => ({ accessToken: '', refreshToken: '', user: {} as User }),
  register: async () => ({}),
  logout: async () => { },
  isAuthenticated: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = Cookies.get('accessToken');
      const refreshTokenValue = Cookies.get('refreshToken');

      if (accessToken) {
        try {
          const userDataString = localStorage.getItem('user');
          if (userDataString) {
            const userData: User = JSON.parse(userDataString);
            setUser(userData);
          } else {
            throw new Error('No user data found');
          }
        } catch (error) {
          if (refreshTokenValue) {
            try {
              const response = await refreshToken(refreshTokenValue);
              Cookies.set('accessToken', response.accessToken, { secure: true, sameSite: 'strict' });
              localStorage.setItem('user', JSON.stringify(response.user));
              setUser(response.user);
            } catch (refreshError) {
              handleLogout();
            }
          } else {
            handleLogout();
          }
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(email, password);

      // Transform the user object to match our User interface
      const transformedUser: User = {
        ...response.user,
        // Add derived firstName and lastName if they don't exist
        firstName: response.user.firstName || '',
        lastName: response.user.lastName || ''
      };

      // Create a transformed response that matches AuthResponse
      const transformedResponse: AuthResponse = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: transformedUser
      };

      // Store tokens in cookies
      Cookies.set('accessToken', transformedResponse.accessToken, { secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', transformedResponse.refreshToken, { secure: true, sameSite: 'strict' });

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(transformedUser));

      setUser(transformedUser);
      router.push('/');
      return transformedResponse;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: RegisterData): Promise<any> => {
    try {
      setLoading(true);
      setError(null);
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

  const handleLogout = async (): Promise<void> => {
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
      localStorage.removeItem('user');
      setUser(null);
      router.push('/auth/login');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    isAuthenticated: !!user,
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