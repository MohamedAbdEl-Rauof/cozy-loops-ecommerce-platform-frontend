"use client"
import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    CircularProgress,
    IconButton,
    InputAdornment,
    Collapse,
} from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UpdatePassword } from '@/services/userServices';
import { useRouter } from 'next/navigation';
import SecurityDialog from '@/components/dialogs/SecurityDialog'
import Cookies from 'js-cookie';

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

const SaveButton = styled(Button)(() => ({
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

const SectionBox = styled(Box)(() => ({
    backgroundColor: '#f9f9f9',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #e0e0e0',
}));

interface PasswordRequirementProps {
    met: boolean;
    text: string;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ met, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        {met ? (
            <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
        ) : (
            <Cancel sx={{ fontSize: 16, color: 'error.main', mr: 1 }} />
        )}
        <Typography
            variant="caption"
            sx={{
                color: met ? 'success.main' : 'error.main',
                fontSize: '0.75rem'
            }}
        >
            {text}
        </Typography>
    </Box>
);

interface PasswordChangeSectionProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

const PasswordChangeSection: React.FC<PasswordChangeSectionProps> = ({ onSuccess, onError }) => {
    const [loading, setLoading] = useState(false);
    const [showSecurityDialog, setShowSecurityDialog] = useState(false);
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

    const newPassword = watch('newPassword');
    const confirmPassword = watch('confirmPassword');

    const hasStartedTypingPassword = Boolean(newPassword && newPassword.length > 0);
    const hasStartedTypingConfirm = Boolean(confirmPassword && confirmPassword.length > 0);
    const passwordsDoNotMatch = hasStartedTypingConfirm && newPassword !== confirmPassword;

    const passwordChecks = useMemo(() => ({
        lowercase: /[a-z]/.test(newPassword),
        uppercase: /[A-Z]/.test(newPassword),
        numbers: /\d/.test(newPassword),
        symbols: /[@$!%*?&]/.test(newPassword),
        length: newPassword.length >= 8,
    }), [newPassword]);

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const router = useRouter();

    const clearUserData = () => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        });
        Cookies.remove('accessToken');
        Cookies.remove('refresh_token');
    };


    const handleGoToLogin = () => {
        clearUserData();
        setShowSecurityDialog(false);
        router.push('/auth/login');
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
            if (error.response?.status === 429) {
                setShowSecurityDialog(true);
                return;
            }

            onError(error.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                                        helperText={errors.newPassword?.message}
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

                            <Collapse in={hasStartedTypingPassword} timeout={600}>
                                <Box sx={{
                                    mt: 2,
                                    p: 2,
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: 1,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease-in-out'
                                }}>
                                    <Typography variant="body2" sx={{ mb: 1, color: "#666", fontWeight: 500 }}>
                                        Your password must include:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Box sx={{ width: '50%' }}>
                                            <PasswordRequirement met={passwordChecks.lowercase} text="Lower case letters" />
                                            <PasswordRequirement met={passwordChecks.uppercase} text="Capital letters" />
                                        </Box>
                                        <Box sx={{ width: '50%' }}>
                                            <PasswordRequirement met={passwordChecks.numbers} text="Numbers" />
                                            <PasswordRequirement met={passwordChecks.symbols} text="Symbols" />
                                            <PasswordRequirement met={passwordChecks.length} text="At least 8 characters" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Collapse>
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
                                        error={!!errors.confirmPassword || passwordsDoNotMatch}
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

                            <Collapse in={passwordsDoNotMatch} timeout={600}>
                                <Box sx={{
                                    mt: 1,
                                    p: 1.5,
                                    backgroundColor: "#ffebee",
                                    borderRadius: 1,
                                    border: '1px solid #ffcdd2',
                                    transition: 'all 0.3s ease-in-out'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Cancel sx={{ fontSize: 16, color: 'error.main', mr: 1 }} />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'error.main',
                                                fontSize: '0.75rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            Passwords don't match
                                        </Typography>
                                    </Box>
                                </Box>
                            </Collapse>
                        </Grid>
                    </Grid>

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

            <SecurityDialog
                open={showSecurityDialog}
                onClose={() => setShowSecurityDialog(false)}
                onGoToLogin={handleGoToLogin}
            />
        </>

    );
};

export default PasswordChangeSection;