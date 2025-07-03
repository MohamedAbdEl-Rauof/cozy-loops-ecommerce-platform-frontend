import React, { useState } from 'react';
import {
    Box,
    Typography,
    Rating,
    Button,
    IconButton,
    Chip,
    Card,
    CardContent,
    useTheme,
    Tooltip
} from '@mui/material';
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
import Image from 'next/image';

interface ProductImage {
    id: string;
    url: string;
    alt: string;
}

interface ProductColor {
    name: string;
    value: string;
    available: boolean;
}

interface ProductDetailsProps {
    id: string;
    name: string;
    images: ProductImage[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
    stockCount?: number;
    price: number;
    originalPrice?: number;
    colors: ProductColor[];
    description?: string;
    onAddToCart?: (quantity: number, color: string) => void;
    onToggleFavorite?: () => void;
    onShare?: () => void;
    isFavorite?: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    id,
    name,
    images,
    rating,
    reviewCount,
    inStock,
    stockCount,
    price,
    originalPrice,
    colors,
    description,
    onAddToCart,
    onToggleFavorite,
    onShare,
    isFavorite = false
}) => {

    const theme = useTheme();

    const [selectedImage, setSelectedImage] = useState(images[0]?.url || '');
    const [selectedColor, setSelectedColor] = useState(colors[0]?.value || '');
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (stockCount || 99)) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        onAddToCart?.(quantity, selectedColor);
    };

    const discountPercentage = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 3, md: 6 },
                maxWidth: '1400px',
                mx: 'auto',
                p: { xs: 2, md: 4 }
            }}
        >
            {/* Left Side - Images */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2
                }}
            >
                {/* Thumbnail Images */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        gap: 1,
                        order: { xs: 2, md: 1 },
                        overflowX: { xs: 'auto', md: 'visible' },
                        overflowY: { xs: 'visible', md: 'auto' },
                        maxHeight: { md: '500px' },
                        '&::-webkit-scrollbar': {
                            width: '4px',
                            height: '4px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'var(--primary-color)',
                            borderRadius: '2px'
                        }
                    }}
                >
                    {images.slice(0, 4).map((image, index) => (
                        <Box
                            key={image.id}
                            sx={{
                                minWidth: { xs: '80px', md: '100px' },
                                height: { xs: '80px', md: '120px' },
                                border: selectedImage === image.url
                                    ? '2px solid var(--primary-color)'
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
                                width={100}
                                height={120}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* Main Image */}
                <Box
                    sx={{
                        flex: 1,
                        order: { xs: 1, md: 2 },
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        position: 'relative',
                        minHeight: { xs: '300px', md: '500px' }
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

            {/* Right Side - Product Details */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Product Name */}
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

                {/* Rating and Stock */}
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

                {/* Price */}
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

                {/* Product Description */}
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

                {/* Colors */}
                <Box sx={{display:'flex',flexWrap:'wrap',gap:1,mb:2}}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                        Colors : 
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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

                {/* Quantity Counter */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                '&:hover': { bgcolor: 'var(--primary-color)', color: 'white' }
                            }}
                        >
                            <Remove />
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
                                color: 'var(--text-primary)'
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
                                '&:hover': { bgcolor: 'var(--primary-color)', color: 'white' }
                            }}
                        >
                            <Add />
                        </IconButton>
                    </Box>
                </Box>

                {/* Action Buttons */}
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
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        sx={{
                            flex: 1,
                            py: 1.5,
                            bgcolor: 'var(--primary-color)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            borderRadius: '12px',
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
                        {inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            onClick={onToggleFavorite}
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
                            onClick={onShare}
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

                {/* Delivery & Return Info */}
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
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '8px',
                                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                                        color: '#4CAF50'
                                    }}
                                >
                                    <LocalShipping />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        Free Delivery
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Free shipping on orders over $50. Delivered in 2-3 business days.
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

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
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '8px',
                                        bgcolor: 'rgba(33, 150, 243, 0.1)',
                                        color: '#2196F3'
                                    }}
                                >
                                    <AssignmentReturn />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        Easy Returns
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        30-day return policy. Return items in original condition for full refund.
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetails;