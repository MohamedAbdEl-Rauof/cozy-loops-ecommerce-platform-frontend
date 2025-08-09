"use client"
import { Container, Typography, Alert, CircularProgress, Box, Paper, Grid, Divider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import StripeCheckout from '@/components/payment/StripeCheckout';
import ProtectedRoute from '@/provider/ProtectedRoute';
import { paymentService } from '@/services/paymentService';

export const dynamic = 'force-dynamic'

interface CheckoutResponse {
    clientSecret: string;
    paymentIntentId: string;
    orderId: string;
    orderNumber: string;
    amount: number;
    breakdown: {
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    };
    publishableKey: string;
}

const PaymentContent: React.FC = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const handleCreatePaymentIntent = useCallback(async () => {
        if (!orderId) {
            setCheckoutError('Order ID is required');
            return;
        }

        try {
            setIsProcessing(true);
            setCheckoutError(null);

            const response = await paymentService.createPaymentIntent({
                orderId: orderId
            });

            setCheckoutData(response);
        } catch (error) {
            setCheckoutError(error instanceof Error ? error.message : 'An error occurred during payment setup');
        } finally {
            setIsProcessing(false);
        }
    }, [orderId]);

    const handlePaymentStatusChange = (status: 'processing' | 'completed' | 'failed') => {
        switch (status) {
            case 'processing':
                setIsProcessing(true);
                break;
            case 'completed':
                setIsProcessing(false);
                window.location.href = '/payment/success';
                break;
            case 'failed':
                setIsProcessing(false);
                setCheckoutError('Payment failed. Please try again.');
                break;
        }
    };

    useEffect(() => {
        if (orderId && !checkoutData && !isProcessing) {
            handleCreatePaymentIntent();
        }
    }, [orderId, checkoutData, isProcessing, handleCreatePaymentIntent]);

    if (!orderId) {
        return (
            <ProtectedRoute>
                <Box sx={{ bgcolor: 'white' }}>
                    <Container maxWidth="lg" sx={{ py: 4 }}>
                        <Alert severity="error">
                            Order ID is missing. Please go back to cart and try again.
                        </Alert>
                    </Container>
                </Box>
            </ProtectedRoute>
        );
    }

    if (isProcessing && !checkoutData) {
        return (
            <ProtectedRoute>
                <Box sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>
                        Setting up payment...
                    </Typography>
                </Box>
            </ProtectedRoute>
        );
    }

    if (checkoutError) {
        return (
            <ProtectedRoute>

                <Box sx={{ bgcolor: 'white' }}>
                    <Container maxWidth="lg" sx={{ py: 4 }}>
                        <Alert severity="error">
                            {checkoutError}
                        </Alert>
                    </Container>
                </Box>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            mb: 4,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Complete Your Payment
                    </Typography>

                    {checkoutData ? (
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Paper elevation={3} sx={{ p: 3 }}>
                                    <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600, mb: 3 }}>
                                        Payment Information
                                    </Typography>
                                    <StripeCheckout
                                        clientSecret={checkoutData.clientSecret}
                                        publishableKey={checkoutData.publishableKey}
                                        orderData={{
                                            orderNumber: checkoutData.orderNumber,
                                            orderId: checkoutData.orderId,
                                            breakdown: checkoutData.breakdown
                                        }}
                                        onPaymentStatusChange={handlePaymentStatusChange}
                                    />
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, md: 5 }}>
                                <Paper elevation={3} sx={{ p: 3, height: 'fit-content', position: 'sticky', top: 20 }}>
                                    <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
                                        Order Summary
                                    </Typography>

                                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Order Number:
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold">
                                            {checkoutData.orderNumber}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Subtotal:</Typography>
                                            <Typography variant="body2">${checkoutData.breakdown.subtotal.toFixed(2)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2">Shipping:</Typography>
                                            <Typography variant="body2">${checkoutData.breakdown.shipping.toFixed(2)}</Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6" fontWeight="600">
                                            Total Amount:
                                        </Typography>
                                        <Typography variant="h6" fontWeight="700" color="primary">
                                            ${checkoutData.breakdown.total.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                            <CircularProgress />
                            <Typography sx={{ ml: 2 }}>
                                Loading payment information...
                            </Typography>
                        </Box>
                    )}
                </Container>
            </Box>
        </ProtectedRoute>
    );
};

export default PaymentContent;