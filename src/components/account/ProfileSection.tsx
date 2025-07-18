"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Alert,
} from '@mui/material';
import ImageUploadSection from './ImageUploadSection';
import PersonalInfoSection from './PersonalInfoSection';
import PasswordChangeSection from './PasswordChangeSection';

const ProfileSection: React.FC = () => {
    const [showSuccess, setShowSuccess] = useState<string | null>(null);
    const [showError, setShowError] = useState<string | null>(null);

    const showMessage = (type: 'success' | 'error', message: string) => {
        if (type === 'success') {
            setShowSuccess(message);
            setShowError(null);
            setTimeout(() => setShowSuccess(null), 3000);
        } else {
            setShowError(message);
            setShowSuccess(null);
            setTimeout(() => setShowError(null), 3000);
        }
    };

    const handleSuccess = (message: string) => {
        showMessage('success', message);
    };

    const handleError = (message: string) => {
        showMessage('error', message);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Profile Settings
            </Typography>

            {showSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {showSuccess}
                </Alert>
            )}

            {showError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {showError}
                </Alert>
            )}

            <ImageUploadSection 
                onSuccess={handleSuccess}
                onError={handleError}
            />

            <PersonalInfoSection 
                onSuccess={handleSuccess}
                onError={handleError}
            />

            <PasswordChangeSection 
                onSuccess={handleSuccess}
                onError={handleError}
            />
        </Box>
    );
};

export default ProfileSection;