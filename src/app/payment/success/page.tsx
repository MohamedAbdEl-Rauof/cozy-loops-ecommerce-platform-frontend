'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    CircularProgress, 
    Alert,
    Button,
    Divider
} from '@mui/material'
import { 
    CheckCircle as CheckCircleIcon,
    Receipt as ReceiptIcon,
    Home as HomeIcon,
    ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material'
import { paymentService } from '@/services/paymentService'

interface PaymentDetails {
    orderNumber: string;
    paymentIntentId: string;
    amount: number;
    status: string;
    createdAt: string;
    breakdown: {
        subtotal?: number;
        shipping?: number;
        tax?: number;
        total: number;
    };
    orderDetails?: {
        orderId: string;
        orderStatus: string;
        paymentStatus: string;
        items: Array<{
            product: any;
            quantity: number;
            price: number;
            _id: string;
        }>;
        shippingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    };
}

const PaymentSuccessPage: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const orderNumber = searchParams.get('order')
    const paymentIntentId = searchParams.get('payment_intent')
    const redirectStatus = searchParams.get('redirect_status')

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!orderNumber || !paymentIntentId || redirectStatus !== 'succeeded') {
                    throw new Error('Invalid payment parameters')
                }

                // Verify payment with your backend
                const response = await paymentService.verifyPayment({
                    orderNumber,
                    paymentIntentId
                })

                setPaymentDetails(response)
            } catch (error) {
                console.error('Payment verification error:', error)
                setError(error instanceof Error ? error.message : 'Failed to verify payment')
            } finally {
                setIsLoading(false)
            }
        }

        verifyPayment()
    }, [orderNumber, paymentIntentId, redirectStatus])

    if (isLoading) {
        return (
            <Box sx={{ 
                bgcolor: '#f5f5f5', 
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ color: '#ff5722', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Verifying your payment...
                    </Typography>
                </Box>
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button 
                            variant="contained" 
                            onClick={() => router.push('/cart')}
                            sx={{ bgcolor: '#ff5722' }}
                        >
                            Return to Cart
                        </Button>
                    </Box>
                </Container>
            </Box>
        )
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                {/* Success Header */}
                <Paper elevation={3} sx={{ p: 4, mb: 3, textAlign: 'center', borderRadius: 3 }}>
                    <CheckCircleIcon 
                        sx={{ 
                            fontSize: 80, 
                            color: '#4caf50', 
                            mb: 2 
                        }} 
                    />
                    <Typography variant="h3" fontWeight="bold" color="#4caf50" gutterBottom>
                        Payment Successful!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                        Thank you for your purchase. Your order has been confirmed.
                    </Typography>
                    
                    {paymentDetails && (
                        <Box sx={{ 
                            bgcolor: '#e8f5e8', 
                            p: 2, 
                            borderRadius: 2,
                            display: 'inline-block'
                        }}>
                            <Typography variant="body1" fontWeight="600">
                                Order Number: {paymentDetails.orderNumber}
                            </Typography>
                        </Box>
                    )}
                </Paper>

                {/* Payment Details */}
                {paymentDetails && (
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <ReceiptIcon sx={{ color: '#ff5722', mr: 1 }} />
                            <Typography variant="h5" fontWeight="600">
                                Payment Details
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">Payment ID:</Typography>
                                <Typography variant="body1" fontWeight="500">
                                    {paymentDetails.paymentIntentId}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">Status:</Typography>
                                <Typography variant="body1" fontWeight="500" color="#4caf50">
                                    {paymentDetails.status}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1">Date:</Typography>
                                <Typography variant="body1" fontWeight="500">
                                    {new Date(paymentDetails.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Order Breakdown */}
                        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                            Order Summary
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            {paymentDetails.breakdown.subtotal !== undefined && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Subtotal:</Typography>
                                    <Typography variant="body2">
                                        ${paymentDetails.breakdown.subtotal.toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                            {paymentDetails.breakdown.shipping !== undefined && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Shipping:</Typography>
                                    <Typography variant="body2">
                                        ${paymentDetails.breakdown.shipping.toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                            {paymentDetails.breakdown.tax !== undefined && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Tax:</Typography>
                                    <Typography variant="body2">
                                        ${paymentDetails.breakdown.tax.toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" fontWeight="600">Total Paid:</Typography>
                            <Typography variant="h6" fontWeight="600" color="primary">
                                ${paymentDetails.breakdown.total.toFixed(2)}
                            </Typography>
                        </Box>
                    </Paper>
                )}

                {/* Action Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon />}
                        onClick={() => router.push('/')}
                        sx={{ 
                            bgcolor: '#ff5722',
                            '&:hover': { bgcolor: '#e64a19' },
                            minWidth: 150
                        }}
                    >
                        Continue Shopping
                    </Button>
                    
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<ShoppingBagIcon />}
                        onClick={() => router.push('/orders')}
                        sx={{ 
                            borderColor: '#ff5722',
                            color: '#ff5722',
                            '&:hover': { 
                                borderColor: '#e64a19',
                                bgcolor: 'rgba(255, 87, 34, 0.04)'
                            },
                            minWidth: 150
                        }}
                    >
                        View Orders
                    </Button>
                </Box>

                {/* Additional Info */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        A confirmation email has been sent to your registered email address.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        If you have any questions, please contact our support team.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default PaymentSuccessPage