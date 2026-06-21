'use client';

import { ShoppingBag as ShoppingBagIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { orderService } from '@/services/orderService';
import { Order } from '@/types/order';

const statusColor = (status: string): string => {
  switch (status) {
    case 'pending': return '#ff9800';
    case 'processing': return '#2196f3';
    case 'shipped': return '#9c27b0';
    case 'delivered': return '#4caf50';
    case 'cancelled': return '#f44336';
    default: return '#757575';
  }
};

const OrdersSection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await orderService.getUserOrders();
      if (response.success) {
        setOrders(response.orders);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError('Unable to load your orders right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 1, color: '#333' }}>
        My Orders
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        A summary of your recent orders.
      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress sx={{ color: '#FF7043' }} />
        </Box>
      )}

      {!isLoading && error && <Alert severity="error">{error}</Alert>}

      {!isLoading && !error && orders.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <ShoppingBagIcon sx={{ fontSize: 64, color: '#e0e0e0', mb: 1 }} />
          <Typography color="text.secondary" sx={{ mb: 2 }}>You haven&apos;t placed any orders yet.</Typography>
          <Button component={Link} href="/categories" variant="contained"
            sx={{ bgcolor: '#FF7043', '&:hover': { bgcolor: '#FF5722' } }}>
            Start Shopping
          </Button>
        </Box>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <Stack divider={<Divider />} spacing={0}>
          {orders.map((order) => (
            <Box
              key={order._id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 1.5,
                py: 2,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  Order #{order.orderNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                  {' · '}
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0 }}>
                <Chip
                  size="small"
                  label={order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  sx={{ bgcolor: statusColor(order.orderStatus), color: '#fff' }}
                />
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#FF5722', minWidth: 72, textAlign: 'right' }}>
                  ${order.totalAmount.toFixed(2)}
                </Typography>
                <Button
                  component={Link}
                  href={`/orders/${order._id}`}
                  size="small"
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  sx={{ borderColor: '#FF7043', color: '#FF5722', '&:hover': { borderColor: '#FF5722' } }}
                >
                  View
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default OrdersSection;
