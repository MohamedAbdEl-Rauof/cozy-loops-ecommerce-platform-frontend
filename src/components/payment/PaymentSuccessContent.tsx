'use client'
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '@/provider/ProtectedRoute'
import { paymentService } from '@/services/paymentService'

const PaymentSuccessContent: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const queryClient = useQueryClient()

    const paymentIntentId = searchParams.get('payment_intent')
    const redirectStatus = searchParams.get('redirect_status')

    useEffect(() => {
        const verifyAndRedirect = async () => {
            try {
                if (!paymentIntentId || redirectStatus !== 'succeeded') {
                    setError('Invalid payment parameters')
                    setTimeout(() => router.push('/payment/error'), 2000)
                    return
                }

                const response = await paymentService.verifyPayment({
                    paymentIntentId
                })

                if (response.success) {
                    await queryClient.invalidateQueries({ queryKey: ['cart'] })

                    window.history.replaceState({}, '', '/payment/success')

                    if (response.redirectUrl) {
                        router.push(response.redirectUrl)
                    } else {
                        router.push('/orders')
                    }
                } else {
                    if (response.redirectUrl) {
                        router.push(response.redirectUrl)
                    } else {
                        setError(response.message || 'Payment verification failed')
                        setTimeout(() => router.push('/payment/error'), 2000)
                    }
                }

            } catch (error) {
                console.error('Payment verification error:', error)
                setError('Payment verification failed')
                setTimeout(() => router.push('/payment/error'), 2000)
            } finally {
                setIsProcessing(false)
            }
        }

        verifyAndRedirect()
    }, [paymentIntentId, redirectStatus, router])

    return (
        <ProtectedRoute>
            <Box sx={{
                bgcolor: '#f5f5f5',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Container maxWidth="sm">
                    <Box sx={{
                        textAlign: 'center',
                        bgcolor: 'white',
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 3
                    }}>
                        {isProcessing ? (
                            <>
                                <CircularProgress size={60} sx={{ color: '#ff5722', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Verifying Payment...
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Please wait while we confirm your payment
                                </Typography>
                            </>
                        ) : error ? (
                            <>
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                                <Typography variant="body2" color="text.secondary">
                                    Redirecting to error page...
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="h6" color="success.main" gutterBottom>
                                    Payment Verified Successfully!
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Redirecting to order confirmation...
                                </Typography>
                            </>
                        )}
                    </Box>
                </Container>
            </Box>
        </ProtectedRoute>
    )
}

export default PaymentSuccessContent