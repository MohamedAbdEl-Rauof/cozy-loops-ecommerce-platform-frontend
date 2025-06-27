"use client"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress,
  DialogContent,
  Dialog,
  Fade,
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import SocialAuth from "@/components/shared/SocialAuth"
import ForgotPasswordDialog from "@/components/auth/ForgetPasswordDialog"
import { useAuth } from "@/context/AuthContext"
import { CountdownRedirect } from "@/components/auth/CountdownRedirect"
import { useRouter } from "next/navigation"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

type FormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [hasStartedTypingPassword, setHasStartedTypingPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [forgetPasswordOpen, setForgetPasswordOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false, message: '', severity: 'error' as 'error' | 'warning' | 'info' | 'success'
  });
  const { login, isAuthenticated, loading, isUserAuthenticated } = useAuth();
  const [showAuthenticatedMessage, setShowAuthenticatedMessage] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const router = useRouter();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (showSuccessAnimation) {
      const totalTime = 3000;
      const interval = 50;
      const steps = totalTime / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep += 1;
        setProgressValue((currentStep / steps) * 100);

        if (currentStep >= steps) {
          clearInterval(timer);
          router.push('/');
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showSuccessAnimation, router]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (isUserAuthenticated() && !showSuccessAnimation) {
      setShowAuthenticatedMessage(true);
    }
  }, [isAuthenticated, loading, isUserAuthenticated, showSuccessAnimation]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verified = searchParams.get('verified');

    if (verified === 'true') {
      setSnackbar({
        open: true,
        message: 'Email verified successfully! You can now log in.',
        severity: 'success'
      });
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);
      setShowSuccessAnimation(true);
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle specific error cases
      if (error.response && error.response.status === 403 &&
        error.response.data && error.response.data.emailVerified === false) {
        setSnackbar({
          open: true,
          message: 'Email not verified. Please check your inbox for verification email.',
          severity: 'warning'
        });
      } else {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || error.message || 'Login failed. Please try again.',
          severity: 'error'
        });
      }
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showAuthenticatedMessage && !showSuccessAnimation) {
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
          src="/images/auth/login.webp"
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
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
              sx={{ mt: 3 }}
              noValidate
            >
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
                    onChange={(e) => {
                      field.onChange(e);
                      if (!hasStartedTypingPassword && e.target.value) {
                        setHasStartedTypingPassword(true);
                      }
                    }}
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

              {/* Forget Password */}
              <Box sx={{ textAlign: "left", mb: 3 }}>
                <MuiLink sx={{ color: 'var(--primary-color)', cursor: 'pointer' }} underline="hover" onClick={() => setForgetPasswordOpen(true)}>
                  Forgot password?
                </MuiLink>
                <ForgotPasswordDialog open={forgetPasswordOpen} onClose={() => setForgetPasswordOpen(false)} />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={!isValid || !isDirty || isSubmitting}
                sx={{
                  height: 'var(--input-height)',
                  mb: 3,
                  backgroundColor: 'var(--primary-color)',
                  color: "white",
                  "&:hover": {
                    backgroundColor: 'var(--primary-hover)',
                  },
                  "&:disabled": {
                    backgroundColor: 'var(--primary-color)',
                    color: "#666",
                  },
                }}
              >
                {isSubmitting ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : "sign in"}
              </Button>

              {/* Social Login */}
              <SocialAuth />

              {/* Sign Up Link */}
              <Typography variant="body2" sx={{ textAlign: "center", color: "#666" }}>
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  style={{
                    color: 'var(--primary-color)',
                    textDecoration: 'none'
                  }}
                  className="hover:underline"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {
        showSuccessAnimation && (
          <Dialog
            open={showSuccessAnimation}
            maxWidth="md"
            fullWidth
            PaperProps={{
              elevation: 8,
              sx: {
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'white',
                height: 'auto',
                minHeight: '400px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 500 }}
          >
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 2rem',
                position: 'relative',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(var(--primary-color-rgb), 0.1)',
                  borderRadius: '50%',
                  padding: '1.5rem',
                  animation: 'ripple 1.5s infinite ease-in-out',
                  '@keyframes ripple': {
                    '0%': { boxShadow: '0 0 0 0 rgba(var(--primary-color-rgb), 0.3)' },
                    '70%': { boxShadow: '0 0 0 15px rgba(var(--primary-color-rgb), 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(var(--primary-color-rgb), 0)' }
                  }
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 180,
                    color: 'var(--primary-color)',
                    animation: 'pulse 1.5s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(0.95)' },
                      '70%': { transform: 'scale(1)' },
                      '100%': { transform: 'scale(0.95)' }
                    }
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#333',
                  textAlign: 'center',
                  marginBottom: '0.75rem',
                  animation: 'fadeInDown 0.6s ease-out',
                  '@keyframes fadeInDown': {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                Login successful! , Welcome
              </Typography>
            
              <Box sx={{ width: '100%', mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressValue} 
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(var(--primary-color-rgb), 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      backgroundColor: 'var(--primary-color)',
                    }
                  }}
                />
              </Box>
            </DialogContent>
          </Dialog>
        )
      }

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}