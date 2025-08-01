'use client'
import {
    Warning as WarningIcon,
    Home as HomeIcon,
    CreditCard as CreditCardIcon
} from '@mui/icons-material'
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Alert
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaymentFailedPage: React.FC = () => {
    const router = useRouter()

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                    <WarningIcon
                        sx={{ fontSize: 80, color: '#ff9800', mb: 2 }}
                    />
                    <Typography variant="h4" fontWeight="bold" color="#ff9800" gutterBottom>
                        Payment Requires Action
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Your payment needs a new payment method
                    </Typography>
                    <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
                        Your payment could not be processed with the current payment method. 
                        Please try with a different card or payment method.
                    </Alert>
                    
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                        <Button
                            variant="contained"
                            startIcon={<CreditCardIcon />}
                            onClick={() => router.push('/cart')}
                            sx={{ bgcolor: '#ff5722', '&:hover': { bgcolor: '#e64a19' } }}
                        >
                            Try Different Payment
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

export default PaymentFailedPage