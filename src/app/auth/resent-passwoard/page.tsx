"use client"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
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
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import ForgotPasswordDialog from "@/components/auth/ForgetPasswordDialog"
import { Visibility, VisibilityOff } from "@mui/icons-material"

// Zod validation schema for OTP
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

// Zod validation schema for password reset
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

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgetPasswordOpen, setForgetPasswordOpen] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP form handling
  const {
    handleSubmit: handleOtpSubmit,
    formState: { isValid: isOtpValid, isDirty: isOtpDirty },
    setValue: setOtpValue,
    trigger: triggerOtp,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  // Password form handling
  const {
    register,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    // Update the OTP values array
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1); // Only take the first character
    setOtpValues(newOtpValues);

    // Update the form value
    const otpString = newOtpValues.join('');
    setOtpValue('otp', otpString);

    // Explicitly trigger validation after updating the value
    setTimeout(() => {
      triggerOtp('otp');
    }, 0);

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Check if pasted content is numeric and has correct length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 6).split('');

      // Fill the OTP fields with pasted digits
      const newOtpValues = [...otpValues];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newOtpValues[index] = digit;
        }
      });

      setOtpValues(newOtpValues);
      setOtpValue('otp', newOtpValues.join(''), { shouldValidate: true });
      triggerOtp('otp');

      // Focus the next empty field or the last field
      const nextEmptyIndex = newOtpValues.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    if (!resendDisabled) {
      console.log("Resending OTP...");
      setResendDisabled(true);
      // Here you would call your API to resend the OTP
    }
  };

  const onOtpSubmit = (data: OtpFormData) => {
    setIsSubmitting(true);
    console.log("OTP submitted:", data.otp);

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpVerified(true); // This will trigger the UI change to password reset form
    }, 1500);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    setIsSubmitting(true);
    console.log("New password submitted:", data.password);

    // Simulate API call to reset password
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically redirect to login page or show success message
      alert("Password reset successful! You can now login with your new password.");
    }, 1500);
  };

  // Add this useEffect after your other useEffect hooks
  useEffect(() => {
    const otpString = otpValues.join('');
    if (otpString.length === 6) {
      setOtpValue('otp', otpString);
      triggerOtp('otp');
    }
  }, [otpValues, setOtpValue, triggerOtp]);

  // Add this useEffect to debug the validation state
  useEffect(() => {
    console.log("OTP validation state:", { isOtpValid, isOtpDirty });
  }, [isOtpValid, isOtpDirty]);

  // Password requirement component
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
  )

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
            {!otpVerified ? (
              // OTP Verification Form
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
                  Check your email "test@giaml.com" for the one-time password (OTP) and enter it below to reset your password.
                </Typography>

                <Box component="form" onSubmit={handleOtpSubmit(onOtpSubmit)} sx={{ mt: 3 }}>
                  {/* OTP Input */}
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

                  {/* Resend OTP Link */}
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

                  {/* Submit Button */}
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
              // Password Reset Form
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
                  Reset Your Password
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    mb: 4,
                    color: "gray",
                  }}
                >
                  Please enter and confirm your new password. You will be asked to sign in after this step.
                </Typography>

                <Box component="form" onSubmit={handlePasswordSubmit(onPasswordSubmit)} sx={{ mt: 3 }}>

                  {/* Password */}
                  <Controller
                    name="New password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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

                  <Collapse in={Boolean(hasStartedTypingPassword)} timeout={600}>
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
                          <PasswordRequirement met={passwordChecks.symbols} text="Symbols" />
                          <PasswordRequirement met={passwordChecks.length} text="At least 8 characters" />
                        </Box>
                      </Box>
                    </Box>
                  </Collapse>

                  {/* Confirm Password */}
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Confirm password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
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

                  {/* Submit Button */}
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
    </Box>
  )
}