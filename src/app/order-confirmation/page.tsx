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
    Divider,
    Grid,
    Card,
    CardContent
} from '@mui/material'
import {
    CheckCircle as CheckCircleIcon,
    Home as HomeIcon,
    ShoppingBag as ShoppingBagIcon,
    Email as EmailIcon,
    Receipt as ReceiptIcon
} from '@mui/icons-material'
// Try both import methods to see which works
import { orderService, type Order } from '@/services/orderService'
// Alternative: import orderService from '@/services/orderService'
import ProtectedRoute from '@/provider/ProtectedRoute'

interface OrderDetails {
    _id: string;
    orderNumber: string;
    totalAmount: number;
    subtotal: number;
    shippingCost: number;
    tax: number;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
    items: Array<{
        product: {
            _id: string;
            name: string;
            images: string[];
        };
        quantity: number;
        price: number;
        totalPrice: number;
    }>;
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

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

                console.log('Fetching order with number:', orderNumber)
                console.log('orderService:', orderService) // Debug log

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

    // ... rest of your component code remains the same
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

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    {/* Success Header */}
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

                    {/* Order Summary */}
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
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Payment Status
                                    </Typography>
                                    <Typography variant="body1" sx={{
                                        color: order.paymentStatus === 'completed' ? '#4caf50' : '#ff9800',
                                        fontWeight: 600
                                    }}>
                                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
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

                    {/* Order Items */}
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShoppingBagIcon />
                            Order Items ({order.items.length})
                        </Typography>

                        {order.items.map((item, index) => (
                            <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Grid container spacing={3} alignItems="center">
                                        <Grid size={{ xs: 12, sm: 2 }}>
                                            <Box
                                                component="img"
                                                src={item.product.images[0] || '/placeholder-image.jpg'}
                                                alt={item.product.name}
                                                sx={{
                                                    width: '100%',
                                                    height: 80,
                                                    objectFit: 'cover',
                                                    borderRadius: 1
                                                }}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                                {item.product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: ${item.price.toFixed(2)}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Quantity
                                            </Typography>
                                            <Typography variant="h6" fontWeight="600">
                                                {item.quantity}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6, sm: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Total
                                            </Typography>
                                            <Typography variant="h6" fontWeight="600" color="#ff5722">
                                                ${item.totalPrice.toFixed(2)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Paper>

                    {/* Shipping Address */}
                    {order.shippingAddress && (
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                            <Typography variant="h6" fontWeight="600" gutterBottom>
                                Shipping Address
                            </Typography>
                            <Typography variant="body1">
                                {order.shippingAddress.street}
                            </Typography>
                            <Typography variant="body1">
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </Typography>
                            <Typography variant="body1">
                                {order.shippingAddress.country}
                            </Typography>
                        </Paper>
                    )}

                    {/* Next Steps */}
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon />
                            What's Next?
                        </Typography>
                        <Box sx={{ pl: 4 }}>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                • You will receive an email confirmation shortly
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                • We'll send you tracking information once your order ships
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                • Estimated delivery: 3-5 business days
                            </Typography>
                            <Typography variant="body1">
                                • You can track your order status in your account
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Action Buttons */}
                    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => router.push('/orders')}
                                    sx={{
                                        bgcolor: '#ff5722',
                                        '&:hover': { bgcolor: '#e64a19' },
                                        py: 1.5
                                    }}
                                    startIcon={<ReceiptIcon />}
                                >
                                    View All Orders
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6, md: 4 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => router.push('/products')}
                                    sx={{
                                        borderColor: '#ff5722',
                                        color: '#ff5722',
                                        '&:hover': {
                                            borderColor: '#e64a19',
                                            bgcolor: 'rgba(255, 87, 34, 0.04)'
                                        },
                                        py: 1.5
                                    }}
                                    startIcon={<ShoppingBagIcon />}
                                >
                                    Continue Shopping
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => router.push('/')}
                                    sx={{
                                        borderColor: '#757575',
                                        color: '#757575',
                                        '&:hover': {
                                            borderColor: '#424242',
                                            bgcolor: 'rgba(117, 117, 117, 0.04)'
                                        },
                                        py: 1.5
                                    }}
                                    startIcon={<HomeIcon />}
                                >
                                    Back to Home
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