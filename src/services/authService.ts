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

export const verifyEmail = async (token: string) => {
  try {
    // Add directLogin=true query parameter to get tokens back
    const response = await api.get(`/auth/verify-email/${token}?directLogin=true`, {
      maxRedirects: 5,
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    });

    // Check if the response contains tokens (direct login case)
    if (response.data && response.data.accessToken) {
      return {
        success: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user
      };
    }

    // Check if it's a redirect to verified=true (standard case)
    if (response.status === 302 || response.headers.location?.includes('verified=true')) {
      return { success: true };
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendVerificationEmail = async (email: string): Promise<{ message: string }> => {
  const response = await api.post('/api/auth/resend-verification', { email });
  return response.data;
};

export const getUser = async (token: string) => {
  const response = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.user;
};