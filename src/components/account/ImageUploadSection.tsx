"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    Alert,
    CircularProgress,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '@/context/AuthContext';
import { UpdateProfile } from '@/services/userServices';

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
    '&:disabled': {
        backgroundColor: '#ccc',
    },
}));

const SectionBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#f9f9f9',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #e0e0e0',
}));

interface ImageUploadSectionProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ onSuccess, onError }) => {
    const { user, updateUser } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                onError('Image size must be less than 5MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                onError('Please select a valid image file');
                return;
            }

            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = async () => {
        if (!selectedImageFile) {
            onError('Please select an image first');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('profileImage', selectedImageFile);

            const response = await UpdateProfile(formData);
            
            updateUser({ ...user, profileImage: response.user.profileImage });
            
            setSelectedImageFile(null);
            onSuccess('Profile image updated successfully!');
        } catch (error: any) {
            onError(error.response?.data?.message || 'Failed to update profile image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SectionBox>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Profile Picture
            </Typography>
            
            <Box sx={{ textAlign: 'center' }}>
                <ProfileAvatar
                    src={profileImage || undefined}
                    alt="Profile"
                >
                    {!profileImage && user?.firstName && user?.lastName && 
                        (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
                    }
                </ProfileAvatar>

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-image-upload"
                    type="file"
                    onChange={handleImageUpload}
                />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <label htmlFor="profile-image-upload">
                        <UploadButton
                            variant="contained"
                            component="span"
                            startIcon={<PhotoCamera />}
                            disabled={loading}
                        >
                            Choose Photo
                        </UploadButton>
                    </label>
                    
                    {selectedImageFile && (
                        <SaveButton 
                            onClick={handleSaveImage}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : null}
                        >
                            Save Image
                        </SaveButton>
                    )}
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </Typography>
            </Box>
        </SectionBox>
    );
};

export default ImageUploadSection;