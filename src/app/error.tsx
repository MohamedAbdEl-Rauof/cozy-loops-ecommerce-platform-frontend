'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for debugging (replace with a logger/Sentry in prod).
    console.error(error);
  }, [error]);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'white',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#2c3e50' }}>
            Something went wrong
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, mb: 4 }}>
            An unexpected error occurred. You can try again, or head back home.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              onClick={() => reset()}
              variant="contained"
              sx={{ bgcolor: '#FF7043', '&:hover': { bgcolor: '#FF5722' } }}
            >
              Try Again
            </Button>
            <Button
              href="/"
              variant="outlined"
              sx={{ borderColor: '#FF7043', color: '#FF5722', '&:hover': { borderColor: '#FF5722' } }}
            >
              Back to Home
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
