import { Google, Apple, Instagram, Info, Close } from '@mui/icons-material';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

const SocialAuthDialog = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { loginWithGoogle } = useAuth();

    const handleSocialClick = (providerName: string) => {
        if (providerName === 'Google') {
            // Don't open dialog for Google, handle authentication directly
            return;
        }
        if (providerName === 'Instagram') {
            handleInstagramLogin();
            return;
        }
        setSelectedProvider(providerName);
        setDialogOpen(true);
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            setIsLoading(true);
            // Add null check since credential can be undefined
            if (credentialResponse.credential) {
                await loginWithGoogle(credentialResponse.credential);
            } else {
                throw new Error('No credential received from Google');
            }
        } catch (error) {
            console.error('Google login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = () => {
        console.error('Google login failed');
        // You might want to show an error message here
    };


    const handleInstagramLogin = async () => {
        try {
            setIsLoading(true);

            // Instagram OAuth flow - redirect to Instagram authorization
            const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
            const redirectUri = encodeURIComponent(`${window.location.origin}/auth/instagram/callback`);
            const scope = 'user_profile,user_media';

            const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

            // Redirect to Instagram authorization page
            window.location.href = instagramAuthUrl;

        } catch (error) {
            console.error('Instagram login failed:', error);
            setIsLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {[
                    { icon: <Google />, color: "#4285F4", name: "Google" },
                    { icon: <Apple />, color: "#000", name: "Apple" },
                    { icon: <Instagram />, color: "#E4405F", name: "Instagram" },
                ].map((social, index) => (
                    social.name === 'Google' ? (
                        <Box key={index} sx={{ position: 'relative' }}>
                            <IconButton
                                aria-label="Sign in with Google"
                                disabled={isLoading}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "#f5f5f5",
                                    transition: 'transform 0.2s, background-color 0.2s',
                                    "&:hover": {
                                        backgroundColor: "#e0e0e0",
                                        transform: 'scale(1.1)'
                                    },
                                }}
                            >
                                <Box component="span" sx={{ color: social.color }}>
                                    {social.icon}
                                </Box>
                            </IconButton>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap={false}
                                theme="outline"
                                size="medium"
                                width="40"
                                containerProps={{
                                    style: {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        opacity: 0,
                                        width: '40px',
                                        height: '40px'
                                    }
                                }}
                            />
                        </Box>
                    ) : (
                        <IconButton
                            key={index}
                            aria-label={`Sign in with ${social.name}`}
                            onClick={() => handleSocialClick(social.name)}
                            disabled={isLoading}
                            sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#f5f5f5",
                                transition: 'transform 0.2s, background-color 0.2s',
                                "&:hover": {
                                    backgroundColor: "#e0e0e0",
                                    transform: 'scale(1.1)'
                                },
                            }}
                        >
                            <Box component="span" sx={{ color: social.color }}>
                                {social.icon}
                            </Box>
                        </IconButton>
                    )
                ))}
            </Box>

            {/* Loading indicator */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            )}

            {/* Coming Soon Dialog for other providers */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        maxWidth: 550,
                        p: 1
                    }
                }}
            >
                <IconButton
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'text.secondary'
                    }}
                >
                    <Close fontSize="small" />
                </IconButton>
                <DialogTitle sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    pb: 1
                }}>
                    <Info color="info" />
                    <Typography variant="h6" component="div">
                        Coming Soon
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        {`Sign in with ${selectedProvider} will be available soon. `}
                    </Typography>
                    <Typography variant="body1">
                        {`We're working on adding this feature to enhance your experience.`}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 1 }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="contained"
                        sx={{
                            backgroundColor: 'var(--primary-color)',
                            color: "white",
                            "&:hover": {
                                backgroundColor: 'var(--primary-hover)',
                            }
                        }}
                    >
                        Got it
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SocialAuthDialog;