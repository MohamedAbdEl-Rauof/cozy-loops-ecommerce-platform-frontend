import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { login, register, logout, refreshToken } from '@/services/authService';
import { getUser } from '@/services/userServices';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}


export const USER_QUERY_KEYS = {
  user: ['user'] as const,
  profile: ['user', 'profile'] as const,
};

export const useUserQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.user,
    queryFn: getUser,
    enabled,
    staleTime: 10 * 60 * 1000, 
    gcTime: 15 * 60 * 1000, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchInterval: false, 
    retry: (failureCount, error: unknown) => {
      const errorResponse = error as { response?: { status?: number } };
      if (errorResponse?.response?.status === 401) {
        return false;
      }
      return failureCount < 1; 
    },
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (response) => {
      Cookies.set('accessToken', response.accessToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1
      });

      Cookies.set('refreshToken', response.refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 7
      });

      queryClient.setQueryData(USER_QUERY_KEYS.user, response.user);
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.user });
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (userData: RegisterData) => register(userData),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshTokenValue = Cookies.get('refreshToken');
      if (refreshTokenValue) {
        try {
          await logout(refreshTokenValue);
        } catch (error) {
          console.warn('Server logout failed, continuing with client logout:', error);
        }
      }
    },
    onSettled: () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      queryClient.clear(); 
    },
  });
};

export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshTokenValue: string) => refreshToken(refreshTokenValue),
    onSuccess: (response) => {
      Cookies.set('accessToken', response.accessToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1
      });

      if (response.user) {
        queryClient.setQueryData(USER_QUERY_KEYS.user, response.user);
      }
    },
    onError: () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.user });
    },
  });
};