import React, { useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { 
    Button, 
    CircularProgress, 
    Box, 
    Typography, 
    Paper,
    Alert
} from '@mui/material'
import { 
    CreditCard as CreditCardIcon,
    Security as SecurityIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material'

interface OrderData {
    orderNumber: string;
    orderId: string;
    breakdown: {
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    };
}

interface StripeCheckoutFormProps {
    orderData: OrderData;
    onPaymentStatusChange: (status: 'processing' | 'completed' | 'failed') => void;
}

const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ 
    orderData,
    onPaymentStatusChange, 
}) => {
    const [processing, setIsProcessing] = useState(false)
    const [paymentError, setPaymentError] = useState<string | null>(null)
    const stripe = useStripe()
    const elements = useElements()

    const handlePaymentSubmission = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        setPaymentError(null)
        onPaymentStatusChange('processing')

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment/success?order=${orderData.orderNumber}`
                }
            })

            if (error) {
                const errorMessage = error.message || 'Payment failed. Please try again.'
                setPaymentError(errorMessage)
                onPaymentStatusChange('failed')
            } else {
                onPaymentStatusChange('completed')
            }
        } catch (err) {
            const errorMessage = 'An unexpected error occurred. Please try again.'
            setPaymentError(errorMessage)
            onPaymentStatusChange('failed')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handlePaymentSubmission}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 2, 
                        mb: 3, 
                        bgcolor: '#f8f9fa', 
                        border: '1px solid #e9ecef',
                        borderRadius: 2
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <SecurityIcon sx={{ color: '#28a745', fontSize: 20 }} />
                        <Typography variant="body2" fontWeight="600" color="#28a745">
                            Secure Payment
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        Your payment information is encrypted and secure. We never store your card details.
                    </Typography>
                </Paper>

                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CreditCardIcon sx={{ color: '#ff5722', fontSize: 24 }} />
                        <Typography variant="h6" fontWeight="600">
                            Payment Method
                        </Typography>
                    </Box>
                    
                    <Box sx={{ 
                        p: 3, 
                        border: '1px solid #e5e7eb', 
                        borderRadius: 2,
                        bgcolor: '#ffffff'
                    }}>
                        <PaymentElement 
                            options={{
                                layout: {
                                    type: 'tabs',
                                    defaultCollapsed: false,
                                    radios: false,
                                    spacedAccordionItems: true
                                }
                            }}
                        />
                    </Box>
                </Box>

                {paymentError && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {paymentError}
                    </Alert>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!stripe || processing}
                    sx={{
                        py: 2,
                        fontSize: '16px',
                        fontWeight: 600,
                        bgcolor: '#ff5722',
                        '&:hover': {
                            bgcolor: '#e64a19'
                        },
                        '&:disabled': {
                            bgcolor: '#ccc'
                        }
                    }}
                >
                    {processing ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={20} color="inherit" />
                            Processing...
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon fontSize="small" />
                            Pay with Credit Card
                        </Box>
                    )}
                </Button>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        Powered by Stripe • SSL Encrypted • PCI Compliant
                    </Typography>
                </Box>
            </form>
        </Box>
    )
}

export default StripeCheckoutForm