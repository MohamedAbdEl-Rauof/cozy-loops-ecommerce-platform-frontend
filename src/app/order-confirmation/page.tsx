/* eslint-disable import/order */
'use client'

import { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

import OrderConfirmationContent from '@/components/order/OrderConfirmationContent'
import ProtectedRoute from '@/provider/ProtectedRoute'

export const dynamic = 'force-dynamic'

const OrderConfirmationPage: React.FC = () => {
    return (
        <ProtectedRoute>
            <Suspense fallback={
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
                            Loading...
                        </Typography>
                    </Box>
                </Box>
            }>
                <OrderConfirmationContent />
            </Suspense>
        </ProtectedRoute>
    )
}

export default OrderConfirmationPage