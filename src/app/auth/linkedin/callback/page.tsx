'use client';

import { CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import {
    Snackbar,
    Alert,
    Box,
    Paper,
    Typography,
    Button,
    CircularProgress
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef, Suspense } from 'react';

import { useAuth } from '@/context/AuthContext';

interface LinkedInError {
    response?: {
        data?: {
            message?: string;
            error?: string;
        };
    };
    message?: string;
}

function LinkedInCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithLinkedIn } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'warning' | 'info'
    });
    const hasProcessed = useRef(false);

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    useEffect(() => {
        const handleLinkedInCallback = async () => {
            if (hasProcessed.current || isProcessing) {
                return;
            }

            try {
                setIsProcessing(true);
                hasProcessed.current = true;

                const code = searchParams.get('code');
                const state = searchParams.get('state');
                const error = searchParams.get('error');
                const errorDescription = searchParams.get('error_description');

                if (error) {
                    let errorMessage = 'LinkedIn authentication failed';

                    switch (error) {
                        case 'access_denied':
                            errorMessage = 'Access denied. You cancelled the LinkedIn login.';
                            break;
                        case 'invalid_request':
                            errorMessage = 'Invalid request. Please try again.';
                            break;
                        case 'unauthorized_client':
                            errorMessage = 'Unauthorized client. Please contact support.';
                            break;
                        default:
                            errorMessage = errorDescription || 'LinkedIn authentication failed';
                    }

                    setError(errorMessage);
                    showSnackbar(errorMessage, 'error');

                    setTimeout(() => {
                        router.push('/auth/login?error=linkedin_auth_failed');
                    }, 3000);
                    return;
                }

                if (!code) {
                    const errorMsg = 'No authorization code received from LinkedIn';
                    setError(errorMsg);
                    showSnackbar(errorMsg, 'error');
                    router.push('/auth/login?error=no_code');
                    return;
                }

                const storedState = localStorage.getItem('linkedin_oauth_state');
                const storedStateValue = storedState ? JSON.parse(storedState)?.state : null;

                if (storedStateValue && state !== storedStateValue) {
                    const errorMsg = 'Invalid state parameter. Possible CSRF attack.';
                    setError(errorMsg);
                    showSnackbar(errorMsg, 'error');

                    localStorage.removeItem('linkedin_oauth_state');
                    router.push('/auth/login?error=invalid_state');
                    return;
                }

                localStorage.removeItem('linkedin_oauth_state');

                const result = await loginWithLinkedIn(code);

                if (result && result.user) {
                    showSnackbar('Successfully logged in with LinkedIn!', 'success');

                    const redirectTo = localStorage.getItem('auth_redirect') || '/';
                    localStorage.removeItem('auth_redirect');

                    setTimeout(() => {
                        router.push(redirectTo);
                    }, 1500);
                } else {
                    throw new Error('LinkedIn authentication failed');
                }

            } catch (error: unknown) {
                console.error('LinkedIn callback error:', error);

                let errorMessage = 'LinkedIn authentication failed';

                const linkedInError = error as LinkedInError;

                if (linkedInError.response?.data?.message) {
                    errorMessage = linkedInError.response.data.message;
                } else if (linkedInError.message) {
                    errorMessage = linkedInError.message;
                }

                if (linkedInError.response?.data?.error === 'LINKEDIN_AUTH_CODE_INVALID') {
                    errorMessage = 'Authorization code has expired. Please try logging in again.';
                } else if (linkedInError.response?.data?.error === 'LINKEDIN_AUTH_CODE_EXPIRED') {
                    errorMessage = 'LinkedIn authorization has expired. Please try again.';
                }

                setError(errorMessage);
                showSnackbar(errorMessage, 'error');

                setTimeout(() => {
                    router.push(`/auth/login?error=${encodeURIComponent(errorMessage)}`);
                }, 3000);
            } finally {
                setIsProcessing(false);
            }
        };

        if (searchParams.toString() && !hasProcessed.current) {
            handleLinkedInCallback();
        }
    }, [searchParams, router, loginWithLinkedIn, isProcessing]);

    if (error) {
        return (
            <>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.50',
                        p: 2
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            maxWidth: 400,
                            width: '100%',
                            p: 4,
                            textAlign: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                bgcolor: 'error.light',
                                mb: 2
                            }}
                        >
                            <ErrorIcon sx={{ color: 'error.main', fontSize: 24 }} />
                        </Box>

                        <Typography variant="h6" component="h3" gutterBottom>
                            Authentication Failed
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {error}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => router.push('/auth/login')}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 500
                            }}
                        >
                            Back to Login
                        </Button>
                    </Paper>
                </Box>

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
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'grey.50',
                    p: 2
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 400,
                        width: '100%',
                        p: 4,
                        textAlign: 'center'
                    }}
                >
                    <Box
                        sx={{
                            mx: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'primary.light',
                            mb: 2
                        }}
                    >
                        <CircularProgress size={24} sx={{ color: 'primary.main' }} />
                    </Box>

                    <Typography variant="h6" component="h3" gutterBottom>
                        Processing LinkedIn Login
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Please wait while we complete your authentication...
                    </Typography>
                </Paper>
            </Box>

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
                    icon={snackbar.severity === 'success' ? <CheckCircle /> : undefined}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

function LoadingFallback() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                p: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    p: 4,
                    textAlign: 'center'
                }}
            >
                <Box
                    sx={{
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        mb: 2
                    }}
                >
                    <CircularProgress size={24} sx={{ color: 'primary.main' }} />
                </Box>

                <Typography variant="h6" component="h3" gutterBottom>
                                        Loading...
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Preparing your authentication...
                </Typography>
            </Paper>
        </Box>
    );
}

export default function LinkedInCallbackPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <LinkedInCallbackContent />
        </Suspense>
    );
}