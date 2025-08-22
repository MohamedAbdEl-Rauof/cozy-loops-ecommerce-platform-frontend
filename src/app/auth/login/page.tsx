"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Fade,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link as MuiLink,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ForgotPasswordDialog from "@/components/dialogs/ForgetPasswordDialog";
import SocialAuthDialog from "@/components/dialogs/SocialAuthDialog";
import { useAuth } from "@/context/AuthContext";

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
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false)
  const [loginInProgress, setLoginInProgress] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const hasCheckedAuth = useRef(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  })

  const router = useRouter()
  const { login, loading, isUserAuthenticated } = useAuth()

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
    if (!hasCheckedAuth.current && !loading && !hasAttemptedLogin && !loginInProgress) {
      hasCheckedAuth.current = true

      if (isUserAuthenticated()) {
        setTimeout(() => {
          router.push('/')
        }, 100)
      }
    }
  }, [loading, hasAttemptedLogin, loginInProgress, isUserAuthenticated, router])

  useEffect(() => {
    if (showSuccessAnimation) {
      const totalTime = 4000
      const interval = 50
      const steps = totalTime / interval
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep += 1
        setProgressValue((currentStep / steps) * 100)

        if (currentStep >= steps) {
          clearInterval(timer)
          router.push('/')
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [showSuccessAnimation, router])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const verified = searchParams.get('verified')

    if (verified === 'true') {
      setSnackbar({
        open: true,
        message: 'Email verified successfully! You can now log in.',
        severity: 'success'
      })
      const newUrl = window.location.pathname
      window.history.replaceState({}, document.title, newUrl)
    }
  }, [])

  const onSubmit = async (data: FormData): Promise<void> => {
    setIsSubmitting(true)
    setHasAttemptedLogin(true)
    setLoginInProgress(true)

    try {
      await login(data.email, data.password)
      setShowSuccessAnimation(true)
    } catch (error: unknown) {
      console.error("Login error:", error)

      const err = error as {
        response?: {
          status: number
          data: {
            emailVerified?: boolean
            message?: string
          }
        }
        message?: string
      }

      if (err.response && err.response.status === 403 &&
        err.response.data && err.response.data.emailVerified === false) {
        setSnackbar({
          open: true,
          message: 'Email not verified. Please check your inbox for verification email.',
          severity: 'warning'
        })
      } else {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || err.message || 'Login failed. Please try again.',
          severity: 'error'
        })
      }
    } finally {
      setIsSubmitting(false)
      setLoginInProgress(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", lg: "50%" },
          height: { xs: "200px", sm: "250px", md: "300px", lg: "100vh" },
          position: "relative",
        }}
      >
        <Image
          src="/images/auth/login.jpg"
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
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: "white",
          minHeight: { xs: "calc(100vh - 200px)", sm: "calc(100vh - 250px)", md: "calc(100vh - 300px)", lg: "100vh" },
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
                e.preventDefault()
                handleSubmit(onSubmit)(e)
              }}
              sx={{ mt: 3 }}
              noValidate
            >
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
                      field.onChange(e)
                      if (!hasStartedTypingPassword && e.target.value) {
                        setHasStartedTypingPassword(true)
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

              <Box sx={{ textAlign: "left", mb: 3 }}>
                <MuiLink
                  sx={{ color: 'var(--primary-color)', cursor: 'pointer' }}
                  underline="hover"
                  onClick={() => setForgetPasswordOpen(true)}
                >
                  Forgot password?
                </MuiLink>
                <ForgotPasswordDialog
                  open={forgetPasswordOpen}
                  onClose={() => setForgetPasswordOpen(false)}
                />
              </Box>

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

              <SocialAuthDialog />

              <Typography variant="body2" sx={{ textAlign: "center", color: "#666" }}>
                Don&apos;t have an account?{" "}
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

      <Dialog
        open={showSuccessAnimation}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
            minWidth: 600,
            minHeight: 350
          }
        }}
        TransitionProps={{
          timeout: 800
        }}
      >
        <DialogContent>
          <Fade in={showSuccessAnimation} timeout={1000}>
            <Box>
              <CheckCircleIcon
                sx={{
                  fontSize: 80,
                  color: 'var(--primary-color)',
                  mb: 2,
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                    },
                    '50%': {
                      transform: 'scale(1.1)',
                    },
                    '100%': {
                      transform: 'scale(1)',
                    },
                  },
                  animation: 'pulse 2s infinite',
                }}
              />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Login Successful!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                Redirecting You To The Home Page...
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  height: 10,
                  borderRadius: 4,
                  backgroundColor: '#f0f0f0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--primary-color)',
                    transition: 'transform 0.1s ease-in-out',
                  }
                }}
              />
            </Box>
          </Fade>
        </DialogContent>
      </Dialog>

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