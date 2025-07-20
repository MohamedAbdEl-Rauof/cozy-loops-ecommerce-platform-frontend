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
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';

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
        .refine((value) => {
            if (!value || value.trim() === '') return true; // Allow empty
            return isValidPhoneNumber(value);
        }, 'Please enter a valid international phone number')
        .refine((value) => {
            if (value && value.trim() !== '' && value.length < 4) {
                return false;
            }
            return true;
        }, 'Phone number is too short'),
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

const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
    '& .PhoneInputInput': {
        border: '1px solid #c4c4c4',
        borderRadius: '4px',
        padding: '16.5px 14px',
        fontSize: '16px',
        fontFamily: 'inherit',
        width: '100%',
        '&:focus': {
            outline: 'none',
            borderColor: '#FF7043',
            borderWidth: '2px',
        },
        '&.PhoneInputInput--error': {
            borderColor: '#d32f2f',
        },
    },
    '& .PhoneInputCountrySelect': {
        marginRight: '8px',
        border: 'none',
        background: 'transparent',
        fontSize: '16px',
    },
}));


interface PersonalInfoSectionProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ onSuccess, onError }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            phone: user?.phoneNumber || '',
        }
    });

    React.useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || user.phoneNumber || '',
            });
        }
    }, [user, reset]);

    const handleSaveProfile = async (data: ProfileFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('phoneNumber', data.phone);

            const response = await UpdateProfile(formData);

            reset(data);
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
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '12px' }}>
                                Phone Number
                            </Typography>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <Box>
                                        <StyledPhoneInput
                                            international
                                            countryCallingCodeEditable={false}
                                            defaultCountry="EG"
                                            value={value}
                                            onChange={(phone) => onChange(phone || '')}
                                            placeholder="Enter phone number"
                                            className={error ? 'PhoneInputInput--error' : ''}
                                        />
                                        {error && (
                                            <Typography variant="caption" sx={{ color: '#d32f2f', mt: 0.5, display: 'block' }}>
                                                {error.message}
                                            </Typography>
                                        )}
                                        {!error && value && isValidPhoneNumber(value) && (
                                            <Typography variant="caption" sx={{ color: '#4caf50', mt: 0.5, display: 'block' }}>
                                                ✓ Valid phone number
                                            </Typography>
                                        )}
                                        {!error && (!value || value.trim() === '') && (
                                            <Typography variant="caption" sx={{ color: '#666', mt: 0.5, display: 'block' }}>
                                                Select country and enter your phone number
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            />
                        </Box>
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