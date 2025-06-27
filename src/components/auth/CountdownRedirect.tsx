'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

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

  const handleRedirectNow = () => {
    router.push(redirectPath);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f5f7fa, #e8edf2)',
      padding: 2
    }}>
      <Paper
        elevation={6}
        sx={{
          p: 6,
          maxWidth: 700,
          width: '100%',
          textAlign: 'center',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            bgcolor: 'var(--primary-color)',
            width: `${(countdown / seconds) * 100}%`,
            transition: 'width 1s linear'
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <InfoIcon sx={{ fontSize: 40, color: 'var(--primary-color)', mr: 2 }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#333'
            }}
          >
            {message}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={(countdown / seconds) * 100}
              size={100}
              thickness={4}
              sx={{ color: 'var(--primary-color)' }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" component="div" color="text.secondary" fontWeight="bold">
                {countdown}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
          Redirecting to Home page {countdown === 1 ? 'in a second' : `in ${countdown} seconds`}...
        </Typography>

        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={handleRedirectNow}
          sx={{
            bgcolor: 'var(--primary-color)',
            '&:hover': {
              bgcolor: 'var(--primary-hover)',
            },
            borderRadius: '8px',
            py: 1.5,
            px: 4,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1.1rem'
          }}
        >
          Go to Home Now
        </Button>
      </Paper>
    </Box>
  );
}