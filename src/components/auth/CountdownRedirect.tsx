'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Paper } from '@mui/material';

interface CountdownRedirectProps {
  message: string;
  redirectPath: string;
  seconds: number;
}

export function CountdownRedirect({ message, redirectPath, seconds }: CountdownRedirectProps) {
  const [countdown, setCountdown] = useState(seconds);
  const router = useRouter();
  
  useEffect(() => {
    if (countdown <= 0) {
      router.push(redirectPath);
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, redirectPath, router]);
  
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh' 
    }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {message}
        </Typography>
        <Typography variant="body1">
          Redirecting to Home page in {countdown} {countdown === 1 ? 'second' : 'seconds'}...
        </Typography>
      </Paper>
    </Box>
  );
}