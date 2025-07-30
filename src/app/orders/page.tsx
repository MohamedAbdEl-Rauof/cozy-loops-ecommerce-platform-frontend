'use client'
import {
    ShoppingBag as ShoppingBagIcon,
    Search as SearchIcon,
    Receipt as ReceiptIcon,
    LocalShipping as ShippingIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
    Container,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Alert,
    Button,
    Grid,
    Card,
    CardContent,
    Chip,
    Pagination,
    TextField,
    InputAdornment,
    Divider,
    Avatar
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import ProtectedRoute from '@/provider/ProtectedRoute'
import { orderService, type Order } from '@/services/orderService'

const OrdersPage: React.FC = () => {
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalOrders, setTotalOrders] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

    const ordersPerPage = 10

    const fetchOrders = async () => {
        try {
            setIsLoading(true)
            const response = await orderService.getUserOrders(currentPage, ordersPerPage)

            if (response.success) {
                setOrders(response.orders)
                setTotalPages(response.totalPages)
                setTotalOrders(response.totalOrders)
            } else {
                throw new Error('Failed to fetch orders')
            }
        } catch (error) {
            console.error('Fetch orders error:', error)
            setError('Unable to load orders')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [currentPage])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredOrders(orders)
        } else {
            const filtered = orders.filter(order =>
                order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.items.some(item =>
                    item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            setFilteredOrders(filtered)
        }
    }, [orders, searchTerm])

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

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    const handleViewOrder = (orderId: string) => {
        router.push(`/orders/${orderId}`)
    }

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
                            Loading your orders...
                        </Typography>
                    </Box>
                </Box>
            </ProtectedRoute>
        )
    }

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#ff5722' }}>
                            <ShoppingBagIcon sx={{ fontSize: 40, color: '#ff5722' }} />
                            My Orders
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Track and manage your orders
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Search orders by order number or product name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="600" color="#ff5722">
                                            {totalOrders}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Orders
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight="600" color="#4caf50">
                                            {orders.filter(order => order.orderStatus === 'delivered').length}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Delivered
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {filteredOrders.length === 0 ? (
                        <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                            <ShoppingBagIcon sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                                No orders found
                            </Typography>
                        </Paper>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredOrders.map(order => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={order._id}>
                                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Order #{order.orderNumber}
                                                </Typography>
                                                <Chip
                                                    label={order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                                    style={{ backgroundColor: getOrderStatusColor(order.orderStatus), color: '#fff' }}
                                                />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <ReceiptIcon sx={{ mr: 1, color: '#757575' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <ShippingIcon sx={{ mr: 1, color: '#757575' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Shipping: {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar src={order.items[0].product.images[0]} alt={order.items[0].product.name} sx={{ mr: 1, width: 32, height: 32 }} />                                                <Typography variant="body2" color="text.secondary">
                                                    {order.items[0].product.name}
                                                </Typography>
                                            </Box>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<VisibilityIcon />}
                                                onClick={() => handleViewOrder(order._id)}
                                            >
                                                View Order
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>
                </Container>
            </Box>
        </ProtectedRoute>
    )
}

export default OrdersPage