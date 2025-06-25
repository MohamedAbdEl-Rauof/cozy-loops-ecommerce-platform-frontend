
'use client';

import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Container,
    Button,
    Divider,
    Link as MuiLink,
    Alert,
    CssBaseline,
    Card,
    CardContent,
    Chip,
    Snackbar,
    CircularProgress
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resendVerificationEmail } from "@/services/authService";
import { useAuth } from '@/context/AuthContext';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { loginWithToken } = useAuth();
    const email = searchParams.get('email') || "example@email.com";
    const token = searchParams.get('token');
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>(token ? 'pending' : 'success');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning'
    });

    // token verification
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    setVerificationStatus('pending');
                    setVerificationMessage('Verifying your email address...');

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/auth/verify-email/${token}?directLogin=true`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        redirect: 'manual'
                    });

                    if (response.ok || response.status === 302) {
                        setVerificationStatus('success');
                        setVerificationMessage('Your email has been successfully verified!');

                        const responseData = await response.json().catch(() => ({}));
                        const tokenFromResponse = responseData.token;

                        if (tokenFromResponse) {
                            await loginWithToken(tokenFromResponse);

                            setTimeout(() => {
                                router.push('/');
                            }, 2000);
                        } else {
                            try {
                                const userData = await loginWithToken(token);

                                setTimeout(() => {
                                    router.push('/');
                                }, 2000);
                            } catch (loginError) {
                                console.error('Auto-login failed:', loginError);

                                setTimeout(() => {
                                    router.push('/auth/login?verified=true');
                                }, 2000);
                            }
                        }
                    } else {
                        throw new Error('Verification failed');
                    }
                } catch (error: any) {
                    console.error('Email verification failed:', error);
                    setVerificationStatus('error');
                    setVerificationMessage(error.response?.data?.message || 'Failed to verify email. Please try again later.');
                    setSnackbar({
                        open: true,
                        message: 'Failed to verify email. Please try again later.',
                        severity: 'error'
                    });
                }
            }
        };

        if (token) {
            verifyToken();
        }
    }, [token, loginWithToken, router]);

    useEffect(() => {
        if (countdown > 0 && isButtonDisabled) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
    }, [countdown, isButtonDisabled]);

    const handleResendVerification = async () => {
        setLoading(true);
        try {
            await resendVerificationEmail(email);
            setSnackbar({
                open: true,
                message: 'Verification email resent successfully!',
                severity: 'success'
            });
            setCountdown(60);
            setIsButtonDisabled(true);
        } catch (error) {
            console.error('Error resending verification email:', error);
            setSnackbar({
                open: true,
                message: 'Failed to resend verification email. Please try again later.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

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
                        opacity: 0.9,
                    },
                    '@keyframes gradient': {
                        '0%': { backgroundPosition: '0% 50%' },
                        '50%': { backgroundPosition: '100% 50%' },
                        '100%': { backgroundPosition: '0% 50%' }
                    }
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={6}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            width: '100%',
                            borderRadius: 2,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(10px)',
                            background: 'rgba(255, 255, 255, 0.95)',
                        }}
                    >
                        {token ? (
                            <Box sx={{ textAlign: 'center' }}>
                                {verificationStatus === 'pending' ? (
                                    // Enhanced pending verification UI
                                    <>
                                        <Box sx={{ position: 'relative', mb: 4, mx: 'auto', width: 100, height: 100 }}>
                                            {/* Outer animated ring */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    border: '3px solid',
                                                    borderColor: 'primary.light',
                                                    borderTopColor: 'primary.main',
                                                    animation: 'spin 1.5s linear infinite',
                                                    '@keyframes spin': {
                                                        '0%': { transform: 'rotate(0deg)' },
                                                        '100%': { transform: 'rotate(360deg)' }
                                                    }
                                                }}
                                            />

                                            {/* Inner circle with icon */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '70%',
                                                    height: '70%',
                                                    bgcolor: 'primary.main',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                                }}
                                            >
                                                <EmailIcon sx={{ fontSize: 32, color: 'white' }} />
                                            </Box>
                                        </Box>

                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            align="center"
                                            gutterBottom
                                            fontWeight="bold"
                                            sx={{ color: 'primary.dark', mb: 2 }}
                                        >
                                            Verifying Your Email
                                        </Typography>

                                        <Typography variant="body1" sx={{ mb: 3 }}>
                                            {verificationMessage || 'Please wait while we verify your email address...'}
                                        </Typography>

                                        {/* Progress steps */}
                                        <Box sx={{ width: '100%', mb: 4 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="caption" color="primary.main" fontWeight="medium">
                                                    Checking token
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" fontWeight="medium">
                                                    Activating account
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" fontWeight="medium">
                                                    Completing
                                                </Typography>
                                            </Box>
                                            <Box sx={{ width: '100%', height: 6, bgcolor: 'grey.100', borderRadius: 3, position: 'relative' }}>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 0,
                                                        height: '100%',
                                                        width: '33%',
                                                        bgcolor: 'primary.main',
                                                        borderRadius: 3,
                                                        animation: 'progress 2s ease-in-out infinite',
                                                        '@keyframes progress': {
                                                            '0%': { width: '0%' },
                                                            '50%': { width: '33%' },
                                                            '100%': { width: '33%' }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        {/* Tips while waiting */}
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                mb: 3,
                                                borderRadius: 2,
                                                borderColor: 'primary.light',
                                                bgcolor: 'primary.50',
                                            }}
                                        >
                                            <CardContent sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <InfoIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                                                    <Typography variant="subtitle2">
                                                        While you wait...
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    This should only take a few seconds. If it's taking longer than expected,
                                                    you can refresh the page or check your internet connection.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </>
                                ) : verificationStatus === 'success' ? (
                                    // Success UI (unchanged)
                                    <>
                                        <Box
                                            sx={{
                                                bgcolor: 'success.main',
                                                p: 2.5,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 2,
                                                mx: 'auto',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                            }}
                                        >
                                            <MarkEmailReadIcon sx={{ fontSize: 40, color: 'white' }} />
                                        </Box>

                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            align="center"
                                            gutterBottom
                                            fontWeight="bold"
                                            sx={{ color: 'primary.dark', mb: 3 }}
                                        >
                                            Email Verified!
                                        </Typography>

                                        <Typography variant="body1" sx={{ mb: 4 }}>
                                            {verificationMessage || 'Your email has been successfully verified!'}
                                        </Typography>
                                    </>
                                ) : (
                                    // Error UI (unchanged)
                                    <>
                                        <Box
                                            sx={{
                                                bgcolor: 'error.main',
                                                p: 2.5,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 2,
                                                mx: 'auto',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                            }}
                                        >
                                            <InfoIcon sx={{ fontSize: 40, color: 'white' }} />
                                        </Box>

                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            align="center"
                                            gutterBottom
                                            fontWeight="bold"
                                            sx={{ color: 'primary.dark', mb: 3 }}
                                        >
                                            Verification Failed
                                        </Typography>

                                        <Typography variant="body1" sx={{ mb: 4 }}>
                                            {verificationMessage || 'Failed to verify email. Please try again later.'}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                py: 1.2,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                mb: 2
                                            }}
                                            onClick={() => router.push('/auth/login')}
                                        >
                                            Return to Login
                                        </Button>
                                    </>
                                )}
                            </Box>
                        ) : (
                            <>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    mb: 3,
                                    position: 'relative'
                                }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'primary.main',
                                            p: 2.5,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                            animation: 'pulse 2s infinite',
                                            '@keyframes pulse': {
                                                '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.7)' },
                                                '70%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
                                                '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' }
                                            }
                                        }}
                                    >
                                        <MarkEmailReadIcon sx={{ fontSize: 40, color: 'white' }} />
                                    </Box>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        align="center"
                                        gutterBottom
                                        fontWeight="bold"
                                        sx={{ color: 'primary.dark' }}
                                    >
                                        Verify Your Email
                                    </Typography>

                                    <Chip
                                        label="Action Required"
                                        color="primary"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: -10,
                                            right: 0,
                                            fontWeight: 500,
                                            px: 1
                                        }}
                                    />
                                </Box>

                                <Card
                                    variant="outlined"
                                    sx={{
                                        mb: 3,
                                        borderRadius: 2,
                                        borderColor: 'primary.light',
                                        bgcolor: 'primary.50',
                                    }}
                                >
                                    <CardContent sx={{ p: 2.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <EmailIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                Verification Email Sent
                                            </Typography>
                                        </Box>

                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            We've sent a verification link to:
                                        </Typography>

                                        <Box
                                            sx={{
                                                p: 1.5,
                                                bgcolor: 'background.paper',
                                                borderRadius: 1,
                                                border: '1px dashed',
                                                borderColor: 'primary.main',
                                                textAlign: 'center',
                                                mb: 2
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                fontWeight="medium"
                                                sx={{
                                                    fontFamily: 'monospace',
                                                    letterSpacing: 0.5,
                                                    wordBreak: 'break-all'
                                                }}
                                            >
                                                {email}
                                            </Typography>
                                        </Box>

                                        <Typography variant="body2" color="text.secondary">
                                            Please check your inbox and click the verification link to activate your account.
                                        </Typography>
                                    </CardContent>
                                </Card>

                                {/* Info Box */}
                                <Alert
                                    severity="info"
                                    variant="outlined"
                                    icon={<InfoIcon />}
                                    sx={{
                                        mb: 3,
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            alignItems: 'flex-start',
                                            pt: 0.5
                                        }
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body2" paragraph sx={{ mt: 0 }}>
                                            <strong>Can't find the email?</strong>
                                        </Typography>
                                        <Typography variant="body2" component="div" sx={{ pl: 1 }}>
                                            • Check your spam or junk folder
                                        </Typography>
                                        <Typography variant="body2" component="div" sx={{ pl: 1 }}>
                                            • Make sure your email address was entered correctly
                                        </Typography>
                                        <Typography variant="body2" component="div" sx={{ pl: 1 }}>
                                            • The verification link will expire in 24 hours
                                        </Typography>
                                    </Box>
                                </Alert>

                                <Divider sx={{ my: 3 }}>
                                    <Chip
                                        label="Need Help?"
                                        size="small"
                                        sx={{ px: 1, fontWeight: 500 }}
                                    />
                                </Divider>

                                {/* Actions */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" align="center" gutterBottom sx={{ mb: 2 }}>
                                        Haven't received the verification email?
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled={isButtonDisabled || loading}
                                        sx={{
                                            py: 2,
                                            borderRadius: 2,
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                            '&:hover': {
                                                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                                            },
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            position: 'relative'
                                        }}
                                        onClick={handleResendVerification}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: 'white', position: 'absolute' }} />
                                        ) : isButtonDisabled ? (
                                            `Resend Available in ${countdown}s`
                                        ) : (
                                            'Resend Verification Email'
                                        )}
                                    </Button>
                                </Box>

                                <Box sx={{ textAlign: 'center', mt: 3 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Return to{' '}
                                        <MuiLink
                                            component={Link}
                                            href="/auth/login"
                                            sx={{
                                                fontWeight: 'medium',
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                        >
                                            Login
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </>
                        )}

                        <Snackbar
                            open={snackbar.open}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Alert
                                onClose={handleCloseSnackbar}
                                severity={snackbar.severity}
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {snackbar.message}
                            </Alert>
                        </Snackbar>
                    </Paper>
                </Container>
            </Box>
        </>
    );
}