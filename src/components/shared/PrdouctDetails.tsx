import {
    FavoriteBorder,
    Favorite,
    Share,
    Add,
    Remove,
    LocalShipping,
    AssignmentReturn,
    Verified,
    ShoppingCart
} from '@mui/icons-material';
import {
    Box,
    Typography,
    Rating,
    Button,
    IconButton,
    Chip,
    Card,
    CardContent,
    Tooltip
} from '@mui/material';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

import { useAddToCart, useCart, useUpdateCart } from '@/hooks/useCart';
import { ProductDetailsProps } from '@/types/product';
import AuthDialog from '@/components/dialogs/AuthDialog';
import { useAuth } from '@/context/AuthContext'

const ProductDetails: React.FC<ProductDetailsProps> = ({
    productData,
    onToggleFavorite,
}) => {
    if (!productData) return <p>No product data available.</p>;

    const {
        _id,
        name,
        images,
        mainImage,
        rating,
        reviewCount,
        inStock,
        stockCount,
        price,
        originalPrice,
        colors,
        description,
        discountPercentage,
        isFavorite,
    } = productData;

    const [selectedImage, setSelectedImage] = useState(
        mainImage || images[0]?.url || ""
    );
    const [selectedColor, setSelectedColor] = useState(colors[0]?.value || '');
    const [quantity, setQuantity] = useState(1);
    const { addToCart, isPending: isAddingToCart } = useAddToCart();
    const { updateCart, isPending: isUpdatingCart } = useUpdateCart();
    const { data: cartData } = useCart();
    const { enqueueSnackbar } = useSnackbar();
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [authDialogMessage, setAuthDialogMessage] = useState('');
    const { user } = useAuth();

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (stockCount || 99)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async (productId: string) => {

        if (!user) {
            setAuthDialogMessage('Please log in to add items to your cart.');
            setAuthDialogOpen(true);
            return;
        }

        if (isAddingToCart || isUpdatingCart) return;

        try {
            const existingCartItem = cartData?.items?.find((item) =>
                item.product._id === productId || item.product.id === productId
            );

            if (existingCartItem) {
                await updateCart({
                    productId: productId,
                    quantity: existingCartItem.quantity + quantity,
                    variant: selectedColor
                });
            } else {
                await addToCart({
                    productId: productId,
                    quantity: quantity,
                    variant: selectedColor
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: name,
            text: `Check out this amazing product: ${name} - Only ${price.toFixed(2)} EGP`,
            url: window.location.href,
        };

        try {
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(
                    `${shareData.title}\n${shareData.text}\n${shareData.url}`
                );
                enqueueSnackbar('Product link copied to clipboard!', { variant: 'success' });

            }
        } catch (error) {
            console.error('Error sharing:', error);
            try {
                await navigator.clipboard.writeText(window.location.href);
                enqueueSnackbar('Product link copied to clipboard!', { variant: 'success' });

            } catch (clipboardError) {
                console.error('Clipboard error:', clipboardError);
                alert('Unable to share. Please copy the URL manually.');
                enqueueSnackbar('Unable to share. Please copy the URL manually.', { variant: 'success' });

            }
        }
    };

    const handleToggleFavorite = () => {
        if (!user) {
            setAuthDialogMessage('Please log in to manage your favorites.');
            setAuthDialogOpen(true);
            return;
        }

        onToggleFavorite();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 3, md: 6 },
                mx: 'auto',
                p: { xs: 2, md: 4 }
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 5
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        gap: 1.5,
                        order: { xs: 2, md: 1 },
                        overflowX: { xs: 'auto', md: 'visible' },
                        overflowY: { xs: 'visible', md: 'auto' },
                        maxHeight: { md: '1000px' },
                        minWidth: { md: '140px' },
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            height: '6px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'var(--primary-color)',
                            borderRadius: '3px'
                        }
                    }}
                >
                    {images.slice(0, 4).map((image) => (
                        <Box
                            key={image.id}
                            sx={{
                                minWidth: { xs: '100px', md: '130px' },
                                width: { xs: '100px', md: '130px' },
                                height: { xs: '100px', md: '150px' },
                                border: selectedImage === image.url
                                    ? '3px solid var(--primary-color)'
                                    : '2px solid transparent',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }
                            }}
                            onClick={() => setSelectedImage(image.url)}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                width={130}
                                height={150}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        order: { xs: 1, md: 2 },
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        position: 'relative',
                        minHeight: { xs: '300px', md: '400px' }
                    }}
                >
                    <Image
                        src={selectedImage}
                        alt={name}
                        fill
                        style={{
                            objectFit: 'cover'
                        }}
                        priority
                    />
                    {discountPercentage > 0 && (
                        <Chip
                            label={`-${discountPercentage}%`}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                bgcolor: 'var(--danger-color)',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.875rem'
                            }}
                        />
                    )}
                </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        lineHeight: 1.3
                    }}
                >
                    {name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                            ({reviewCount} reviews)
                        </Typography>
                    </Box>
                    <Chip
                        icon={<Verified />}
                        label="In Stock "
                        color="success"
                        variant="outlined"
                        size="small"
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: 'var(--primary-color)',
                            fontSize: { xs: '1.5rem', md: '1.75rem' }
                        }}
                    >
                        {price.toFixed(2)} EGP
                    </Typography>
                    {originalPrice && (
                        <Typography
                            variant="h6"
                            sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                                fontSize: '1.25rem'
                            }}
                        >
                            ${originalPrice.toFixed(2)}
                        </Typography>
                    )}
                </Box>

                {description && (
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.6,
                                mb: 1
                            }}
                        >
                            Short Description :  {description}
                        </Typography>
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    flexWrap: 'wrap'
                }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Colors :
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {colors.map((color) => (
                            <Tooltip key={color.value} title={color.name}>
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        backgroundColor: color.value,
                                        border: selectedColor === color.value
                                            ? '3px solid var(--primary-color)'
                                            : '2px solid #e0e0e0',
                                        cursor: color.available ? 'pointer' : 'not-allowed',
                                        opacity: color.available ? 1 : 0.5,
                                        transition: 'all 0.3s ease',
                                        '&:hover': color.available ? {
                                            transform: 'scale(1.1)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                        } : {}
                                    }}
                                    onClick={() => color.available && setSelectedColor(color.value)}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                            Quantity:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                                sx={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    width: 40,
                                    height: 40,
                                    '&:hover': {
                                        bgcolor: 'var(--primary-color)',
                                        color: 'white',
                                        borderColor: 'var(--primary-color)'
                                    },
                                    '&:disabled': {
                                        bgcolor: '#f5f5f5',
                                        color: '#ccc',
                                        borderColor: '#e0e0e0'
                                    }
                                }}
                            >
                                <Remove fontSize="small" />
                            </IconButton>
                            <Typography
                                sx={{
                                    minWidth: '60px',
                                    textAlign: 'center',
                                    py: 1,
                                    px: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                    bgcolor: 'white'
                                }}
                            >
                                {quantity}
                            </Typography>
                            <IconButton
                                onClick={() => handleQuantityChange(1)}
                                disabled={quantity >= (stockCount || 99)}
                                sx={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    width: 40,
                                    height: 40,
                                    '&:hover': {
                                        bgcolor: 'var(--primary-color)',
                                        color: 'white',
                                        borderColor: 'var(--primary-color)'
                                    },
                                    '&:disabled': {
                                        bgcolor: '#f5f5f5',
                                        color: '#ccc',
                                        borderColor: '#e0e0e0'
                                    }
                                }}
                            >
                                <Add fontSize="small" />
                            </IconButton>
                        </Box>
                        {stockCount && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                {stockCount} items available
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'stretch'
                }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCart />}
                        onClick={() => _id && handleAddToCart(_id)}
                        disabled={!inStock || isAddingToCart || isUpdatingCart}
                        sx={{
                            flex: 1,
                            py: 1.5,
                            bgcolor: 'var(--primary-color)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            borderRadius: '9999px !important',
                            textTransform: 'none',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            '&:hover': {
                                bgcolor: 'var(--primary-color-dark)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                            },
                            '&:disabled': {
                                bgcolor: '#ccc',
                                color: '#666'
                            }
                        }}
                    >
                        {isAddingToCart || isUpdatingCart ? 'Adding...' : 'Add to Cart'}
                    </Button>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            onClick={handleToggleFavorite}
                            sx={{
                                border: '2px solid #e0e0e0',
                                borderRadius: '12px',
                                p: 1.5,
                                bgcolor: isFavorite ? 'rgba(255, 0, 0, 0.1)' : 'white',
                                color: isFavorite ? 'red' : '#666',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: isFavorite ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0,0,0,0.05)',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>

                        <IconButton
                            onClick={handleShare}
                            sx={{
                                border: '2px solid #e0e0e0',
                                borderRadius: '12px',
                                p: 1.5,
                                bgcolor: 'white',
                                color: '#666',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.05)',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            <Share />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '10px',
                                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                                        color: '#4CAF50',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <LocalShipping sx={{ fontSize: '1.5rem' }} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                                        Free Delivery
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                        Free shipping on orders over $50. Delivered in 2-3 business days.
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    height: '1px',
                                    bgcolor: '#e0e0e0',
                                    mx: -1,
                                    mb: 3
                                }}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '10px',
                                        bgcolor: 'rgba(33, 150, 243, 0.1)',
                                        color: '#2196F3',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <AssignmentReturn sx={{ fontSize: '1.5rem' }} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                                        Easy Returns
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                        30-day return policy. Return items in original condition for full refund.
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <AuthDialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                title="Login Required"
                message={authDialogMessage}
            />
        </Box>
    );
};

export default ProductDetails;