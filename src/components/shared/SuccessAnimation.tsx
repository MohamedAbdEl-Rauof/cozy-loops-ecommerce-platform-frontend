import React, { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuccessAnimationProps {
    message?: string;
    onComplete?: () => void;
    count: number;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
    message = "Success!",
    onComplete = undefined,
    count = 2
}) => {
    useEffect(() => {
        if (onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, count * 1000);
            return () => clearTimeout(timer);
        }
    }, [onComplete, count]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                animation: 'fadeIn 0.4s ease-out',
                '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                }
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem 3rem',
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    maxWidth: '90%',
                    width: '350px',
                    animation: 'scaleIn 0.5s ease-out',
                    '@keyframes scaleIn': {
                        '0%': { transform: 'scale(0.9)', opacity: 0 },
                        '100%': { transform: 'scale(1)', opacity: 1 }
                    }
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(var(--primary-color-rgb), 0.1)',
                        borderRadius: '50%',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                        animation: 'ripple 1.5s infinite ease-in-out',
                        '@keyframes ripple': {
                            '0%': { boxShadow: '0 0 0 0 rgba(var(--primary-color-rgb), 0.3)' },
                            '70%': { boxShadow: '0 0 0 15px rgba(var(--primary-color-rgb), 0)' },
                            '100%': { boxShadow: '0 0 0 0 rgba(var(--primary-color-rgb), 0)' }
                        }
                    }}
                >
                    <CheckCircleIcon
                        sx={{
                            fontSize: 60,
                            color: 'var(--primary-color)',
                            animation: 'pulse 1.5s infinite',
                            '@keyframes pulse': {
                                '0%': { transform: 'scale(0.95)' },
                                '70%': { transform: 'scale(1)' },
                                '100%': { transform: 'scale(0.95)' }
                            }
                        }}
                    />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: '#333',
                        textAlign: 'center',
                        marginBottom: '0.5rem'
                    }}
                >
                    {message}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        textAlign: 'center',
                        animation: 'fadeInUp 0.6s ease-out',
                        '@keyframes fadeInUp': {
                            '0%': { opacity: 0, transform: 'translateY(10px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' }
                        }
                    }}
                >
                    Redirecting you shortly...
                </Typography>
            </Paper>
        </Box>
    );
};