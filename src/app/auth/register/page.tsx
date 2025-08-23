"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Visibility,
  VisibilityOff,
  Check,
  CheckCircle,
} from "@mui/icons-material"
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
import { Dialog, DialogContent, Fade, Grow } from "@mui/material";
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

import SocialAuthDialog from "@/components/dialogs/SocialAuthDialog"
import { useAuth } from "@/context/AuthContext"

const registrationSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    firstName: z
      .string()
      .min(2, { message: "First name is required" })
      .max(20, { message: "First name must be less than 20 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name is required" })
      .max(20, { message: "Last name must be less than 20 characters" }),
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
  const { register, isUserAuthenticated, loading } = useAuth();
  const [registeredEmail, setRegisteredEmail] = useState<string>("");
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (!hasCheckedAuth.current && !loading) {
      hasCheckedAuth.current = true

      if (isUserAuthenticated()) {
        setIsRedirecting(true)
        setTimeout(() => {
          router.push('/')
        }, 100)
      }
    }
  }, [loading, isUserAuthenticated, router])

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

  const password = watch("password")
  const hasStartedTypingPassword = password && password.length > 0

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

    useEffect(() => {
      if (showSuccess) {
        setCountdown(5);
      }
    }, []);

    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        py: { xs: 1, sm: 2 },
        px: { xs: 0.5, sm: 0 },
        justifyContent: 'center'
      }}>
        <Box sx={{ position: 'relative', mb: { xs: 2, sm: 3, md: 4 } }}>
          <Fade in={true} timeout={1000}>
            <CheckCircle sx={{
              fontSize: { xs: 80, sm: 120, md: 180, lg: 230 },
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

        <Typography variant="h4" sx={{ 
          fontWeight: 600, 
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.125rem' }
        }}>
          Registration Successful!
        </Typography>

        <Typography variant="body1" sx={{ 
          mb: { xs: 1, sm: 2 }, 
          color: '#666', 
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' }, 
          maxWidth: { xs: '100%', sm: 500, md: 600 },
          lineHeight: { xs: 1.4, sm: 1.5 }
        }}>
          Please check your email to confirm your account. We&apos;ve sent a verification link to your email address.
        </Typography>

        <Typography variant="body2" sx={{ 
          mb: { xs: 2, sm: 4 }, 
          color: '#666',
          fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }}>
          This dialog will close in <strong>{countdown}</strong> seconds.
        </Typography>
      </Box>
    );
  };

  if (loading || isRedirecting) {
    return (
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5"
      }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      overflow: "hidden"
    }}>u
      <Dialog
        open={showSuccess}
        TransitionComponent={Grow}
        transitionDuration={700}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 1, sm: 2 },
            maxWidth: { xs: '90vw', sm: '600px', md: '800px' },
            width: '100%',
            minHeight: { xs: '300px', sm: '400px' },
            maxHeight: { xs: '80vh', sm: '90vh' },
            p: { xs: 1.5, sm: 2, md: 3 },
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <DialogContent sx={{ 
          p: { xs: 1, sm: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
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


      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", lg: "50%" },
          height: {
            xs: "250px",
            sm: "280px",
            md: "320px",
            lg: "100vh"
          },
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/auth/register.jpg"
          quality={100}
          priority
          alt="Hands holding a heart with craft materials"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          p: 3,
          backgroundColor: "white",
          minHeight: {
            xs: "calc(100vh - 250px)",
            sm: "calc(100vh - 280px)",
            md: "calc(100vh - 320px)",
            lg: "100vh"
          },
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <Container maxWidth="sm" sx={{ width: "100%", py: { xs: 2, lg: 4 } }}>
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
                          <Link href="#" sx={{ color: "var(--primary-color)" }} underline="hover">
                            Terms of Services
                          </Link>
                        </Typography>
                      }
                    />
                  )}
                />
                {errors.agreeToTerms && (
                  <FormHelperText error sx={{ ml: 0 }}>
                    {errors.agreeToTerms?.message}
                  </FormHelperText>
                )}
              </Box>

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

              <SocialAuthDialog />

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
