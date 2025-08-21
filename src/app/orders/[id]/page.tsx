'use client'
import {
    ArrowBack as ArrowBackIcon,
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,
    Receipt as ReceiptIcon,
    ShoppingBag as ShoppingBagIcon,
    Home as HomeIcon,
    Print as PrintIcon,
    Download as DownloadIcon,
    Cancel as CancelIcon
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
    Card,
    CardContent,
    Chip,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '@/provider/ProtectedRoute'
import { orderService, type Order } from '@/services/orderService'

const OrderDetailsPage: React.FC = () => {
    const params = useParams()
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const isMobile = window.innerWidth < 600

    const orderId = params.id as string

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (!orderId) {
                    throw new Error('Order ID is required')
                }

                const response = await orderService.getOrderById(orderId)

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
    }, [orderId])

    const getOrderStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#ff9800'
            case 'processing': return '#2196f3'
            case 'shipped': return '#9c27b0'
            case 'delivered': return '#4caf50'
            case 'cancelled': return '#f44336'
            default: return '#757575'
        }
    }

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#ff9800'
            case 'processing': return '#2196f3'
            case 'completed': return '#4caf50'
            case 'failed': return '#f44336'
            case 'refunded': return '#9e9e9e'
            default: return '#757575'
        }
    }

    const getOrderSteps = () => {
        const steps = [
            { label: 'Order Placed', status: 'pending' },
            { label: 'Processing', status: 'processing' },
            { label: 'Shipped', status: 'shipped' },
            { label: 'Delivered', status: 'delivered' }
        ]

        const currentStatusIndex = steps.findIndex(step => step.status === order?.orderStatus)
        return { steps, currentStatusIndex }
    }

    const canCancelOrder = order &&
        order.orderStatus !== 'shipped' &&
        order.orderStatus !== 'delivered' &&
        order.orderStatus !== 'cancelled'

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
                    <Container maxWidth="md">
                        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error || 'Order not found'}
                            </Alert>
                            <Button
                                variant="contained"
                                onClick={() => router.push('/orders')}
                                sx={{ bgcolor: '#ff5722' }}
                                startIcon={<ArrowBackIcon />}
                            >
                                Back to Orders
                            </Button>
                        </Paper>
                    </Container>
                </Box>
            </ProtectedRoute>
        )
    }

    const { steps, currentStatusIndex } = getOrderSteps()
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            onClick={() => router.back()}
                            startIcon={<ArrowBackIcon />}
                            sx={{ color: '#ff5722' }}
                        >
                            Back
                        </Button>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff5722' }}>
                            Order Details
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, lg: 8 }}>

                            <Paper elevation={3} sx={{
                                p: { xs: 2, sm: 3, md: 4 },
                                borderRadius: 3,
                                mb: 3
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: { xs: 'flex-start', sm: 'space-between' },
                                    alignItems: { xs: 'flex-start', sm: 'flex-start' },
                                    mb: 3,
                                    gap: { xs: 2, sm: 0 }
                                }}>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="h5"
                                            fontWeight="600"
                                            gutterBottom
                                            sx={{
                                                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            Order #{order.orderNumber}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{
                                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                                lineHeight: 1.5
                                            }}
                                        >
                                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        gap: { xs: 0.5, sm: 1 },
                                        flexWrap: 'wrap',
                                        justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                        alignItems: 'center',
                                        width: { xs: '100%', sm: 'auto' },
                                        flexShrink: 0
                                    }}>
                                        <Chip
                                            label={order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                            sx={{
                                                bgcolor: getOrderStatusColor(order.orderStatus),
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                height: { xs: 28, sm: 32 },
                                                minWidth: { xs: 'auto', sm: 80 },
                                                '& .MuiChip-label': {
                                                    px: { xs: 1, sm: 1.5 }
                                                }
                                            }}
                                        />
                                        <Chip
                                            label={`Payment ${order.paymentStatus}`}
                                            sx={{
                                                bgcolor: getPaymentStatusColor(order.paymentStatus),
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                height: { xs: 28, sm: 32 },
                                                minWidth: { xs: 'auto', sm: 100 },
                                                '& .MuiChip-label': {
                                                    px: { xs: 1, sm: 1.5 }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {order.orderStatus !== 'cancelled' && (
                                    <Box sx={{ mt: { xs: 2, sm: 3 } }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="600"
                                            gutterBottom
                                            sx={{
                                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                                mb: { xs: 1.5, sm: 2 }
                                            }}
                                        >
                                            Order Progress
                                        </Typography>
                                        <Stepper
                                            activeStep={currentStatusIndex}
                                            alternativeLabel={!isMobile}
                                            orientation={isMobile ? 'vertical' : 'horizontal'}
                                            sx={{
                                                '& .MuiStepLabel-label': {
                                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                },
                                                '& .MuiStepConnector-line': {
                                                    borderTopWidth: { xs: 2, sm: 1 }
                                                }
                                            }}
                                        >
                                            {steps.map((step, index) => (
                                                <Step key={step.label} completed={index <= currentStatusIndex}>
                                                    <StepLabel>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                                                fontWeight: index <= currentStatusIndex ? 600 : 400
                                                            }}
                                                        >
                                                            {step.label}
                                                        </Typography>
                                                    </StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Box>
                                )}
                            </Paper>

                            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ShoppingBagIcon />
                                    Order Items ({totalItems} item{totalItems > 1 ? 's' : ''})
                                </Typography>

                                {order.items.map((item, index) => (
                                    <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Grid container spacing={3} alignItems="center">
                                                <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                                                    <Box
                                                        component="img"
                                                        src={item.product.images[0] || '/placeholder-image.jpg'}
                                                        alt={item.product.name}
                                                        sx={{
                                                            width: '100%',
                                                            height: 100,
                                                            objectFit: 'cover',
                                                            borderRadius: 1
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                                                    <Typography variant="h6" fontWeight="600" gutterBottom>
                                                        {item.product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                                        Quantity: {item.quantity}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Unit Price: ${item.price.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                                                    <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                                        <Typography variant="h6" fontWeight="600" color="#ff5722">
                                                            ${item.totalPrice.toFixed(2)}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Paper>

                            {order.shippingAddress && (
                                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                                    <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <ShippingIcon />
                                        Shipping Address
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body1" gutterBottom>
                                            {order.shippingAddress.street}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                        </Typography>
                                        <Typography variant="body1">
                                            {order.shippingAddress.country}
                                        </Typography>
                                    </Box>
                                </Paper>
                            )}
                        </Grid>

                        <Grid size={{ xs: 12, lg: 4 }}>
                            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3, position: 'sticky', top: 20 }}>
                                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ReceiptIcon />
                                    Order Summary
                                </Typography>

                                <Box sx={{ mt: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body1">Subtotal:</Typography>
                                        <Typography variant="body1">${order.subtotal.toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body1">Shipping:</Typography>
                                        <Typography variant="body1">
                                            {order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body1">Tax:</Typography>
                                        <Typography variant="body1">${order.tax.toFixed(2)}</Typography>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography variant="h6" fontWeight="600">Total:</Typography>
                                        <Typography variant="h6" fontWeight="600" color="#ff5722">
                                            ${order.totalAmount.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                                    <Typography variant="body2" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PaymentIcon sx={{ fontSize: 16 }} />
                                        Payment Information
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                    </Typography>
                                </Box>

                                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {canCancelOrder && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => {
                                                alert('Order cancellation feature coming soon!')
                                            }}
                                            startIcon={<CancelIcon />}
                                            fullWidth
                                        >
                                            Cancel Order
                                        </Button>
                                    )}

                                    <Button
                                        variant="outlined"
                                        startIcon={<PrintIcon />}
                                        onClick={() => window.print()}
                                        fullWidth
                                    >
                                        Print Order
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        startIcon={<DownloadIcon />}
                                        onClick={() => {
                                            alert('PDF download feature coming soon!')
                                        }}
                                        fullWidth
                                    >
                                        Download Invoice
                                    </Button>

                                    <Button
                                        variant="contained"
                                        startIcon={<HomeIcon />}
                                        onClick={() => router.push('/')}
                                        sx={{ bgcolor: '#ff5722' }}
                                        fullWidth
                                    >
                                        Continue Shopping
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ProtectedRoute>
    )
}

export default OrderDetailsPage