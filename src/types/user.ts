import { ReactNode } from "react";

export interface User {
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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  [key: string]: unknown;
  phoneNumber?: string;
}

export interface AuthError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (_email: string, _password: string) => Promise<AuthResponse>;
  loginWithToken: (_token: string, _refreshTokenValue?: string) => Promise<User>;
  loginWithGoogle: (_token: string) => Promise<AuthResponse>;
  loginWithLinkedIn: (_code?: string) => Promise<AuthResponse>;
  register: (_userData: RegisterData) => Promise<unknown>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  clearError: () => void;
  checkAuthStatus: () => Promise<boolean>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isUserAuthenticated: () => boolean;
  refetchUser: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}