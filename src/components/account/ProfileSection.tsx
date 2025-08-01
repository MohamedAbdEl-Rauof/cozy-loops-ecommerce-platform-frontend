"use client"
import {
    Box,
    Alert,
} from '@mui/material';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

import ImageUploadSection from './ImageUploadSection';
import PasswordChangeSection from './PasswordChangeSection';
import PersonalInfoSection from './PersonalInfoSection';

const ProfileSection: React.FC = () => {
    const [showSuccess, setShowSuccess] = useState<string | null>(null);
    const [showError, setShowError] = useState<string | null>(null);
    const { refetchUser } = useAuth();

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

    const handleSuccess = async (message: string) => {
        showMessage('success', message);
        await refetchUser();
    };

    const handleError = (message: string) => {
        showMessage('error', message);
    };

    return (
        <Box>
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