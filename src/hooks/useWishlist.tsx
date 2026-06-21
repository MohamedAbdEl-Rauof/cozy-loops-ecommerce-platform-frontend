import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useAuth } from '@/context/AuthContext';
import { WishlistService } from '@/services/wishlistService';

export const useWishlist = () => {
    const { isAuthenticated } = useAuth();
    const query = useQuery({
        queryKey: ['wishlist'],
        queryFn: WishlistService.getWishlistItems,
        staleTime: 5 * 60 * 1000,
        // /api/wishlist is auth-protected; only fetch when signed in.
        enabled: isAuthenticated,
    });

    const isInWishlist = (productId: string): boolean => {
        if (!query.data?.wishlist?.items) return false;
        return query.data.wishlist.items.some(item => item.product._id === productId);
    };

    const wishlistItems = query.data?.wishlist?.items || [];

    return {
        ...query,
        isInWishlist,
        wishlistItems
    };
};

export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: WishlistService.addWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            enqueueSnackbar('Added to wishlist!', { variant: 'success' });
        },

        onError: (error: unknown) => {
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Failed to add to wishlist';
            enqueueSnackbar(errorMessage || 'Failed to add to wishlist', { variant: 'error' });
        }
    });

    return {
        ...mutation,
        addToWishlist: mutation.mutate,
    };
};

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: WishlistService.deleteWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            enqueueSnackbar('Removed from wishlist', { variant: 'info' });
        },

        onError: (error: unknown) => {
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Failed to remove from wishlist';
            enqueueSnackbar(errorMessage || 'Failed to remove from wishlist', { variant: 'error' });
        }
    });

    return {
        ...mutation,
        removeFromWishlist: mutation.mutate,
    };
};

export const useClearWishlist = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: WishlistService.deleteWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            enqueueSnackbar('Wishlist cleared', { variant: 'warning' });
        },
        onError: (error: unknown) => {
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
                : 'Failed to clear wishlist';
            enqueueSnackbar(errorMessage || 'Failed to clear wishlist', { variant: 'error' });
        }
    });

    return {
        ...mutation,
        clearWishlist: mutation.mutate,
    };
};