
'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import LoginIcon from '@mui/icons-material/Login';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { CountdownRedirect } from '@/components/auth/CountdownRedirect';

type VerificationStatus = 'pending' | 'success' | 'error';
type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { loginWithToken, isAuthenticated, isUserAuthenticated, loading: authLoading } = useAuth();
    const email = searchParams.get('email') || "example@email.com";
    const token = searchParams.get('token');
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(token ? 'pending' : 'success');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [redirectCountdown, setRedirectCountdown] = useState(5);
    const [resendCountdown, setResendCountdown] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showAuthenticatedMessage, setShowAuthenticatedMessage] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (isUserAuthenticated()) {
            console.log('User is authenticated, showing redirect message');
            setShowAuthenticatedMessage(true);
        }
    }, [isAuthenticated, authLoading, isUserAuthenticated]);

    useEffect(() => {
        if (verificationStatus === 'success' && redirectCountdown > 0) {
            const timer = setTimeout(() => setRedirectCountdown(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (verificationStatus === 'success' && redirectCountdown === 0) {
            router.push('/');
        }
    }, [verificationStatus, redirectCountdown, router]);

    useEffect(() => {
        if (resendCountdown > 0 && isResendDisabled) {
            const timer = setTimeout(() => setResendCountdown(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (resendCountdown === 0 && isResendDisabled) {
            setIsResendDisabled(false);
        }
    }, [resendCountdown, isResendDisabled]);

    const showNotification = useCallback((message: string, severity: SnackbarSeverity) => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    }, []);


    const handleVerificationSuccess = useCallback(async (authToken?: string) => {
        setVerificationStatus('success');
        setVerificationMessage('Your email has been successfully verified!');

        try {
            if (authToken) {
                let accessToken = authToken;
                let refreshTokenValue;

                try {
                    const tokenData = JSON.parse(authToken);
                    if (tokenData.accessToken) {
                        accessToken = tokenData.accessToken;
                        refreshTokenValue = tokenData.refreshToken;
                    }
                } catch (e) {
                    console.log('Token is not in JSON format, using as access token only');
                }

                await loginWithToken(accessToken, refreshTokenValue);
            }
        } catch (error) {
            console.error('Auto-login failed:', error);
            setTimeout(() => router.push('/auth/login?verified=true'), 2000);
        }
    }, [loginWithToken, router]);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) return;

            try {
                setVerificationStatus('pending');
                setVerificationMessage('Verifying your email address...');

                // Check if already verified
                const tokenKey = `verified_token_${token}`;
                if (localStorage.getItem(tokenKey)) {
                    handleVerificationSuccess();
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL!}/api/auth/verify-email/${token}?directLogin=true`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'manual'
                    }
                );

                if (response.ok || response.status === 302) {
                    localStorage.setItem(tokenKey, 'true');

                    try {
                        const data = await response.json();

                        if (data.token && data.refreshToken) {
                            const tokenData = JSON.stringify({
                                accessToken: data.token,
                                refreshToken: data.refreshToken
                            });
                            handleVerificationSuccess(tokenData);
                        } else if (data.token) {
                            handleVerificationSuccess(data.token);
                        } else {
                            handleVerificationSuccess(token);
                        }
                    } catch (parseError) {
                        console.error('Error parsing response:', parseError);
                        handleVerificationSuccess(token);
                    }
                }
            } catch (error: any) {
                console.error('Email verification failed:', error);
                const errorMessage = error.message || '';

                if (errorMessage.includes('already') || errorMessage.includes('used')) {
                    setVerificationStatus('success');
                    setVerificationMessage('Your email has already been verified. You can now log in.');
                    setTimeout(() => router.push('/auth/login?verified=true'), 3000);
                } else {
                    setVerificationStatus('error');
                    setVerificationMessage(errorMessage || 'Failed to verify email. The link may be invalid.');
                    showNotification(errorMessage || 'Failed to verify email', 'error');
                }
            }
        };

        if (token) {
            verifyToken();
        }
    }, [token, handleVerificationSuccess, router, showNotification]);

    const handleResendVerification = async () => {
        setLoading(true);
        try {
            await resendVerificationEmail(email);
            showNotification('Verification email resent successfully!', 'success');
            setResendCountdown(60);
            setIsResendDisabled(true);
        } catch (error) {
            console.error('Error resending verification email:', error);
            showNotification('Failed to resend verification email', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    if (showAuthenticatedMessage || (!authLoading && isUserAuthenticated())) {
        return (
            <CountdownRedirect
                message="You are already authenticated!"
                redirectPath="/"
                seconds={5}
            />
        );
    }

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
                                    <>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                mb: 5,
                                                mx: 'auto',
                                                width: 120,
                                                height: 120,
                                                perspective: '1000px',
                                                animation: 'float 3s ease-in-out infinite',
                                                '@keyframes float': {
                                                    '0%': { transform: 'translateY(0px)' },
                                                    '50%': { transform: 'translateY(-10px)' },
                                                    '100%': { transform: 'translateY(0px)' }
                                                }
                                            }}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        position: 'absolute',
                                                        width: i % 2 ? 8 : 12,
                                                        height: i % 2 ? 8 : 12,
                                                        borderRadius: '50%',
                                                        bgcolor: i % 3 === 0 ? 'primary.light' : i % 3 === 1 ? 'secondary.light' : 'info.light',
                                                        opacity: 0.7,
                                                        top: `${Math.random() * 100}%`,
                                                        left: `${Math.random() * 100}%`,
                                                        animation: `particle${i} ${2 + i * 0.5}s ease-in-out infinite`,
                                                        '@keyframes particle0': {
                                                            '0%, 100%': { transform: 'translate(10px, 10px)' },
                                                            '50%': { transform: 'translate(-10px, -10px)' }
                                                        },
                                                        '@keyframes particle1': {
                                                            '0%, 100%': { transform: 'translate(-15px, 5px)' },
                                                            '50%': { transform: 'translate(15px, -5px)' }
                                                        },
                                                        '@keyframes particle2': {
                                                            '0%, 100%': { transform: 'translate(5px, -15px)' },
                                                            '50%': { transform: 'translate(-5px, 15px)' }
                                                        },
                                                        '@keyframes particle3': {
                                                            '0%, 100%': { transform: 'translate(-10px, -10px)' },
                                                            '50%': { transform: 'translate(10px, 10px)' }
                                                        },
                                                        '@keyframes particle4': {
                                                            '0%, 100%': { transform: 'translate(15px, -5px)' },
                                                            '50%': { transform: 'translate(-15px, 5px)' }
                                                        },
                                                    }}
                                                />
                                            ))}

                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '110%',
                                                    height: '110%',
                                                    borderRadius: '50%',
                                                    border: '2px solid',
                                                    borderColor: 'primary.light',
                                                    opacity: 0.6,
                                                    animation: 'pulse 2s ease-in-out infinite',
                                                    '@keyframes pulse': {
                                                        '0%': { transform: 'translate(-50%, -50%) scale(0.9)', opacity: 0.8 },
                                                        '50%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 0.4 },
                                                        '100%': { transform: 'translate(-50%, -50%) scale(0.9)', opacity: 0.8 }
                                                    }
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    border: '3px solid transparent',
                                                    borderLeftColor: 'primary.main',
                                                    borderTopColor: 'primary.main',
                                                    animation: 'spin 1.5s linear infinite',
                                                    '@keyframes spin': {
                                                        '0%': { transform: 'rotate(0deg)' },
                                                        '100%': { transform: 'rotate(360deg)' }
                                                    }
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '5%',
                                                    left: '5%',
                                                    width: '90%',
                                                    height: '90%',
                                                    borderRadius: '50%',
                                                    border: '2px dashed',
                                                    borderColor: 'secondary.light',
                                                    opacity: 0.7,
                                                    animation: 'spin-reverse 3s linear infinite',
                                                    '@keyframes spin-reverse': {
                                                        '0%': { transform: 'rotate(360deg)' },
                                                        '100%': { transform: 'rotate(0deg)' }
                                                    }
                                                }}
                                            />

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
                                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2), inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 0 4px 8px rgba(255, 255, 255, 0.2)',
                                                    animation: 'pulse-subtle 2s ease-in-out infinite',
                                                    '@keyframes pulse-subtle': {
                                                        '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
                                                        '50%': { transform: 'translate(-50%, -50%) scale(0.95)' }
                                                    }
                                                }}
                                            >
                                                <EmailIcon
                                                    sx={{
                                                        fontSize: 36,
                                                        color: 'white',
                                                        animation: 'bounce 2s ease infinite',
                                                        '@keyframes bounce': {
                                                            '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                                                            '40%': { transform: 'translateY(-6px)' },
                                                            '60%': { transform: 'translateY(-3px)' }
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        <Typography
                                            component="h1"
                                            variant="h4"
                                            align="center"
                                            gutterBottom
                                            fontWeight="bold"
                                            sx={{
                                                color: 'primary.dark',
                                                mb: 2,
                                                background: 'linear-gradient(45deg, #2196F3, #3f51b5)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            Verifying Your Email
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                mb: 3,
                                                textAlign: 'center',
                                                maxWidth: '90%',
                                                mx: 'auto',
                                                animation: 'fadeIn 1s ease-out',
                                                '@keyframes fadeIn': {
                                                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                                                    '100%': { opacity: 1, transform: 'translateY(0)' }
                                                }
                                            }}
                                        >
                                            {verificationMessage || 'Please wait while we verify your email address...'}
                                        </Typography>

                                        <Box
                                            sx={{
                                                width: '100%',
                                                mb: 4,
                                                position: 'relative',
                                                '&:hover .step-tooltip': {
                                                    opacity: 1,
                                                    visibility: 'visible'
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                {['Checking token', 'Activating account', 'Completing'].map((step, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            position: 'relative',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: '50%',
                                                                bgcolor: index === 0 ? 'primary.main' : 'grey.300',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                mb: 1,
                                                                transition: 'all 0.3s ease',
                                                                boxShadow: index === 0 ? '0 0 0 4px rgba(33, 150, 243, 0.2)' : 'none',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)'
                                                                }
                                                            }}
                                                        >
                                                            {index === 0 ? (
                                                                <CheckIcon sx={{ fontSize: 16, color: 'white' }} />
                                                            ) : (
                                                                <Typography variant="caption" color="white">
                                                                    {index + 1}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        <Typography
                                                            variant="caption"
                                                            color={index === 0 ? "primary.main" : "text.secondary"}
                                                            fontWeight={index === 0 ? "medium" : "normal"}
                                                            sx={{ textAlign: 'center' }}
                                                        >
                                                            {step}
                                                        </Typography>

                                                        <Box
                                                            className="step-tooltip"
                                                            sx={{
                                                                position: 'absolute',
                                                                top: -40,
                                                                left: '50%',
                                                                transform: 'translateX(-50%)',
                                                                bgcolor: 'background.paper',
                                                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                                borderRadius: 1,
                                                                p: 1,
                                                                minWidth: 120,
                                                                opacity: 0,
                                                                visibility: 'hidden',
                                                                transition: 'all 0.3s ease',
                                                                zIndex: 10,
                                                                '&:after': {
                                                                    content: '""',
                                                                    position: 'absolute',
                                                                    bottom: -5,
                                                                    left: '50%',
                                                                    transform: 'translateX(-50%) rotate(45deg)',
                                                                    width: 10,
                                                                    height: 10,
                                                                    bgcolor: 'background.paper'
                                                                }
                                                            }}
                                                        >
                                                            <Typography variant="caption" display="block">
                                                                {index === 0 ? 'Validating your token' :
                                                                    index === 1 ? 'Setting up your account' :
                                                                        'Finalizing verification'}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    height: 8,
                                                    bgcolor: 'grey.100',
                                                    borderRadius: 4,
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '33%',
                                                        height: '100%',
                                                        borderRadius: 4,
                                                        background: 'linear-gradient(90deg, #2196F3, #3f51b5, #2196F3)',
                                                        backgroundSize: '200% 100%',
                                                        animation: 'progressAnimation 2s linear infinite, widthAnimation 3s ease-in-out',
                                                        '@keyframes progressAnimation': {
                                                            '0%': { backgroundPosition: '0% 0%' },
                                                            '100%': { backgroundPosition: '200% 0%' }
                                                        },
                                                        '@keyframes widthAnimation': {
                                                            '0%': { width: '0%' },
                                                            '100%': { width: '33%' }
                                                        },
                                                        transition: 'width 0.5s ease-in-out',
                                                        boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)'
                                                    }}
                                                />

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        mt: 2,
                                                        gap: 1
                                                    }}
                                                >
                                                    {[0, 1, 2].map((dot) => (
                                                        <Box
                                                            key={dot}
                                                            sx={{
                                                                width: 8,
                                                                height: 8,
                                                                borderRadius: '50%',
                                                                bgcolor: 'primary.main',
                                                                opacity: 0.7,
                                                                animation: `dotPulse 1.5s infinite ease-in-out ${dot * 0.2}s`,
                                                                '@keyframes dotPulse': {
                                                                    '0%, 100%': { transform: 'scale(0.8)', opacity: 0.5 },
                                                                    '50%': { transform: 'scale(1.2)', opacity: 1 }
                                                                }
                                                            }}
                                                        />
                                                    ))}
                                                </Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        display: 'block',
                                                        textAlign: 'center',
                                                        mt: 1,
                                                        fontStyle: 'italic',
                                                        animation: 'fadeInOut 2s infinite',
                                                        '@keyframes fadeInOut': {
                                                            '0%, 100%': { opacity: 0.6 },
                                                            '50%': { opacity: 1 }
                                                        }
                                                    }}
                                                >
                                                    This may take a few moments...
                                                </Typography>

                                                <Paper
                                                    elevation={0}
                                                    sx={{
                                                        mt: 4,
                                                        p: 2,
                                                        bgcolor: 'info.50',
                                                        borderRadius: 2,
                                                        border: '1px solid',
                                                        borderColor: 'info.100',
                                                        maxWidth: '90%',
                                                        mx: 'auto',
                                                        animation: 'slideIn 0.5s ease-out',
                                                        '@keyframes slideIn': {
                                                            '0%': { opacity: 0, transform: 'translateY(20px)' },
                                                            '100%': { opacity: 1, transform: 'translateY(0)' }
                                                        }
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                        <LightbulbIcon
                                                            sx={{
                                                                color: 'info.main',
                                                                mr: 1.5,
                                                                mt: 0.5,
                                                                animation: 'glow 2s infinite',
                                                                '@keyframes glow': {
                                                                    '0%, 100%': { opacity: 0.7 },
                                                                    '50%': { opacity: 1, filter: 'drop-shadow(0 0 3px rgba(33, 150, 243, 0.5))' }
                                                                }
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                                                While you wait:
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Make sure to check your spam folder if you don't see our verification email.
                                                                You can also request a new verification email if needed.
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Paper>

                                                <Box
                                                    sx={{
                                                        mt: 3,
                                                        textAlign: 'center',
                                                        opacity: 0,
                                                        animation: 'fadeIn 0.5s ease-out 5s forwards',
                                                        '@keyframes fadeIn': {
                                                            '0%': { opacity: 0 },
                                                            '100%': { opacity: 1 }
                                                        }
                                                    }}
                                                >
                                                    <Button
                                                        variant="text"
                                                        size="small"
                                                        startIcon={<RefreshIcon />}
                                                        onClick={handleResendVerification}
                                                        sx={{
                                                            textTransform: 'none',
                                                            '&:hover': {
                                                                bgcolor: 'rgba(33, 150, 243, 0.08)'
                                                            }
                                                        }}
                                                    >
                                                        Resend verification email
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </>
                                ) : verificationStatus === 'success' ? (
                                    // Success UI 
                                    <>
                                        <Typography variant="body1" color="text.secondary">
                                            Redirecting to homepage in <strong>{redirectCountdown}</strong> seconds...
                                        </Typography>
                                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: 120,
                                                    height: 120,
                                                    mx: 'auto',
                                                    mb: 3,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: `${(redirectCountdown / 5) * 100}%`,
                                                        height: '100%',
                                                        borderRadius: '50%',
                                                        border: '3px solid',
                                                        borderColor: 'success.light',
                                                        opacity: 0.6,
                                                        animation: 'ripple 1.5s ease-out infinite',
                                                        '@keyframes ripple': {
                                                            '0%': { transform: 'scale(0.8)', opacity: 1 },
                                                            '100%': { transform: 'scale(1.2)', opacity: 0 }
                                                        }
                                                    }}
                                                />

                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        bgcolor: 'success.main',
                                                        width: '80%',
                                                        height: '80%',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                                        animation: 'bounce 0.5s ease-out',
                                                        '@keyframes bounce': {
                                                            '0%': { transform: 'translate(-50%, -30%)', opacity: 0 },
                                                            '50%': { transform: 'translate(-50%, -60%)' },
                                                            '100%': { transform: 'translate(-50%, -50%)', opacity: 1 }
                                                        }
                                                    }}
                                                >
                                                    <CheckCircleIcon sx={{ fontSize: 48, color: 'white' }} />
                                                </Box>
                                            </Box>

                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                align="center"
                                                gutterBottom
                                                fontWeight="bold"
                                                sx={{
                                                    color: 'success.dark',
                                                    mb: 2,
                                                    animation: 'fadeIn 0.8s ease-out',
                                                    '@keyframes fadeIn': {
                                                        '0%': { opacity: 0, transform: 'translateY(10px)' },
                                                        '100%': { opacity: 1, transform: 'translateY(0)' }
                                                    }
                                                }}
                                            >
                                                Email Successfully Verified!
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    mb: 3,
                                                    animation: 'fadeIn 1s ease-out 0.3s both',
                                                    maxWidth: '90%',
                                                    mx: 'auto'
                                                }}
                                            >
                                                {verificationMessage || 'Your email has been successfully verified! Your account is now active.'}
                                            </Typography>
                                        </Box>

                                        <Card
                                            variant="outlined"
                                            sx={{
                                                mb: 4,
                                                borderRadius: 2,
                                                borderColor: 'success.light',
                                                bgcolor: 'success.50',
                                                animation: 'slideUp 0.8s ease-out 0.5s both',
                                                '@keyframes slideUp': {
                                                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                                                    '100%': { opacity: 1, transform: 'translateY(0)' }
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 2.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                                                    <InfoIcon sx={{ mr: 1.5, color: 'success.main', mt: 0.5 }} />
                                                    <Typography variant="subtitle2" fontWeight="medium">
                                                        What happens next?
                                                    </Typography>
                                                </Box>

                                                <List dense disablePadding>
                                                    <ListItem sx={{ px: 1, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="You can now log in to your account"
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                    <ListItem sx={{ px: 1, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="Access all features of your account"
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                    <ListItem sx={{ px: 1, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="You'll be redirected to login page shortly"
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                        </Card>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                animation: 'fadeIn 1s ease-out 0.8s both',
                                            }}
                                        >
                                            <CircularProgress
                                                variant="determinate"
                                                value={100}
                                                size={40}
                                                thickness={4}
                                                sx={{
                                                    color: 'success.main',
                                                    mb: 1.5,
                                                    '& .MuiCircularProgress-circle': {
                                                        strokeDasharray: '100px',
                                                        strokeDashoffset: '100px',
                                                        animation: 'countdown 3s linear forwards',
                                                        '@keyframes countdown': {
                                                            '0%': { strokeDashoffset: '0px' },
                                                            '100%': { strokeDashoffset: '100px' }
                                                        }
                                                    }
                                                }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                Redirecting to login page...
                                            </Typography>
                                        </Box>
                                    </>
                                ) : (
                                    // Error UI 
                                    <>
                                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: 100,
                                                    height: 100,
                                                    mx: 'auto',
                                                    mb: 3,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        bgcolor: 'error.main',
                                                        p: 2.5,
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                        height: '100%',
                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                                        animation: 'pulse 2s infinite',
                                                        '@keyframes pulse': {
                                                            '0%': { boxShadow: '0 0 0 0 rgba(211, 47, 47, 0.7)' },
                                                            '70%': { boxShadow: '0 0 0 10px rgba(211, 47, 47, 0)' },
                                                            '100%': { boxShadow: '0 0 0 0 rgba(211, 47, 47, 0)' }
                                                        }
                                                    }}
                                                >
                                                    <ErrorOutlineIcon sx={{ fontSize: 48, color: 'white' }} />
                                                </Box>
                                            </Box>

                                            <Typography
                                                component="h1"
                                                variant="h4"
                                                align="center"
                                                gutterBottom
                                                fontWeight="bold"
                                                sx={{ color: 'error.dark', mb: 2 }}
                                            >
                                                Verification Failed
                                            </Typography>

                                            <Typography variant="body1" sx={{ mb: 3, maxWidth: '90%', mx: 'auto' }}>
                                                {verificationMessage || 'Failed to verify email. Please try again later.'}
                                            </Typography>
                                        </Box>

                                        <Card
                                            variant="outlined"
                                            sx={{
                                                mb: 4,
                                                borderRadius: 2,
                                                borderColor: 'error.light',
                                                bgcolor: 'error.50',
                                            }}
                                        >
                                            <CardContent sx={{ p: 2.5 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                                                    <InfoIcon sx={{ mr: 1.5, color: 'error.main', mt: 0.5 }} />
                                                    <Typography variant="subtitle2" fontWeight="medium">
                                                        What might have happened?
                                                    </Typography>
                                                </Box>

                                                <List dense disablePadding>
                                                    <ListItem sx={{ px: 1, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <FiberManualRecordIcon sx={{ fontSize: 8, color: 'text.secondary' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="The verification link may have expired"
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                    <ListItem sx={{ px: 1, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <FiberManualRecordIcon sx={{ fontSize: 8, color: 'text.secondary' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="The link might have been used already"
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                    <ListItem sx={{ px: 1, py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                                            <FiberManualRecordIcon sx={{ fontSize: 8, color: 'text.secondary' }} />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary="There might be a temporary system issue"
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                        </Card>

                                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                startIcon={<RefreshIcon />}
                                                sx={{
                                                    py: 1.2,
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontSize: '1rem',
                                                    bgcolor: 'primary.main',
                                                    '&:hover': {
                                                        bgcolor: 'primary.dark',
                                                    }
                                                }}
                                                onClick={() => window.location.reload()}
                                            >
                                                Try Again
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                startIcon={<LoginIcon />}
                                                sx={{
                                                    py: 1.2,
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontSize: '1rem',
                                                    borderColor: 'primary.main',
                                                    color: 'primary.main',
                                                    '&:hover': {
                                                        borderColor: 'primary.dark',
                                                        bgcolor: 'primary.50',
                                                    }
                                                }}
                                                onClick={() => router.push('/auth/login')}
                                            >
                                                Return to Login
                                            </Button>
                                        </Box>

                                        <Divider sx={{ my: 3 }}>
                                            <Chip
                                                label="Need Help?"
                                                size="small"
                                                sx={{ px: 1, fontWeight: 500 }}
                                            />
                                        </Divider>

                                        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
                                            If you continue to experience issues, please contact our support team or request a new verification email.
                                        </Typography>

                                        <Button
                                            variant="text"
                                            fullWidth
                                            startIcon={<EmailIcon />}
                                            sx={{
                                                py: 1,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                            }}
                                            onClick={handleResendVerification}
                                            disabled={isResendDisabled || loading}
                                        >
                                            {loading ? (
                                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                            ) : isResendDisabled ? (
                                                `Resend Available in ${resendCountdown}s`
                                            ) : (
                                                'Request New Verification Email'
                                            )}
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

                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2" align="center" gutterBottom sx={{ mb: 2 }}>
                                        Haven't received the verification email?
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled={isResendDisabled || loading}
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
                                        ) : isResendDisabled ? (
                                            `Resend Available in ${resendCountdown}s`
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