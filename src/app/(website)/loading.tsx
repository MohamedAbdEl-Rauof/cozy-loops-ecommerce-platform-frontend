import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress sx={{ color: '#FF7043' }} />
    </Box>
  );
}
