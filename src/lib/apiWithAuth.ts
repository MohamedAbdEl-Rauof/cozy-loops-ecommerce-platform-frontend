
import axios, { 
  AxiosError, 
  AxiosInstance, 
  InternalAxiosRequestConfig,
  AxiosResponse 
} from 'axios';
import Cookies from 'js-cookie';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  user?: any;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiWithAuth: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
apiWithAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response interceptor with token refresh logic
apiWithAuth.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<any> => {
    // Ensure config exists and can be modified
    if (!error.config) {
      return Promise.reject(error);
    }
    
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshTokenValue = Cookies.get('refreshToken');
        if (!refreshTokenValue) {
          // No refresh token available, redirect to login
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }
        
        // Attempt to refresh the token directly without using another client
        // to avoid circular dependencies
        const response = await axios.post(`${API_URL}/api/auth/refresh-token`, { 
          refreshToken: refreshTokenValue 
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const tokenResponse = response.data as RefreshTokenResponse;
        
        // Update tokens in storage
        Cookies.set('accessToken', tokenResponse.accessToken, { secure: true, sameSite: 'strict' });
        
        // Update the authorization header
        originalRequest.headers.set('Authorization', `Bearer ${tokenResponse.accessToken}`);
        
        // Retry the original request
        return apiWithAuth(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear storage and redirect to login
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiWithAuth;