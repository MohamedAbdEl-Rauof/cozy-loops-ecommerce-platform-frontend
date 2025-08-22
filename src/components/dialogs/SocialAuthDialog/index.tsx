import { Google, LinkedIn } from '@mui/icons-material';
import { Box, IconButton, CircularProgress } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

const SocialAuthDialog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { loginWithGoogle } = useAuth();

    const handleSocialClick = (providerName: string) => {
        if (providerName === 'Google') {
            return;
        }

        if (providerName === 'LinkedIn') {
            handleLinkedInLogin();
            return;
        }
    };

    const handleLinkedInLogin = () => {
        try {
            const state = crypto.randomUUID();
            const timestamp = Date.now();
            const redirectUrl = window.location.pathname;

            const stateData = {
                state,
                timestamp,
                redirectUrl
            };

            localStorage.setItem('linkedin_oauth_state', JSON.stringify(stateData));
            localStorage.setItem('linkedin_oauth_timestamp', timestamp.toString());

            const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
                `response_type=code&` +
                `client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&` +
                `redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!)}&` +
                `state=${state}&` +
                `scope=openid%20profile%20email`;

            window.location.href = linkedInAuthUrl;
        } catch (error) {
            console.error('LinkedIn login error:', error);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            setIsLoading(true);
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
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {[
                    { icon: <Google />, color: "#4285F4", name: "Google" },
                    { icon: <LinkedIn />, color: "#0077B5", name: "LinkedIn" },
                ].map((social, index) => (
                    social.name === 'Google' ? (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                borderRadius: '50%',
                                transition: 'transform 0.2s, background-color 0.2s',
                                "&:hover": {
                                    transform: 'scale(1.1)',
                                    '& .google-icon-button': {
                                        backgroundColor: "#e0e0e0",
                                    }
                                },
                            }}
                        >
                            <IconButton
                                aria-label="Sign in with Google"
                                disabled={isLoading}
                                className="google-icon-button"
                                sx={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: "#f5f5f5",
                                    transition: 'background-color 0.2s',
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
                                        height: '40px',
                                        cursor: 'pointer'
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

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            )}
        </Box>
    );
};

export default SocialAuthDialog;