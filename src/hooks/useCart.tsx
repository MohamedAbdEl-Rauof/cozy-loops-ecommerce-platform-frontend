import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/cartServices';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { socket } from '@/lib/cartSocket'; 

export const useCart = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleCartUpdate = (updatedCart: any) => {
      queryClient.setQueryData(['cart'], updatedCart);
    };

    const handleCartItemAdded = (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    };

    socket.on('cartUpdated', handleCartUpdate);
    socket.on('cartItemAdded', handleCartItemAdded);
    socket.on('cartItemRemoved', handleCartItemAdded);
    socket.on('cartCleared', handleCartItemAdded);

    return () => {
      socket.off('cartUpdated', handleCartUpdate);
      socket.off('cartItemAdded', handleCartItemAdded);
      socket.off('cartItemRemoved', handleCartItemAdded);
      socket.off('cartCleared', handleCartItemAdded);
    };
  }, [queryClient]);

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    staleTime: 5 * 60 * 1000,
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