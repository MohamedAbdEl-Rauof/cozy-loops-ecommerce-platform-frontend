"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Container,
  Paper
} from "@mui/material"
import { CheckCircle, ErrorOutline } from "@mui/icons-material"
import { verifyEmail } from "@/services/authService"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [countdown, setCountdown] = useState(5)
  const params = useParams()
  const router = useRouter()
  const token = params.token as string

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const response = await verifyEmail(token)
        setStatus("success")
        setMessage(response.message || "Your email has been successfully verified!")
        
        // Start countdown for redirect
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              router.push('/auth/login')
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        return () => clearInterval(timer)
      } catch (error: any) {
        setStatus("error")
        setMessage(error.response?.data?.message || "Verification failed. The link may be expired or invalid.")
      }
    }

    verifyUserEmail()
  }, [token, router])

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        {status === "loading" && (
          <>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Verifying your email...
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Please wait while we verify your email address.
            </Typography>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Email Verified!
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" paragraph>
              {message}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Redirecting to login in {countdown} seconds...
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => router.push('/auth/login')}
              sx={{ mt: 3 }}
            >
              Login Now
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <ErrorOutline sx={{ fontSize: 80, color: 'error.main', mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Verification Failed
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" paragraph>
              {message}
            </Typography>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => router.push('/auth/login')}
              >
                Go to Login
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => router.push('/auth/register')}
              >
                Register Again
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  )
}