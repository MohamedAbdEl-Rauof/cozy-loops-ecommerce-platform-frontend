"use client"
import { PhotoCamera } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Avatar,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { UpdateProfile, uploadImageToCloudinary } from '@/services/userServices';

const ProfileAvatar = styled(Avatar)(() => ({
    width: 120,
    height: 120,
    margin: '0 auto 20px',
    border: '4px solid #FF7043',
}));

const UploadButton = styled(Button)<{ component?: React.ElementType }>(() => ({
    marginTop: '10px',
    backgroundColor: '#FF7043',
    padding: '12px 30px',
    '&:hover': {
        backgroundColor: '#FF5722',
    },
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#FF7043',
    color: 'white',
    padding: '12px 30px',
    marginTop: '10px',
    '&:hover': {
        backgroundColor: '#FF5722',
    },
    '&:disabled': {
        backgroundColor: '#ccc',
    },
}));

const SectionBox = styled(Box)(() => ({
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
    const { user } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (user?.avatar) {
            setProfileImage(user.avatar);
        } else {
            setProfileImage(null);
        }
    }, [user?.avatar]);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                onError('Image size must be less than 5MB');
                return;
            }

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
            const base64Image = await convertToBase64(selectedImageFile);
            const imageUrl = await uploadImageToCloudinary(base64Image);

            const formData = new FormData();
            formData.append('avatar', imageUrl);
            const response = await UpdateProfile(formData);

            setProfileImage(response.user.avatar);
            setSelectedImageFile(null);
            onSuccess('Profile image updated successfully!');
        } catch (error) {
            onError(error instanceof Error ? error.message : 'Failed to update profile image');
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
                    {(!profileImage && !user?.avatar) && user?.firstName && user?.lastName &&
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