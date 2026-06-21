import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';
import { socket } from '@/lib/cartSocket';
import { cartService } from '@/services/cartServices';
import { CartUpdateData } from '@/types/cart';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleCartUpdate = (updatedCart: CartUpdateData) => {
      queryClient.setQueryData(['cart'], updatedCart);
    };

    const handleCartItemAdded = () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    };

    const handleCartCheckedOut = () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    };

    socket.on('cartUpdated', handleCartUpdate);
    socket.on('cartItemAdded', handleCartItemAdded);
    socket.on('cartItemRemoved', handleCartItemAdded);
    socket.on('cartCleared', handleCartItemAdded);
    socket.on('cartCheckedOut', handleCartCheckedOut);

    return () => {
      socket.off('cartUpdated', handleCartUpdate);
      socket.off('cartItemAdded', handleCartItemAdded);
      socket.off('cartItemRemoved', handleCartItemAdded);
      socket.off('cartCleared', handleCartItemAdded);
      socket.off('cartCheckedOut', handleCartCheckedOut);
    };
  }, [queryClient]);

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    staleTime: 5 * 60 * 1000,
    // Only fetch the cart for signed-in users — the /api/cart endpoint is
    // auth-protected, so firing it while logged out produced a 401 on every page.
    enabled: isAuthenticated,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      enqueueSnackbar('Item added to cart!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to add item to cart', { variant: 'error' });
    }
  });

  return {
    ...mutation,
    addToCart: mutation.mutate,
  };
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: cartService.updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      enqueueSnackbar('Cart updated!', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('Failed to update cart', { variant: 'error' });
    }
  });

  return {
    ...mutation,
    updateCart: mutation.mutate,
  };
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: cartService.deleteItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      enqueueSnackbar('Item removed from cart', { variant: 'info' });
    },
    onError: () => {
      enqueueSnackbar('Failed to remove item', { variant: 'error' });
    }
  });

  return {
    ...mutation,
    removeFromCart: mutation.mutate,
  };
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      enqueueSnackbar('Cart cleared', { variant: 'warning' });
    },
    onError: () => {
      enqueueSnackbar('Failed to clear cart', { variant: 'error' });
    }
  });

  return {
    ...mutation,
    clearCart: mutation.mutate,
  };
};