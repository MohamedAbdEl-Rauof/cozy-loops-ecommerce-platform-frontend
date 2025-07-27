'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
} from '@mui/lab'
import {
    ArrowBack as ArrowBackIcon,
    LocalShipping as ShippingIcon,
    Payment as PaymentIcon,
    Receipt as ReceiptIcon,
    ShoppingBag as ShoppingBagIcon,
    Home as HomeIcon,
    Print as PrintIcon,
    Download as DownloadIcon,
    Cancel as CancelIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon,
    LocalShippingOutlined as TrackingIcon,
} from '@mui/icons-material'
import { orderService, type Order } from '@/services/orderService'
import ProtectedRoute from '@/provider/ProtectedRoute'

const OrderDetailsPage: React.FC = () => {
    const params = useParams()
    const router = useRouter()
    const [order, setOrder] = useState<Order | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
                            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                                    <Box>
                                        <Typography variant="h5" fontWeight="600" gutterBottom>
                                            Order #{order.orderNumber}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip
                                            label={order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                            sx={{
                                                bgcolor: getOrderStatusColor(order.orderStatus),
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                        <Chip
                                            label={`Payment ${order.paymentStatus}`}
                                            sx={{
                                                bgcolor: getPaymentStatusColor(order.paymentStatus),
                                                color: 'white',
                                                fontWeight: 600
                                            }}
                                        />
                                    </Box>
                                </Box>

                                {order.orderStatus !== 'cancelled' && (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="h6" fontWeight="600" gutterBottom>
                                            Order Progress
                                        </Typography>
                                        <Stepper activeStep={currentStatusIndex} alternativeLabel>
                                            {steps.map((step, index) => (
                                                <Step key={step.label} completed={index <= currentStatusIndex}>
                                                    <StepLabel>
                                                        <Typography variant="body2">
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
                            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ScheduleIcon />
                                    Order Timeline
                                </Typography>
                                <Timeline>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot sx={{ bgcolor: '#4caf50' }}>
                                                <CheckCircleIcon sx={{ fontSize: 16 }} />
                                            </TimelineDot>
                                            {order.orderStatus !== 'pending' && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography variant="body1" fontWeight="600">
                                                Order Placed
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Typography>
                                        </TimelineContent>
                                    </TimelineItem>

                                    {order.orderStatus !== 'pending' && order.orderStatus !== 'cancelled' && (
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot sx={{ bgcolor: currentStatusIndex >= 1 ? '#4caf50' : '#e0e0e0' }}>
                                                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                                                </TimelineDot>
                                                {order.orderStatus !== 'processing' && <TimelineConnector />}
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="body1" fontWeight="600">
                                                    Order Processing
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Your order is being prepared
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )}

                                    {(order.orderStatus === 'shipped' || order.orderStatus === 'delivered') && (
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot sx={{ bgcolor: currentStatusIndex >= 2 ? '#4caf50' : '#e0e0e0' }}>
                                                    <TrackingIcon sx={{ fontSize: 16 }} />
                                                </TimelineDot>
                                                {order.orderStatus !== 'shipped' && <TimelineConnector />}
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="body1" fontWeight="600">
                                                    Order Shipped
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Your order is on its way
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )}

                                    {order.orderStatus === 'delivered' && (
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot sx={{ bgcolor: '#4caf50' }}>
                                                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                                                </TimelineDot>
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="body1" fontWeight="600">
                                                    Order Delivered
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Your order has been delivered
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )}

                                    {order.orderStatus === 'cancelled' && (
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot sx={{ bgcolor: '#f44336' }}>
                                                    <CancelIcon sx={{ fontSize: 16 }} />
                                                </TimelineDot>
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant="body1" fontWeight="600">
                                                    Order Cancelled
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    This order has been cancelled
                                                </Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    )}
                                </Timeline>
                            </Paper>
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