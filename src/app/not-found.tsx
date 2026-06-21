import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
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
          <Typography
            sx={{
              fontSize: { xs: '5rem', md: '7rem' },
              fontWeight: 800,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #FF7043 0%, #FF5722 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ color: '#2c3e50', mt: 1 }}>
            Page not found
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, mb: 4 }}>
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{ bgcolor: '#FF7043', '&:hover': { bgcolor: '#FF5722' } }}
            >
              Back to Home
            </Button>
            <Button
              component={Link}
              href="/categories"
              variant="outlined"
              sx={{ borderColor: '#FF7043', color: '#FF5722', '&:hover': { borderColor: '#FF5722' } }}
            >
              Browse Categories
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
