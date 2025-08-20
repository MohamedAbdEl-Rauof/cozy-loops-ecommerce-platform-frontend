"use client"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Typography,
    Grid,
    CardMedia,
    IconButton,
    Container,
    Fade,
    Chip,
    Button,
    CircularProgress,
    CardContent,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import React, { useEffect, useRef, useState, useCallback } from 'react';

import { useAddToCart, useCart, useUpdateCart } from '@/hooks/useCart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/useWishlist';


const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const AnimatedSection = styled(Box)(() => ({
    opacity: 0,
    transform: 'translateY(50px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.animate-in': {
        opacity: 1,
        transform: 'translateY(0)',
        animation: `${slideInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
}));

const NavigationButton = styled(IconButton)(() => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: 'var(--primary-color, #e74c3c)',
    width: '64px',
    height: '64px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    zIndex: 3,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        backgroundColor: 'var(--primary-color, #e74c3c)',
        color: 'white',
        transform: 'translateY(-50%) scale(1.15)',
        boxShadow: '0 12px 40px rgba(231, 76, 60, 0.4)',
        borderColor: 'var(--primary-color, #e74c3c)',
    },
    '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: 'var(--primary-color, #e74c3c)',
            transform: 'translateY(-50%)',
        }
    }
}));

const ProductCard = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '20px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1,
        pointerEvents: 'none',
    },
    '&:hover': {
        transform: 'translateY(-12px) scale(1.02)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        '&::before': {
            opacity: 1,
        },
        '& .product-image': {
            transform: 'scale(1.1)',
        },
        '& .action-buttons': {
            opacity: 1,
            transform: 'translateY(0)',
        },
        '& .price-tag': {
            animation: `${pulse} 0.6s ease-in-out`,
        },
        '& .floating-badge': {
            animation: `${float} 2s ease-in-out infinite`,
        }
    }
}));

const ActionButton = styled(IconButton)(() => ({
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    width: 44,
    height: 44,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
    }
}));

const PaginationDot = styled(Box)<{ active: boolean }>(({ active }) => ({
    width: active ? 32 : 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: active ? 'var(--primary-color, #e74c3c)' : 'rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': active ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        animation: `${shimmer} 2s infinite`,
    } : {},
    '&:hover': {
        backgroundColor: active ? 'var(--primary-color, #e74c3c)' : 'rgba(0,0,0,0.4)',
        transform: 'scale(1.2)',
    }
}));

interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    discount?: number;
    category?: string;
    categoryId?: string;
    slug?: string;
    categorySlug?: string

}

interface ProductsData {
    title: string;
    productsData: Product[];
}

interface SimilarProductsProps {
    productsData: ProductsData;
    onQuickView?: (_categoryId: string, _productId: string) => void;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
    productsData,
    onQuickView
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const { addToCart, isPending: isAddingToCart } = useAddToCart();
    const { updateCart, isPending: isUpdatingCart } = useUpdateCart();
    const { data: cartData } = useCart();

    const { isInWishlist } = useWishlist();
    const { addToWishlist } = useAddToWishlist();
    const { removeFromWishlist } = useRemoveFromWishlist();

    const productsPerPage = 3;
    const totalProducts = productsData?.productsData?.length || 0;
    const maxIndex = Math.max(0, totalProducts - productsPerPage);


    const handleAddToCart = async (productId: string) => {
        if (isAddingToCart || isUpdatingCart) return;

        try {
            const existingCartItem = cartData?.items?.find((item) =>
                item.product._id === productId || item.product.id === productId
            );

            if (existingCartItem) {
                await updateCart({
                    productId: productId,
                    quantity: existingCartItem.quantity + 1,
                });
            } else {
                await addToCart({
                    productId: productId,
                    quantity: 1,
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };


    const handleToggleFavorite = (productId: string) => {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };


    const handleQuickView = (productId: string) => {
        const product = productsData.productsData.find(p => p.id === productId);
        if (onQuickView && product && product.categorySlug && product.slug) {
            onQuickView(product.categorySlug, product.slug);
        }
    };

    const handlePrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
        setVisibleProducts([]);
        setTimeout(() => {
            triggerProductAnimations();
        }, 100);
    };

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
        setVisibleProducts([]);
        setTimeout(() => {
            triggerProductAnimations();
        }, 100);
    };

    const triggerProductAnimations = useCallback(() => {
        if (!productsData?.productsData || !Array.isArray(productsData.productsData)) {
            return;
        }

        const currentProducts = productsData.productsData.slice(currentIndex, currentIndex + productsPerPage);
        currentProducts.forEach((_, index) => {
            setTimeout(() => {
                setVisibleProducts(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                });
            }, index * 200);
        });
    }, [currentIndex, productsData?.productsData, productsPerPage]);

    const getCurrentProducts = () => {
        if (!productsData?.productsData || !Array.isArray(productsData.productsData)) {
            return [];
        }

        return productsData.productsData.slice(currentIndex, currentIndex + productsPerPage);
    };

    const handleDotClick = (dotIndex: number) => {
        setCurrentIndex(dotIndex);
        setVisibleProducts([]);
        setTimeout(() => {
            triggerProductAnimations();
        }, 100);
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    triggerProductAnimations();
                }
            },
        );

        const currentSectionRef = sectionRef.current;
        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, [triggerProductAnimations]);

    const currentProducts = getCurrentProducts();
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    if (totalProducts === 0) {
        return (
            <Box sx={{ py: 6, bgcolor: '#fafafa' }}>
                <Container
                    maxWidth={false}
                    sx={{
                        maxWidth: {
                            xs: '100%',
                            sm: '100%',
                            md: '1400px',
                            lg: '1600px',
                            xl: '1850px'
                        },
                        px: { xs: 2, sm: 3, md: 4, lg: 6 },
                        mx: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            color: '#6c757d',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            No Similar Products Found
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Check back soon for new arrivals and recommendations!
                        </Typography>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box
            ref={sectionRef}
            component="section"
            sx={{
                py: { xs: 6, md: 10 },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.03) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }
            }}
        >
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: {
                        xs: '100%',
                        sm: '100%',
                        md: '1400px',
                        lg: '1600px',
                        xl: '1850px'
                    },
                    px: { xs: 2, sm: 3, md: 4, lg: 6 },
                    mx: 'auto',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <AnimatedSection
                    className={isVisible ? 'animate-in' : ''}
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 6, md: 8 },
                        maxWidth: '800px',
                        mx: 'auto'
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            lineHeight: 1.2,
                            color: '#1e293b',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -12,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60px',
                                height: '3px',
                                background: 'linear-gradient(90deg, #D97706 0%, #F59E0B 50%, #D97706 100%)',
                                borderRadius: '2px',
                            }
                        }}
                    >
                        {productsData.title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontWeight: 400,
                        }}
                    >
                        Discover handpicked products that complement your style and preferences
                    </Typography>
                </AnimatedSection>

                {/* Products Carousel */}
                <Box sx={{ position: 'relative', overflow: 'visible' }}>
                    {/* Navigation Arrows */}
                    {totalProducts > productsPerPage && (
                        <>
                            <NavigationButton
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                sx={{
                                    left: { xs: -15, sm: -25, md: -35 },
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 1)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                                    },
                                    '&:disabled': {
                                        opacity: 0.4,
                                        cursor: 'not-allowed',
                                    }
                                }}
                                aria-label="Previous products"
                            >
                                <ArrowBackIosIcon sx={{ fontSize: 20, ml: 0.5, color: '#475569' }} />
                            </NavigationButton>

                            <NavigationButton
                                onClick={handleNext}
                                disabled={currentIndex >= maxIndex}
                                sx={{
                                    right: { xs: -15, sm: -25, md: -35 },
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 1)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                                    },
                                    '&:disabled': {
                                        opacity: 0.4,
                                        cursor: 'not-allowed',
                                    }
                                }}
                                aria-label="Next products"
                            >
                                <ArrowForwardIosIcon sx={{ fontSize: 20, color: '#475569' }} />
                            </NavigationButton>
                        </>
                    )}

                    {/* Products Grid */}
                    <Grid
                        container
                        spacing={{ xs: 3, sm: 4, md: 5 }}
                        sx={{
                            justifyContent: currentProducts.length < 3 ? 'center' : 'flex-start',
                        }}
                    >
                        {currentProducts.map((product, index) => (
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: currentProducts.length === 1 ? 8 : 6,
                                    md: currentProducts.length === 1 ? 6 : currentProducts.length === 2 ? 6 : 4
                                }}
                                key={`${product.id}-${currentIndex}`}
                            >
                                <Fade
                                    in={visibleProducts[index] || false}
                                    timeout={600}
                                    style={{
                                        transitionDelay: `${index * 150}ms`
                                    }}
                                >
                                    <ProductCard
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        sx={{
                                            maxWidth: currentProducts.length === 1 ? '450px' : 'none',
                                            mx: currentProducts.length === 1 ? 'auto' : 'initial',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                            }
                                        }}
                                    >
                                        {/* Product Image Section */}
                                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                            {/* Badges */}
                                            <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
                                                {product.isNew && (
                                                    <Chip
                                                        label="NEW"
                                                        size="small"
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.7rem',
                                                            height: 24,
                                                            mb: 0.5,
                                                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                                                            border: 'none',
                                                        }}
                                                    />
                                                )}
                                                {product.discount && (
                                                    <Chip
                                                        label={`-${product.discount}%`}
                                                        size="small"
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.7rem',
                                                            height: 24,
                                                            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                                                            border: 'none',
                                                        }}
                                                    />
                                                )}
                                            </Box>

                                            <CardMedia
                                                component="img"
                                                height="280"
                                                image={product.image}
                                                alt={product.title}
                                                sx={{
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    transform: hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)',
                                                }}
                                            />

                                            {/* Overlay */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
                                                    opacity: hoveredProduct === product.id ? 1 : 0,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            />

                                            {/* Action Buttons */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1,
                                                    opacity: hoveredProduct === product.id ? 1 : 0,
                                                    transform: hoveredProduct === product.id ? 'translateY(0)' : 'translateY(-10px)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    zIndex: 3,
                                                }}
                                                className="action-buttons"
                                            >
                                                <ActionButton
                                                    onClick={() => handleToggleFavorite(product.id)}
                                                    sx={{
                                                        backgroundColor: isInWishlist(product.id)
                                                            ? 'rgba(239, 68, 68, 0.1)'
                                                            : 'rgba(255, 255, 255, 0.9)',
                                                        color: isInWishlist(product.id) ? '#ef4444' : '#64748b',
                                                        '&:hover': {
                                                            backgroundColor: isInWishlist(product.id)
                                                                ? 'rgba(239, 68, 68, 0.2)'
                                                                : 'rgba(255, 255, 255, 1)',
                                                            color: '#ef4444',
                                                            transform: 'scale(1.1)',
                                                        }
                                                    }}
                                                    aria-label="Add to wishlist"
                                                >
                                                    {isInWishlist(product.id) ? (
                                                        <FavoriteIcon sx={{ fontSize: 18 }} />
                                                    ) : (
                                                        <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                                                    )}
                                                </ActionButton>

                                                <ActionButton
                                                    onClick={() => handleQuickView(product.id)}
                                                    sx={{
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        color: '#64748b',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255, 255, 255, 1)',
                                                            color: '#3b82f6',
                                                            transform: 'scale(1.1)',
                                                        }
                                                    }}
                                                    aria-label="Quick view"
                                                >
                                                    <VisibilityIcon sx={{ fontSize: 18 }} />
                                                </ActionButton>
                                            </Box>

                                            {/* Add to Cart Button */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 16,
                                                    left: 16,
                                                    right: 16,
                                                    opacity: hoveredProduct === product.id ? 1 : 0,
                                                    transform: hoveredProduct === product.id ? 'translateY(0)' : 'translateY(10px)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    zIndex: 3,
                                                }}
                                            >
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={() => handleAddToCart(product.id)}
                                                    disabled={isAddingToCart || isUpdatingCart}
                                                    startIcon={
                                                        isAddingToCart || isUpdatingCart ? (
                                                            <CircularProgress size={16} color="inherit" />
                                                        ) : (
                                                            <ShoppingCartIcon />
                                                        )
                                                    }
                                                    sx={{
                                                        bgcolor: 'var(--primary-color)',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        py: 1.5,
                                                        borderRadius: '30px !important',
                                                        textTransform: 'none',
                                                        fontSize: '0.9rem',
                                                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                                                        border: 'none',
                                                        '&:hover': {
                                                            bgcolor: 'var(--primary-color-dark)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                                                        },
                                                        '&:disabled': {
                                                            background: 'rgba(148, 163, 184, 0.5)',
                                                            color: 'rgba(255, 255, 255, 0.7)',
                                                        }
                                                    }}
                                                >
                                                    {isAddingToCart || isUpdatingCart ? 'Adding...' : 'Add to Cart'}
                                                </Button>
                                            </Box>
                                        </Box>

                                        {/* Product Info */}
                                        <CardContent
                                            sx={{
                                                p: 3,
                                                flexGrow: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                backdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            {/* Category */}
                                            {product.category && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'var(--primary-color)',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        mb: 1,
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {product.category}
                                                </Typography>
                                            )}

                                            {/* Product Title */}
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    color: '#1e293b',
                                                    fontSize: '1.1rem',
                                                    lineHeight: 1.3,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    minHeight: '2.6rem',
                                                }}
                                            >
                                                {product.title}
                                            </Typography>

                                            {/* Price */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mt: 'auto',
                                                }}
                                                className="price-tag"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: '#1e293b',
                                                        fontSize: '1.25rem',
                                                    }}
                                                >
                                                    ${product.price.toFixed(2)}
                                                </Typography>
                                                {product.originalPrice && product.originalPrice > product.price && (
                                                    <Typography
                                                        variant="body2"
                                                        component="span"
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                            color: '#94a3b8',
                                                            fontSize: '0.9rem',
                                                        }}
                                                    >
                                                        ${product.originalPrice.toFixed(2)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </CardContent>
                                    </ProductCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Pagination Dots */}
                {totalPages > 1 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1.5,
                            mt: 6,
                        }}
                    >
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationDot
                                key={index}
                                active={Math.floor(currentIndex / productsPerPage) === index}
                                onClick={() => handleDotClick(index * productsPerPage)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* Loading State */}
                {(isAddingToCart || isUpdatingCart) && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            backdropFilter: 'blur(2px)',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <CircularProgress
                                size={40}
                                sx={{
                                    color: '#3b82f6',
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#64748b',
                                    fontWeight: 500,
                                }}
                            >
                                Adding to cart...
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default SimilarProducts;