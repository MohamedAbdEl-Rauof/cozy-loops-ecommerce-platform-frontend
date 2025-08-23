'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';

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
        sx={{ bgcolor: 'white' }}
      >
        <CircularProgress sx={{ color: '#FF7043' }} />
        <Typography style={{ color: 'black' }}>Checking authentication...</Typography>
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
        sx={{ bgcolor: 'white' }}
        gap={2}
      >
        <CircularProgress />
        <Typography sx={{ color: 'black' }}>Redirecting to login...</Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;