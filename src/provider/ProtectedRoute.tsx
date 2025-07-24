
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/auth/login' 
}) => {
  const { isAuthenticated, loading, isUserAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const userAuth = isUserAuthenticated();
      
      if (!userAuth && !isAuthenticated) {
        router.push(`${redirectTo}`);
      }
    }
  }, [isAuthenticated, loading, isUserAuthenticated, router, redirectTo]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="50vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Typography>Checking authentication...</Typography>
      </Box>
    );
  }

  if (!isAuthenticated && !isUserAuthenticated()) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="50vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Typography>Redirecting to login...</Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;