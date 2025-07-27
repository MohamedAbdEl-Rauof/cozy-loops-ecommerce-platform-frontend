'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Alert
} from '@mui/material'
import {
    Error as ErrorIcon,
    Home as HomeIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material'

const PaymentErrorPage: React.FC = () => {
    const router = useRouter()

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <ErrorIcon
                        sx={{ fontSize: 80, color: '#f44336', mb: 2 }}
                    />
                    <Typography variant="h4" fontWeight="bold" color="#f44336" gutterBottom>
                        Payment Failed
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        We couldn't process your payment
                    </Typography>
                    <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                        Your payment was not successful. This could be due to:
                        <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                            <li>Insufficient funds</li>
                            <li>Card declined by bank</li>
                            <li>Network connection issues</li>
                            <li>Incorrect payment details</li>
                        </ul>
                    </Alert>
                    
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                        <Button
                            variant="contained"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => router.push('/cart')}
                            sx={{ bgcolor: '#ff5722', '&:hover': { bgcolor: '#e64a19' } }}
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<HomeIcon />}
                            onClick={() => router.push('/')}
                            sx={{ borderColor: '#ff5722', color: '#ff5722' }}
                        >
                            Go Home
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default PaymentErrorPage