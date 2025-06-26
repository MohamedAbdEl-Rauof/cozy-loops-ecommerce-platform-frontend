
import apiClient from '@/lib/apiClient';
import apiWithAuth from '@/lib/apiWithAuth';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    role: string;
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

interface VerifyOtpResponse {
  message: string;
  resetToken?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error in service:', error);
    throw error;
  }
};

export const register = async (userData: RegisterData): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Register error in service:', error);
    throw error;
  }
};

export const logout = async (refreshTokenValue: string): Promise<void> => {
  try {
    await apiClient.post('/api/auth/logout', { refreshToken: refreshTokenValue });
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const refreshToken = async (refreshTokenValue: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post('/api/auth/refresh-token', { refreshToken: refreshTokenValue });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error in forgot password:', error);
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.post(`/api/auth/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await apiClient.get(`/api/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string): Promise<VerifyOtpResponse> => {
  try {
    const response = await apiClient.post('/api/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const resendVerificationEmail = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post('/api/auth/resend-verification', { email });
    return response.data;
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await apiWithAuth.get('/api/users/me');
    return response.data.user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};