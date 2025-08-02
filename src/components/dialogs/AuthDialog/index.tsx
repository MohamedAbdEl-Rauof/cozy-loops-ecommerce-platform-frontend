
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Fade,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onClose,
  title,
  message
}) => {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push('/auth/login');
  };

  const handleSignUp = () => {
    onClose();
    router.push('/auth/register');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 0,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)'
        }
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, #667eea 100%)',
          position: 'relative',
          py: 3,
          px: 3
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          
          <Typography
            variant="h4"
            component="h2"
            sx={{ 
              fontWeight: 700, 
              color: 'white',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ 
            mb: 3, 
            lineHeight: 1.6,
            fontSize: '1.1rem',
            fontWeight: 400
          }}
        >
          {message}
        </Typography>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: 'rgba(var(--primary-color-rgb), 0.05)',
            border: '1px solid rgba(var(--primary-color-rgb), 0.1)',
            mb: 3
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            Join thousands of satisfied customers and unlock exclusive features!
          </Typography>
        </Box>
      </DialogContent>

      <Divider sx={{ mx: 3 }} />

      <DialogActions sx={{ flexDirection: 'column', gap: 2, p: 4, pt: 3 }}>
        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          size="large"
          startIcon={<LoginIcon />}
          sx={{
            py: 1.8,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, var(--primary-color) 0%, #667eea 100%)',
            boxShadow: '0 8px 24px rgba(var(--primary-color-rgb), 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(var(--primary-color-rgb), 0.4)',
              background: 'linear-gradient(135deg, var(--primary-color-dark) 0%, #5a67d8 100%)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Sign In to Continue
        </Button>

        <Button
          onClick={handleSignUp}
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<SignUpIcon />}
          sx={{
            py: 1.8,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            borderColor: 'var(--primary-color)',
            color: 'var(--primary-color)',
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              borderColor: 'var(--primary-color)',
              backgroundColor: 'rgba(var(--primary-color-rgb), 0.05)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Create New Account
        </Button>

        <Button
          onClick={onClose}
          color="inherit"
          sx={{
            textTransform: 'none',
            color: 'text.secondary',
            fontSize: '0.95rem',
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              color: 'text.primary'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Maybe Later
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;