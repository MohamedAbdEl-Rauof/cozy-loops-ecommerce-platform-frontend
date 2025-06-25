'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout, refreshToken, getUser } from '@/services/authService';
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
  loginWithToken: (token: string) => Promise<User>;
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
  loginWithToken: async () => ({} as User),
  register: async () => ({}),
  logout: async () => { },
  isAuthenticated: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = Cookies.get('accessToken');
      const refreshTokenValue = Cookies.get('refreshToken');

      if (accessToken) {
        try {
          // Try to get fresh user data from API first
          try {
            const userData = await getUser(accessToken);
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            return;
          } catch (apiError) {
            console.warn('Could not fetch fresh user data, falling back to stored data', apiError);

            // Fall back to stored user data
            const userDataString = localStorage.getItem('user');
            if (userDataString) {
              const userData: User = JSON.parse(userDataString);
              setUser(userData);
              setIsAuthenticated(true);
            } else {
              throw new Error('No user data found');
            }
          }
        } catch (error) {
          if (refreshTokenValue) {
            try {
              const response = await refreshToken(refreshTokenValue);
              Cookies.set('accessToken', response.accessToken, { secure: true, sameSite: 'strict' });

              // After refreshing token, get fresh user data
              try {
                const userData = await getUser(response.accessToken);
                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));
              } catch (userDataError) {
                // If we can't get fresh data, use what came with the refresh token response
                setUser(response.user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(response.user));
              }
            } catch (refreshError) {
              handleLogout();
            }
          } else {
            handleLogout();
          }
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

 const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Get initial login response with tokens
      const response = await login(email, password);

      // 2. Store tokens in cookies
      Cookies.set('accessToken', response.accessToken, { secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', response.refreshToken, { secure: true, sameSite: 'strict' });

      // 3. Get complete user profile with the token
      let userData = response.user;
      
      try {
        // Try to get more complete user data from the /users/me endpoint
        const fullUserData = await getUser(response.accessToken);
        userData = {
          ...userData,
          ...fullUserData,
          // Ensure these fields exist
          firstName: fullUserData.firstName || userData.firstName || '',
          lastName: fullUserData.lastName || userData.lastName || ''
        };
      } catch (profileError) {
        console.warn('Could not fetch complete profile, using basic user data', profileError);
      }

      // 4. Create the final user object
      const transformedUser: User = {
        ...userData,
        firstName: userData.firstName || '',
        lastName: userData.lastName || ''
      };

      // 5. Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(transformedUser));

      // 6. Update state
      setUser(transformedUser);
      setIsAuthenticated(true);
      
      // 7. Navigate to home page
      router.push('/');
      
      // 8. Return the response with enhanced user data
      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: transformedUser
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // The loginWithToken function now uses the imported getUserDataFromToken
  const loginWithToken = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      // Get user data using the token
      const userData = await getUser(token);

      // Store token in cookies (not localStorage for better security)
      Cookies.set('accessToken', token, { secure: true, sameSite: 'strict' });

      // Transform the user object to match our User interface if needed
      const user = {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        role: userData.role || 'user'
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(user));

      // Update context state
      setUser(user);
      setIsAuthenticated(true);

      return user;
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
    loginWithToken: loginWithToken,
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