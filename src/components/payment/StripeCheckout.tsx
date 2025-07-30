'use client'
import { Box, Alert, CircularProgress, Typography } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'

import { StripeCheckoutProps } from '@/types/order'

import StripeCheckoutForm from './StripeCheckoutForm'

import type { Stripe } from '@stripe/stripe-js'




const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
    clientSecret, 
    publishableKey, 
    orderData,
    onPaymentStatusChange,
}) => {
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initializeStripe = async () => {
            try {
                setIsLoading(true)
                const key = publishableKey || process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                if (!key) {
                    throw new Error('Stripe publishable key not found')
                }

                const stripe = await loadStripe(key)
                setStripePromise(Promise.resolve(stripe))
                setError(null)
            } catch (error) {
                console.error('Stripe initialization error:', error)
                setError('Failed to initialize payment system. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }

        if (clientSecret) {
            initializeStripe()
        }
    }, [publishableKey, clientSecret])

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#ff5722',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#df1b41',
            fontFamily: 'Roboto, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
            focusBoxShadow: '0 0 0 2px rgba(255, 87, 34, 0.2)',
            colorTextSecondary: '#6b7280',
            fontSizeBase: '16px',
            fontWeightNormal: '400',
            fontWeightBold: '600'
        },
        rules: {
            '.Input': {
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff'
            },
            '.Input:focus': {
                border: '1px solid #ff5722',
                boxShadow: '0 0 0 2px rgba(255, 87, 34, 0.2)'
            },
            '.Label': {
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
            },
            '.Error': {
                color: '#ef4444',
                fontSize: '14px',
                marginTop: '4px'
            }
        }
    }

    const options = {
        clientSecret,
        appearance,
        loader: 'auto' as const
    }

    if (isLoading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress size={40} sx={{ color: '#ff5722' }} />
                <Typography variant="body2" color="text.secondary">
                    Initializing secure payment...
                </Typography>
            </Box>
        )
    }

    if (error) {
        return (
            <Alert 
                severity="error" 
                sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                        fontSize: '16px'
                    }
                }}
            >
                {error}
            </Alert>
        )
    }

    if (!stripePromise || !clientSecret) {
        return (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
                Payment system is not ready. Please refresh the page and try again.
            </Alert>
        )
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Elements stripe={stripePromise} options={options}>
                <StripeCheckoutForm 
                    orderData={orderData}
                    onPaymentStatusChange={onPaymentStatusChange} 
                />
            </Elements>
        </Box>
    )
}

export default StripeCheckout