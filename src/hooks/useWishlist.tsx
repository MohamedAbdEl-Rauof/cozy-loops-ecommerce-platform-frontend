import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { WishlistService } from '@/services/wishlistService';
import { useSnackbar } from 'notistack';

// Main wishlist query hook
export const useWishlist = () => {
    const query = useQuery({
        queryKey: ['wishlist'],
        queryFn: WishlistService.getWishlistItems,
        staleTime: 5 * 60 * 1000,
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

// Add to wishlist
export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: WishlistService.addWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            enqueueSnackbar('Added to wishlist!', { variant: 'success' });
        },
        onError: (error: any) => {
            enqueueSnackbar(error.response?.data?.message || 'Failed to add to wishlist', { variant: 'error' });
        }
    });

    return {
        ...mutation,
        addToWishlist: mutation.mutate,
    };
};

// Remove from wishlist
export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: WishlistService.deleteWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            enqueueSnackbar('Removed from wishlist', { variant: 'info' });
        },
        onError: (error: any) => {
            enqueueSnackbar(error.response?.data?.message || 'Failed to remove from wishlist', { variant: 'error' });
        }
    });

    return {
        ...mutation,
        removeFromWishlist: mutation.mutate,
    };
};

// Clear wishlist
export const useClearWishlist = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: WishlistService.deleteWishlistItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            enqueueSnackbar('Wishlist cleared', { variant: 'warning' });
        },
        onError: (error: any) => {
            enqueueSnackbar(error.response?.data?.message || 'Failed to clear wishlist', { variant: 'error' });
        }
    });

    return {
        ...mutation,
        clearWishlist: mutation.mutate,
    };
};