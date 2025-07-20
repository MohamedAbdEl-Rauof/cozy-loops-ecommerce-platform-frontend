"use client"
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    IconButton,
    LinearProgress,
} from '@mui/material';
import { Warning, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '16px',
        padding: '8px',
        maxWidth: '500px',
        width: '90%',
    },
}));

const WarningIcon = styled(Warning)(({ theme }) => ({
    fontSize: '48px',
    color: '#ff6b35',
    marginBottom: '16px',
}));

const ActionButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FF7043',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: '#FF5722',
    },
}));

const CountdownBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff3e0',
    border: '2px solid #FF7043',
    borderRadius: '12px',
    padding: '16px',
    margin: '16px 0',
    textAlign: 'center',
}));

interface SecurityDialogProps {
    open: boolean;
    onClose: () => void;
    onGoToLogin: () => void;
}

const SecurityDialog: React.FC<SecurityDialogProps> = ({
    open,
    onClose,
    onGoToLogin
}) => {
    const [countdown, setCountdown] = useState(5);
    const [progress, setProgress] = useState(100);
    const [isCountdownStarted, setIsCountdownStarted] = useState(false);

    useEffect(() => {
        if (!open) {
            setCountdown(5);
            setProgress(100);
            setIsCountdownStarted(false);
            return;
        }

        const startDelay = setTimeout(() => {
            setIsCountdownStarted(true);
        }, 500);

        return () => clearTimeout(startDelay);
    }, [open]);

    useEffect(() => {
        if (!isCountdownStarted || !open) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onGoToLogin();
                    return 0;
                }
                return prev - 1;
            });

            setProgress((prev) => prev - 20);
        }, 1000);

        return () => clearInterval(timer);
    }, [isCountdownStarted, open, onGoToLogin]);

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            disableEscapeKeyDown
            aria-labelledby="security-dialog-title"
            aria-describedby="security-dialog-description"
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1, position: 'relative' }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey.500',
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ textAlign: 'center', pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <WarningIcon />
                    
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 700, 
                            color: '#333', 
                            mb: 2 
                        }}
                        id="security-dialog-title"
                    >
                        Security Alert
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: '#666', 
                            mb: 2,
                            lineHeight: 1.6
                        }}
                        id="security-dialog-description"
                    >
                        Too many password change attempts detected. For your account security, 
                        you will be redirected to the login page.
                    </Typography>
                    
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#888', 
                            fontStyle: 'italic',
                            mb: 2
                        }}
                    >
                        If you believe this is an error or need assistance, please contact our support team.
                    </Typography>

                    {/* Countdown Box */}
                    <CountdownBox>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700, 
                                color: '#FF7043',
                                mb: 1
                            }}
                        >
                            {countdown}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: '#666',
                                mb: 2
                            }}
                        >
                            {isCountdownStarted 
                                ? `Redirecting to login page in ${countdown} second${countdown !== 1 ? 's' : ''}`
                                : 'Preparing to redirect...'
                            }
                        </Typography>
                        <LinearProgress 
                            variant="determinate" 
                            value={isCountdownStarted ? progress : 100}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#ffccbc',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#FF7043',
                                    borderRadius: 4,
                                }
                            }}
                        />
                    </CountdownBox>
                </Box>
            </DialogContent>
        </StyledDialog>
    );
};

export default SecurityDialog;