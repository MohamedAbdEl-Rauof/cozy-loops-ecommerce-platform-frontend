
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Google, Apple, Instagram, Pinterest } from '@mui/icons-material';

const SocialAuth = () => {
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Social Login */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {[
                    { icon: <Google />, color: "#4285F4", name: "Google" },
                    { icon: <Apple />, color: "#000", name: "Apple" },
                    { icon: <Instagram />, color: "#E4405F", name: "Instagram" },
                    { icon: <Pinterest />, color: "#BD081C", name: "Pinterest" }
                ].map((social, index) => (
                    <IconButton
                        key={index}
                        aria-label={`Sign in with ${social.name}`}
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
                ))}
            </Box>
        </Box>

    );
}
export default SocialAuth;