"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    Divider,
    Alert,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    margin: '0 auto 20px',
    border: '4px solid #FF7043',
}));

const UploadButton = styled(Button)(({ theme }) => ({
    marginTop: '10px',
    backgroundColor: '#FF7043',
    '&:hover': {
        backgroundColor: '#FF5722',
    },
}));

const SaveButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FF7043',
    color: 'white',
    padding: '12px 30px',
    '&:hover': {
        backgroundColor: '#FF5722',
    },
}));

const ProfileSection: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        // Add save logic here
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleSavePassword = () => {
        // Add password change logic here
        setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Profile Information
            </Typography>

            {showSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Profile updated successfully!
                </Alert>
            )}

            {/* Profile Picture */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <ProfileAvatar
                    src={profileImage || undefined}
                    alt="Profile"
                >
                    {!profileImage && formData.firstName.charAt(0) + formData.lastName.charAt(0)}
                </ProfileAvatar>

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-image-upload"
                    type="file"
                    onChange={handleImageUpload}
                />
                <label htmlFor="profile-image-upload">
                    <UploadButton
                        variant="contained"
                        startIcon={<PhotoCamera />}
                    >
                        Upload Photo
                    </UploadButton>
                </label>
            </Box>

            {/* Personal Information */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, mb: 3 }}>
                <SaveButton onClick={handleSaveProfile}>
                    Save Profile
                </SaveButton>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Password Change */}
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Change Password
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
                <SaveButton onClick={handleSavePassword}>
                    Update Password
                </SaveButton>
            </Box>
        </Box>
    );
}

export default ProfileSection;