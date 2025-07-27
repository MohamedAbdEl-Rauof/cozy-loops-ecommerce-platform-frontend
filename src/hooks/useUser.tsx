import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@/services/userServices';
import { login, register, logout, refreshToken } from '@/services/authService';
import Cookies from 'js-cookie';

export const USER_QUERY_KEYS = {
  user: ['user'] as const,
  profile: ['user', 'profile'] as const,
};

export const useUserQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.user,
    queryFn: getUser,
    enabled,
    staleTime: 5 * 60 * 1000, 
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
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
        secure: true,
        sameSite: 'strict',
        expires: 1
      });

      Cookies.set('refreshToken', response.refreshToken, {
        secure: true,
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
    mutationFn: (userData: any) => register(userData),
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
        secure: true,
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