import api from '@/app/api/auth/[...nextauth]/route';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

interface RegisterData {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (userData: RegisterData): Promise<LoginResponse> => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const logout = async (refreshTokenValue: string): Promise<void> => {
  try {
    await api.post('/api/auth/logout', { refreshToken: refreshTokenValue });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const refreshToken = async (refreshTokenValue: string): Promise<LoginResponse> => {
  const response = await api.post('/api/auth/refresh-token', { refreshToken: refreshTokenValue });
  return response.data;
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  const response = await api.post('/api/auth/reset-password', { token, newPassword });
  return response.data;
};
