
import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Google, Apple, Instagram, Pinterest, Info, Close } from '@mui/icons-material';

const SocialAuth = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState('');

    const handleSocialClick = (providerName: string) => {
        setSelectedProvider(providerName);
        setDialogOpen(true);
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
                    { icon: <Pinterest />, color: "#BD081C", name: "Pinterest" }
                ].map((social, index) => (
                    <IconButton
                        key={index}
                        aria-label={`Sign in with ${social.name}`}
                        onClick={() => handleSocialClick(social.name)}
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

            {/* Coming Soon Dialog */}
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

export default SocialAuth;