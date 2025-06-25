"use client"
import { useState } from "react"
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
} from "@mui/material"
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import SocialAuth from "@/components/shared/SocialAuth"
import ForgotPasswordDialog from "@/components/auth/ForgetPasswordDialog"

// Zod validation schema
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

  const onSubmit = (data: FormData) => {
    // This is just for UI demonstration - no actual functionality
    setIsSubmitting(true)
    console.log("Form submitted with:", data)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
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
    </Box>
  )
}