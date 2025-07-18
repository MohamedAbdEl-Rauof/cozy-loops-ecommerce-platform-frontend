"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { UpdateProfile } from '@/services/userServices';

const profileSchema = z.object({
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid international phone number (e.g., +1234567890)')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be less than 15 digits'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

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

const DisabledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        cursor: 'not-allowed',
        backgroundColor: '#f5f5f5',
    },
    '& .MuiInputBase-root': {
        cursor: 'not-allowed',
    },
}));

interface PersonalInfoSectionProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ onSuccess, onError }) => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            phone: user?.phoneNumber || '',
        }
    });

    const handleSaveProfile = async (data: ProfileFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('phone', data.phone);

            const response = await UpdateProfile(formData);
            
            updateUser({ 
                ...user, 
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phone 
            });
            
            reset(data); // Reset form with new values to clear isDirty
            onSuccess('Profile updated successfully!');
        } catch (error: any) {
            onError(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SectionBox>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Personal Information
            </Typography>
            
            <form onSubmit={handleSubmit(handleSaveProfile)}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="First Name"
                                    variant="outlined"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Last Name"
                                    variant="outlined"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <DisabledTextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={user?.email || ''}
                            variant="outlined"
                            disabled
                            helperText="Email cannot be changed"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Phone Number"
                                    variant="outlined"
                                    placeholder="+1234567890"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message || "Include country code (e.g., +1234567890)"}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <SaveButton 
                        type="submit"
                        disabled={loading || !isDirty}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Save Profile
                    </SaveButton>
                </Box>
            </form>
        </SectionBox>
    );
};

export default PersonalInfoSection;