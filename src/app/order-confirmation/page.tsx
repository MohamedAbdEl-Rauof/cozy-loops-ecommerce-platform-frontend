'use client'

import {
    CheckCircle as CheckCircleIcon,
    Email as EmailIcon,
    Receipt as ReceiptIcon,
    Visibility as ViewIcon
} from '@mui/icons-material'
import {
    Container,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Alert,
    Button,
    Divider,
    Grid,
} from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '@/provider/ProtectedRoute'
import { orderService } from '@/services/orderService'
import { OrderDetails } from '@/types/order'

export const dynamic = 'force-dynamic'

const OrderConfirmationPage: React.FC = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [order, setOrder] = useState<OrderDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const orderNumber = searchParams.get('orderId')

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (!orderNumber) {
                    throw new Error('Order ID is required')
                }

                const response = await orderService.getOrderByNumber(orderNumber)

                if (response.success) {
                    setOrder(response.order)
                } else {
                    throw new Error('Order not found')
                }
            } catch (error) {
                console.error('Fetch order error:', error)
                setError('Unable to load order details')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrderDetails()
    }, [orderNumber])

    if (isLoading) {
        return (
            <ProtectedRoute>
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
                            Loading order details...
                        </Typography>
                    </Box>
                </Box>
            </ProtectedRoute>
        )
    }

    if (error || !order) {
        return (
            <ProtectedRoute>
                <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
                    <Container maxWidth="sm">
                        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error || 'Order not found'}
                            </Alert>
                            <Button
                                variant="contained"
                                onClick={() => router.push('/orders')}
                                sx={{ bgcolor: '#ff5722' }}
                            >
                                View My Orders
                            </Button>
                        </Paper>
                    </Container>
                </Box>
            </ProtectedRoute>
        )
    }

    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3, mb: 3 }}>
                        <CheckCircleIcon
                            sx={{ fontSize: 80, color: '#4caf50', mb: 2 }}
                        />
                        <Typography variant="h4" fontWeight="bold" color="#4caf50" gutterBottom>
                            Order Confirmed!
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                            Thank you for your purchase
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Your order has been successfully placed and will be processed shortly.
                        </Typography>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ReceiptIcon />
                            Order Summary
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Order Number
                                    </Typography>
                                    <Typography variant="h6" fontWeight="600">
                                        {order.orderNumber}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Order Date
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Items Ordered
                                    </Typography>
                                    <Typography variant="body1">
                                        {totalItems} item{totalItems > 1 ? 's' : ''}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{
                                    bgcolor: '#f8f9fa',
                                    p: 3,
                                    borderRadius: 2
                                }}>
                                    <Typography variant="h6" fontWeight="600" gutterBottom>
                                        Order Total
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Subtotal:</Typography>
                                        <Typography variant="body2">${order.subtotal.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Shipping:</Typography>
                                        <Typography variant="body2">${order.shippingCost.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body2">Tax:</Typography>
                                        <Typography variant="body2">${order.tax.toFixed(2)}</Typography>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" fontWeight="600">Total:</Typography>
                                        <Typography variant="h6" fontWeight="600" color="#ff5722">
                                            ${order.totalAmount.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon />
                            What&apos;s Next?
                        </Typography>
                        <Box sx={{ pl: 2 }}>
                            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                • You will receive an email confirmation shortly
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                • We&apos;ll send you tracking information once your order ships
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                • Estimated delivery: 3-5 business days
                            </Typography>
                            <Typography variant="body1">
                                • You can track your order status in your account
                            </Typography>
                        </Box>
                    </Paper>

                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                        }}
                    >
                        <Grid container spacing={3} justifyContent="center">
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => router.push(`/orders/${order._id}`)}
                                    sx={{
                                        bgcolor: '#ff5722',
                                        color: 'white',
                                        py: 2.5,
                                        px: 3,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        minHeight: 56,
                                        boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            bgcolor: '#e64a19',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 20px rgba(255, 87, 34, 0.4)'
                                        },
                                        '&:active': {
                                            transform: 'translateY(0px)'
                                        }
                                    }}
                                    startIcon={<ViewIcon sx={{ fontSize: 20 }} />}
                                >
                                    View Order Details
                                </Button>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => router.push('/orders')}
                                    sx={{
                                        borderColor: '#9e9e9e',
                                        color: '#616161',
                                        py: 2.5,
                                        px: 3,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        minHeight: 56,
                                        borderWidth: 2,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            borderColor: '#757575',
                                            bgcolor: 'rgba(158, 158, 158, 0.08)',
                                            color: '#424242',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(158, 158, 158, 0.2)'
                                        },
                                        '&:active': {
                                            transform: 'translateY(0px)'
                                        }
                                    }}
                                    startIcon={<ReceiptIcon sx={{ fontSize: 20 }} />}
                                >
                                    View All Orders
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </ProtectedRoute>
    )
}

export default OrderConfirmationPage
