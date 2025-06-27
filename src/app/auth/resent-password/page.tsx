"use client"
import { useState, useRef, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Box,
  Button,
  Typography,
  Link as MuiLink,
  Container,
  CircularProgress,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Visibility, VisibilityOff, Check } from "@mui/icons-material"
import { verifyOtp, forgotPassword, resetPassword } from "@/services/authService"
import { useAuth } from "@/context/AuthContext"
import { CountdownRedirect } from "@/components/auth/CountdownRedirect"

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

const passwordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type OtpFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <Box sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 0.5,
    transition: 'all 0.3s ease',
    opacity: met ? 1 : 0.7
  }}>
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: met ? "#4caf50" : "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: 'background-color 0.3s ease',
      }}
    >
      {met && <Check sx={{ fontSize: 12, color: "white" }} />}
    </Box>
    <Typography
      variant="body2"
      sx={{
        color: met ? "#4caf50" : "#757575",
        fontSize: "0.875rem",
        transition: 'color 0.3s ease',
      }}
    >
      {text}
    </Typography>
  </Box>
);

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasStartedTypingPassword, setHasStartedTypingPassword] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
    length: false
  });
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const { isAuthenticated, isUserAuthenticated, loading } = useAuth();
  const [showAuthenticatedMessage, setShowAuthenticatedMessage] = useState(false);

  useEffect(() => {
    if (isUserAuthenticated()) {
      setShowAuthenticatedMessage(true);
    }
  }, [isAuthenticated, loading, isUserAuthenticated]);

  const {
    handleSubmit: handleOtpSubmit,
    formState: { },
    setValue: setOtpValue,
    trigger: triggerOtp,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    formState: { isValid: isPasswordValid },
    control,
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const password = watch("password");

  useEffect(() => {
    if (email) {
      setResendDisabled(true);

      const sendInitialOtp = async () => {
        try {
          await forgotPassword(email);
          showNotification("OTP has been sent to your email", "success");
        } catch (error) {
          console.error("Error sending initial OTP:", error);
          showNotification("Failed to send OTP. Please try again.", "error");
        }
      };

      sendInitialOtp();
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      setHasStartedTypingPassword(true);
      setPasswordChecks({
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /[0-9]/.test(password),
        symbols: /[^A-Za-z0-9]/.test(password),
        length: password.length >= 8
      });
    }
  }, [password]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showRedirectMessage && redirectCountdown > 0) {
      timer = setTimeout(() => setRedirectCountdown(prev => prev - 1), 1000);
    } else if (showRedirectMessage && redirectCountdown === 0) {
      router.push('/auth/verify-email');
    }
    return () => timer && clearTimeout(timer);
  }, [showRedirectMessage, redirectCountdown, router]);

  useEffect(() => {
    const otpString = otpValues.join('');
    if (otpString.length === 6) {
      setOtpValue('otp', otpString);
      triggerOtp('otp');
    }
  }, [otpValues, setOtpValue, triggerOtp]);

  const showNotification = (message: string, type: "success" | "error") => {
    setSuccessMessage(message);
    setShowSuccessAlert(true);
    setSeverity(type);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1);
    setOtpValues(newOtpValues);

    setOtpValue('otp', newOtpValues.join(''));
    setTimeout(() => triggerOtp('otp'), 0);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 6).split('');
      const newOtpValues = [...otpValues];

      digits.forEach((digit, index) => {
        if (index < 6) newOtpValues[index] = digit;
      });

      setOtpValues(newOtpValues);
      setOtpValue('otp', newOtpValues.join(''), { shouldValidate: true });
      triggerOtp('otp');

      const nextEmptyIndex = newOtpValues.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleResendOtp = async () => {
    if (!resendDisabled && email) {
      try {
        setIsSubmitting(true);
        await forgotPassword(email);
        showNotification("OTP has been sent to your email", "success");
        setResendDisabled(true);
        setCountdown(60);
      } catch (error) {
        console.error("Error resending OTP:", error);
        setShowRedirectMessage(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    setIsSubmitting(true);

    try {
      if (!email) throw new Error("Email is missing");
      const response = await verifyOtp(email, data.otp);
      setResetToken(response.resetToken as string);
      setOtpVerified(true);
      showNotification("OTP verified successfully", "success");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showNotification("Invalid OTP. Please try again or request a new code.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsSubmitting(true);

    try {
      if (!resetToken) throw new Error("Reset token is missing");

      await resetPassword(resetToken, data.password);
      showNotification("Password reset successful! You will be redirected to login.", "success");

      setTimeout(() => router.push('/auth/login'), 2000);
    } catch (error: any) {
      console.error("Error resetting password:", error);

      // Check for specific error message about same password
      if (error.response?.data?.message === "New password cannot be the same as your current password") {
        showNotification("New password cannot be the same as your current password.", "error");
      } else {
        showNotification("Failed to reset password. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showAuthenticatedMessage || (!loading && isUserAuthenticated())) {
    return (
      <CountdownRedirect
        message="You are already authenticated!"
        redirectPath="/"
        seconds={5}
      />
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      {/* Left side - Image */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: { lg: "50%" },
          position: "relative",
        }}
      >
        <Image
          src="/images/auth/resentPassword.webp"
          quality={100}
          priority
          alt="Hands holding a heart with craft materials"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Right side - Form */}
      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: "white",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
            {/* Redirect Message */}
            {showRedirectMessage && (
              <Box sx={{
                mb: 3,
                p: 2,
                backgroundColor: "#f8f9fa",
                borderRadius: 1,
                border: "1px solid #e0e0e0"
              }}>
                <Typography variant="body1" sx={{ mb: 1, color: "#666" }}>
                  Will redirect to Resend OTP page in {redirectCountdown} seconds
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => router.push('/auth/verify-email')}
                  sx={{ mt: 1 }}
                >
                  Go now
                </Button>
              </Box>
            )}

            {!otpVerified ? (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    textAlign: "left",
                    mb: 2,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  Enter OTP
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    mb: 4,
                    color: "gray",
                  }}
                >
                  Check your email for the one-time password (OTP) and enter it below to reset your password.
                </Typography>

                <Box component="form" onSubmit={handleOtpSubmit(onOtpSubmit)} sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                      OTP Code
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                      {otpValues.map((value, index) => (
                        <TextField
                          key={index}
                          inputRef={(el) => (inputRefs.current[index] = el)}
                          value={value}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          inputProps={{
                            maxLength: 1,
                            style: { textAlign: 'center', fontSize: '1.5rem', padding: '8px' }
                          }}
                          sx={{
                            width: '48px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 'var(--input-border-radius)'
                            }
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box sx={{ textAlign: "left", mb: 3 }}>
                    <MuiLink
                      sx={{
                        color: resendDisabled ? 'gray' : 'var(--primary-color)',
                        cursor: resendDisabled ? 'default' : 'pointer',
                        pointerEvents: resendDisabled ? 'none' : 'auto'
                      }}
                      underline="hover"
                      onClick={handleResendOtp}
                    >
                      {resendDisabled
                        ? `Resend OTP in ${countdown}s`
                        : "Didn't receive the code? Resend OTP"}
                    </MuiLink>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={otpValues.join('').length !== 6 || isSubmitting}
                    sx={{
                      height: 'var(--input-height)',
                      mb: 3,
                      backgroundColor: 'var(--primary-color)',
                      color: "white",
                      "&:hover": {
                        backgroundColor: 'var(--primary-hover)',
                      },
                      "&:disabled": {
                        backgroundColor: 'var(--primary-disabled)',
                        color: "#666",
                      },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : "Verify OTP"}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    textAlign: "left",
                    mb: 2,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  Reset Password
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    mb: 4,
                    color: "gray",
                  }}
                >
                  Create a new password for your account.
                </Typography>

                <Box component="form" onSubmit={handlePasswordSubmit(onPasswordSubmit)} sx={{ mt: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            mb: hasStartedTypingPassword ? 1 : 3,
                            '& .MuiOutlinedInput-root': {
                              height: 'var(--input-height)',
                              borderRadius: 'var(--input-border-radius)'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Collapse in={hasStartedTypingPassword} timeout={600}>
                    <Box sx={{
                      mb: 3,
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
                          <PasswordRequirement met={passwordChecks.length} text="At least 8 characters" />
                        </Box>
                      </Box>
                    </Box>
                  </Collapse>

                  <Box sx={{ mb: 3 }}>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Confirm password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  edge="end"
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              height: 'var(--input-height)',
                              borderRadius: 'var(--input-border-radius)'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={!isPasswordValid || isSubmitting}
                    sx={{
                      height: 'var(--input-height)',
                      mb: 3,
                      backgroundColor: 'var(--primary-color)',
                      color: "white",
                      "&:hover": {
                        backgroundColor: 'var(--primary-hover)',
                      },
                      "&:disabled": {
                        backgroundColor: 'var(--primary-disabled)',
                        color: "#666",
                      },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : "Reset Password"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessAlert(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}