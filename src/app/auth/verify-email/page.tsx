'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Button, 
  Divider, 
  Link as MuiLink,
  Alert,
  AlertTitle,
  CssBaseline
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';

export default function VerifyEmailPage() {
  // Mock data
  const mockEmail = "75af9c7873@emaily.pro";
  
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          py: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            zIndex: -1,
          },
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%'
            },
            '50%': {
              backgroundPosition: '100% 50%'
            },
            '100%': {
              backgroundPosition: '0% 50%'
            }
          }
        }}
      >
        <Container maxWidth="sm">
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Box 
                sx={{ 
                  bgcolor: 'primary.light', 
                  p: 2, 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <EmailIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography component="h1" variant="h4" align="center" gutterBottom fontWeight="bold">
                Email Verification
              </Typography>
            </Box>
            
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '1.5rem'
                }
              }}
            >
              <AlertTitle>Verification Required</AlertTitle>
              You need to verify your email address to activate your account.
            </Alert>
            
            <Typography variant="body1" paragraph align="center">
              An email with instructions to verify your email address has been sent to your address:
            </Typography>
            
            <Typography 
              variant="body1" 
              fontWeight="medium" 
              align="center" 
              sx={{ 
                mb: 3, 
                p: 1.5, 
                bgcolor: 'primary.50', 
                borderRadius: 1,
                color: 'primary.dark',
                fontFamily: 'monospace',
                letterSpacing: 0.5
              }}
            >
              {mockEmail}
            </Typography>
            
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <InfoIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  Please check your inbox and spam folder. The verification link will expire in 24 hours.
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" align="center" gutterBottom fontWeight="medium">
              Haven't received a verification code in your email?
            </Typography>
            
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ 
                mt: 2, 
                mb: 2, 
                py: 1.2,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                }
              }}
              onClick={() => alert('Verification email resent successfully!')}
            >
              Click here to re-send the email
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link href="/auth/login" passHref>
                <MuiLink 
                  component="button" 
                  variant="body2" 
                  underline="hover"
                  sx={{ 
                    fontWeight: 500,
                    '&:hover': {
                      color: 'primary.dark'
                    }
                  }}
                >
                  Return to login
                </MuiLink>
              </Link>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}