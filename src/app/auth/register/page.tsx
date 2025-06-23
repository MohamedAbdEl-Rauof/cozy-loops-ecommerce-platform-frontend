"use client"
import { useState } from "react"
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
  Grid,
  Link,
  Container,
  FormHelperText,
} from "@mui/material"
import { Visibility, VisibilityOff, Check, Google, Apple, Instagram, Pinterest } from "@mui/icons-material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Image from "next/image"

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7043",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            height: "48px",
            borderRadius: "8px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "uppercase",
          fontWeight: 600,
          letterSpacing: "0.5px",
        },
      },
    },
  },
})

// Zod validation schema
const registrationSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(10, { message: "First name must be less than 10 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange", // Enable live validation
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

  const onSubmit = (data: FormData) => {
    console.log("Form submitted successfully:", data)
    // Handle successful submission
  }

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: met ? "#4caf50" : "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {met && <Check sx={{ fontSize: 12, color: "white" }} />}
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: met ? "#4caf50" : "#757575",
          fontSize: "0.875rem",
        }}
      >
        {text}
      </Typography>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
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
            src="/registration-bg.png"
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
                      sx={{ mb: 3 }}
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
                      sx={{ mb: 3 }}
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
                      sx={{ mb: 3 }}
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
                      sx={{ mb: hasStartedTypingPassword ? 1 : 3 }}
                    />
                  )}
                />

                {/* Password Requirements - Only show when user starts typing */}
                {hasStartedTypingPassword && (
                  <Box sx={{ mb: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: "#666", fontWeight: 500 }}>
                      Your password must include:
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <PasswordRequirement met={passwordChecks.lowercase} text="Lower case letters" />
                        <PasswordRequirement met={passwordChecks.uppercase} text="Capital letters" />
                      </Grid>
                      <Grid item xs={6}>
                        <PasswordRequirement met={passwordChecks.numbers} text="Numbers and symbols" />
                        <PasswordRequirement met={passwordChecks.length} text="At least 8 characters" />
                      </Grid>
                    </Grid>
                  </Box>
                )}

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
                      sx={{ mb: 3 }}
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
                            I agree to the{" "}
                            <Link href="/terms" color="primary" underline="hover">
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

                {/* Submit Button - Disabled until form is valid */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={!isValid || !isDirty}
                  sx={{
                    height: 48,
                    mb: 3,
                    backgroundColor: "#FE8253",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ff5722",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      color: "#666",
                    },
                  }}
                >
                  CREATE AN ACCOUNT
                </Button>

                {/* Social Login */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#f5f5f5",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <Google sx={{ color: "#4285F4" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#f5f5f5",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <Apple sx={{ color: "#000" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#f5f5f5",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <Instagram sx={{ color: "#E4405F" }} />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#f5f5f5",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                  >
                    <Pinterest sx={{ color: "#BD081C" }} />
                  </IconButton>
                </Box>

                {/* Sign In Link */}
                <Typography variant="body2" sx={{ textAlign: "center", color: "#666" }}>
                  Already have an account?{" "}
                  <Link href="/signin" color="primary" underline="hover">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
