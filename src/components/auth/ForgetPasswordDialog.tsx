import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Typography,
    Box,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";
import Link from "next/link";

// Zod validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function ForgotPasswordDialog({ open, onClose }: ForgotPasswordDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm<FormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // For demo purposes, always succeed
            setSuccess(true);
            reset();
        } catch (error) {
            setError("Failed to send reset email. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            reset();
            setSuccess(false);
            setError(null);
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    width: "100%",
                    maxWidth: 500,
                    p: 2,
                }
            }}
        >
            <DialogTitle sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1
            }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                    Forget your password ?
                </Typography>

            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
                {success ? (
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        py: 3
                    }}>
                        <CheckCircle sx={{
                            fontSize: 70,
                            color: "var(--primary-color)",
                            mb: 2
                        }} />
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Email Sent Successfully
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
                            No worries! Enter your email address below and we will send you a reset password email with instructions                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "var(--primary-hover)",
                                },
                                height: "var(--input-height)",
                                borderRadius: "var(--button-border-radius)",
                                px: 4
                            }}
                        >
                            Got it
                        </Button>
                    </Box>
                ) : (
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit(onSubmit)(e);
                        }}
                        sx={{ pt: 1 }}
                    >
                        <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
                            No worries! Enter your email address below and we will send you a reset password email with instructions                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            height: 'var(--input-height)',
                                            borderRadius: 'var(--input-border-radius)'
                                        }
                                    }}
                                />
                            )}
                        />

                        <DialogActions sx={{ px: 0, pb: 0, alignItems: "center", justifyContent: "center" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!isValid || !isDirty || isSubmitting}
                                sx={{
                                    width: "100%",
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "var(--primary-hover)",
                                    },
                                    "&:disabled": {
                                        backgroundColor: "var(--primary-disabled)",
                                        color: "#666",
                                    },
                                }}
                            >
                                {isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Send OTP"}
                            </Button>
                        </DialogActions>

                        <Typography variant="body2" sx={{ textAlign: "center", color: "#666", mt: 2 }}>
                            Nevermind,{" "}
                            <span
                                style={{
                                    color: 'var(--primary-color)',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                                className="hover:underline"
                                onClick={handleClose}
                            >
                                Return to sign in
                            </span>
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}