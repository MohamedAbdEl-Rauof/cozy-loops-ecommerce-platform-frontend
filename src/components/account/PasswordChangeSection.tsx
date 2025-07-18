"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UpdatePassword } from '@/services/userServices';

const passwordSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Current password is required'),
    newPassword: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPassword: z.string()
        .min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

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

interface PasswordChangeSectionProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

const PasswordChangeSection: React.FC<PasswordChangeSectionProps> = ({ onSuccess, onError }) => {
    const [loading, setLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSavePassword = async (data: PasswordFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('currentPassword', data.currentPassword);
            formData.append('newPassword', data.newPassword);

            await UpdatePassword(formData);
            
            reset();
            setShowPasswords({
                current: false,
                new: false,
                confirm: false,
            });
            onSuccess('Password updated successfully!');
        } catch (error: any) {
            onError(error.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const newPassword = watch('newPassword');

    return (
        <SectionBox>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                Change Password
            </Typography>
            
            <form onSubmit={handleSubmit(handleSavePassword)}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Current Password"
                                    type={showPasswords.current ? 'text' : 'password'}
                                    variant="outlined"
                                    error={!!errors.currentPassword}
                                    helperText={errors.currentPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('current')}
                                                    edge="end"
                                                >
                                                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="New Password"
                                    type={showPasswords.new ? 'text' : 'password'}
                                    variant="outlined"
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword?.message || "Must contain uppercase, lowercase, number, and special character"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    edge="end"
                                                >
                                                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Confirm New Password"
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    variant="outlined"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                    edge="end"
                                                >
                                                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                {/* Password Strength Indicator */}
                {newPassword && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                            Password Requirements:
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <Typography 
                                variant="caption" 
                                color={newPassword.length >= 8 ? 'success.main' : 'error.main'}
                                sx={{ display: 'block' }}
                            >
                                ✓ At least 8 characters
                            </Typography>
                            <Typography 
                                variant="caption" 
                                color={/[A-Z]/.test(newPassword) ? 'success.main' : 'error.main'}
                                sx={{ display: 'block' }}
                            >
                                ✓ One uppercase letter
                            </Typography>
                            <Typography 
                                variant="caption" 
                                color={/[a-z]/.test(newPassword) ? 'success.main' : 'error.main'}
                                sx={{ display: 'block' }}
                            >
                                ✓ One lowercase letter
                            </Typography>
                            <Typography 
                                variant="caption" 
                                color={/\d/.test(newPassword) ? 'success.main' : 'error.main'}
                                sx={{ display: 'block' }}
                            >
                                ✓ One number
                            </Typography>
                            <Typography 
                                variant="caption" 
                                color={/[@$!%*?&]/.test(newPassword) ? 'success.main' : 'error.main'}
                                sx={{ display: 'block' }}
                            >
                                ✓ One special character (@$!%*?&)
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Box sx={{ mt: 3 }}>
                    <SaveButton 
                        type="submit"
                        disabled={loading || !isDirty}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Update Password
                    </SaveButton>
                </Box>
            </form>
        </SectionBox>
    );
};

export default PasswordChangeSection;