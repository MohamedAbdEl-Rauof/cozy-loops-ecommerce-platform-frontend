
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function InstagramCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithInstagram } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        if (errorParam) {
          setError('Instagram authentication was cancelled or failed');
          setTimeout(() => router.push('/auth/login'), 3000);
          return;
        }

        if (!code) {
          setError('No authorization code received from Instagram');
          setTimeout(() => router.push('/auth/login'), 3000);
          return;
        }

        // Use the code to complete the login process
        await loginWithInstagram(code);
        
      } catch (error) {
        console.error('Instagram callback error:', error);
        setError('Failed to complete Instagram authentication');
        setTimeout(() => router.push('/auth/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, loginWithInstagram, router]);

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography variant="body2">
          Redirecting to login page...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="h6">
        Completing Instagram authentication...
      </Typography>
    </Box>
  );
}