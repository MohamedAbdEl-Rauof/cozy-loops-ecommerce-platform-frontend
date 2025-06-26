"use client"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Container,
  FormHelperText,
  Snackbar,
  Alert,
  CircularProgress,
  Collapse,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
  Check,
  CheckCircle,
} from "@mui/icons-material"
import { Dialog, DialogContent, Fade, Grow } from "@mui/material";
import { useAuth } from "@/context/AuthContext"
import Image from "next/image"
import axios from "axios"
import SocialAuth from "@/components/shared/SocialAuth"
import { useRouter } from "next/navigation"
import { CountdownRedirect } from "@/components/auth/CountdownRedirect"

// Zod validation schema
const registrationSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    firstName: z
      .string()
      .min(2, { message: "First name is required" })
      .max(10, { message: "First name must be less than 10 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name is required" })
      .max(10, { message: "Last name must be less than 10 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[a-z]/, { message: "Password must contain lowercase letters" })
      .regex(/[A-Z]/, { message: "Password must contain capital letters" })
      .regex(/[0-9]/, { message: "Password must contain numbers" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain symbols" }),
    confirmPassword: z.string(),
    emailUpdates: z.boolean().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms of Services",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof registrationSchema>

export default function RegistrationPage() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, isAuthenticated, isUserAuthenticated, loading } = useAuth();
  const [registeredEmail, setRegisteredEmail] = useState<string>("");
  const router = useRouter();
  const [showAuthenticatedMessage, setShowAuthenticatedMessage] = useState(false);

  useEffect(() => {
    if (isUserAuthenticated()) {
      setShowAuthenticatedMessage(true);
    }
  }, [isAuthenticated, loading, isUserAuthenticated]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      emailUpdates: false,
      agreeToTerms: false,
    },
  })

  // Watch password field to show requirements
  const password = watch("password")
  const hasStartedTypingPassword = password && password.length > 0

  // Password validation checks
  const passwordChecks = {
    lowercase: /[a-z]/.test(password || ""),
    uppercase: /[A-Z]/.test(password || ""),
    numbers: /[0-9]/.test(password || ""),
    symbols: /[^a-zA-Z0-9]/.test(password || ""),
    length: (password || "").length >= 8,
  }


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      setRegisteredEmail(data.email);
      setShowSuccess(true);
      reset();
    } catch (error: unknown) {
      console.error("Error submitting form:", error);

      if (axios.isAxiosError(error)) {

        const errorMessage = error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again later.";

        setError(errorMessage);
        setShowErrorDialog(true);
      } else {
        setError("An unexpected error occurred. Please try again later.");
        setShowErrorDialog(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const CountdownDialog = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
      let timer: NodeJS.Timeout;

      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else if (countdown === 0) {
        setShowSuccess(false);
        router.push("/auth/verify-email?email=" + encodeURIComponent(registeredEmail));
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [countdown]);

    // Initialize countdown when dialog opens
    useEffect(() => {
      if (showSuccess) {
        setCountdown(5);
      }
    }, [showSuccess]);

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: 2,
        justifyContent: 'center'
      }}>
        <Box sx={{ position: 'relative', mb: 4 }}>
          <Fade in={true} timeout={1000}>
            <CheckCircle sx={{
              fontSize: 230,
              color: '#4caf50',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(0.95)', opacity: 0.7 },
                '70%': { transform: 'scale(1.1)', opacity: 1 },
                '100%': { transform: 'scale(0.95)', opacity: 0.7 },
              },
            }} />
          </Fade>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Registration Successful!
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: '#666', fontSize: '1.2rem', maxWidth: 600 }}>
          Please check your email to confirm your account. We've sent a verification link to your email address.
        </Typography>

        <Typography variant="body2" sx={{ mb: 4, color: '#666' }}>
          This dialog will close in <strong>{countdown}</strong> seconds.
        </Typography>
      </Box>
    );
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
      <Dialog
        open={showSuccess}
        TransitionComponent={Grow}
        transitionDuration={700}
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 800,
            width: '100%',
            minHeight: 400,
            p: 3
          }
        }}
      >
        <DialogContent>
          <CountdownDialog />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showErrorDialog}
        autoHideDuration={6000}
        onClose={() => setShowErrorDialog(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 6 }}
      >
        <Alert
          onClose={() => setShowErrorDialog(false)}
          severity="error"
          variant="filled"
          sx={{
            width: '100%',
            boxShadow: 3,
            alignItems: 'center',
            '& .MuiAlert-message': {
              fontSize: '1rem'
            }
          }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Left side - Image */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: { lg: "50%" },
          position: "relative",
        }}
      >
        <Image
          src="/images/auth/register.webp"
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
            <Typography
              variant="h4"
              component="h1"
              sx={{
                textAlign: "center",
                mb: 4,
                fontWeight: 600,
                color: "#1a1a1a",
              }}
            >
              Create Your Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
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

              {/* First Name */}
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="First name"
                    placeholder="Enter first name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
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

              {/* Last Name */}
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Last name"
                    placeholder="Enter last name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
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

              {/* Password */}
              <Controller
                name="password"
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

              {/* Checkboxes */}
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="emailUpdates"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Yes, email me news and updates"
                      sx={{ mb: 1, color: "black" }}
                    />
                  )}
                />

                <Controller
                  name="agreeToTerms"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label={
                        <Typography variant="body2" color="black">
                          I agree to the
                          <Link href="/auth/register" sx={{ color: "var(--primary-color)" }} underline="hover">
                            Terms of Services
                          </Link>
                        </Typography>
                      }
                    />
                  )}
                />
                {errors.agreeToTerms && (
                  <FormHelperText error sx={{ ml: 0 }}>
                    {errors.agreeToTerms.message}
                  </FormHelperText>
                )}
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isValid || !isDirty}
                sx={{
                  height: 'var(--input-height)',
                  mb: 3,
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: 'var(--button-border-radius)',
                  fontWeight: 'var(--button-font-weight)',
                  letterSpacing: 'var(--button-letter-spacing)',
                  "&:hover": {
                    backgroundColor: "var(--primary-hover)",
                  },
                  "&:disabled": {
                    backgroundColor: "var(--primary-disabled)",
                    color: "#666",
                  },
                }}
              >
                {isSubmitting ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : "Create Account"}
              </Button>

              {/* Social Login */}
              <SocialAuth />

              {/* Sign In Link */}
              <Typography variant="body2" sx={{ textAlign: "center", color: "#666" }}>
                Already have an account?{" "}
                <Link href="/auth/login" sx={{ color: "var(--primary-color)" }} underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
