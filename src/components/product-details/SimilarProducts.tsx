"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    CardMedia,
    IconButton,
    Container,
    Fade,
    Chip,
    Rating,
    Button,
    Tooltip,
    Badge
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { styled, keyframes } from '@mui/material/styles';

// Enhanced animations
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

const AnimatedSection = styled(Box)(({ theme }) => ({
    opacity: 0,
    transform: 'translateY(50px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.animate-in': {
        opacity: 1,
        transform: 'translateY(0)',
        animation: `${slideInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
    },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
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

const ProductCard = styled(Box)(({ theme }) => ({
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

const ActionButton = styled(IconButton)(({ theme }) => ({
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

const PaginationDot = styled(Box)(({ theme, active }: { theme?: any, active: boolean }) => ({
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

const GradientOverlay = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
});

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
}

interface ProductsData {
    title: string;
    productsData: Product[];
}

interface SimilarProductsProps {
    Products: ProductsData;
    onAddToCart: (productId: string) => void;
    onAddToWishlist?: (productId: string) => void;
    onQuickView?: (productId: string) => void;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
    Products,
    onAddToCart,
    onAddToWishlist,
    onQuickView
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
    const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const productsPerPage = 3;
    const totalProducts = Products.productsData.length;
    const maxIndex = Math.max(0, totalProducts - productsPerPage);

    const handleAddToCart = (productId: string) => {
        if (onAddToCart) {
            onAddToCart(productId);
        }
    };

    const handleWishlistToggle = (productId: string) => {
        setWishlistItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });

        if (onAddToWishlist) {
            onAddToWishlist(productId);
        }
    };

    const handleQuickView = (productId: string) => {
        if (onQuickView) {
            onQuickView(productId);
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

    const triggerProductAnimations = () => {
        const currentProducts = getCurrentProducts();
        currentProducts.forEach((_, index) => {
            setTimeout(() => {
                setVisibleProducts(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                });
            }, index * 200);
        });
    };

    const getCurrentProducts = () => {
        return Products.productsData.slice(currentIndex, currentIndex + productsPerPage);
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
                if(entry.isIntersecting) {
                    setIsVisible(true);
                    triggerProductAnimations();
                }
            },
          
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [currentIndex]);

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
                py: { xs: 4, md: 8 },
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.3,
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
                {/* Enhanced Title Section */}
                <AnimatedSection
                    className={isVisible ? 'animate-in' : ''}
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 6, md: 8 },
                        maxWidth: '800px',
                        mx: 'auto'
                    }}
                >
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 3,
                                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                                lineHeight: 1.1,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '80px',
                                    height: '4px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '2px',
                                }
                            }}
                        >
                            {Products.title}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6c757d',
                            fontSize: '1.1rem',
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Discover handpicked products that complement your style and preferences
                    </Typography>
                </AnimatedSection>

                {/* Enhanced Products Carousel */}
                <Box sx={{ position: 'relative', overflow: 'visible' }}>
                    {/* Enhanced Navigation Arrows */}
                    {totalProducts > productsPerPage && (
                        <>
                            <NavigationButton
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                sx={{
                                    left: { xs: -15, sm: -25, md: -35 },
                                }}
                                aria-label="Previous products"
                            >
                                <ArrowBackIosIcon sx={{ fontSize: 24, ml: 0.5 }} />
                            </NavigationButton>

                            <NavigationButton
                                onClick={handleNext}
                                disabled={currentIndex >= maxIndex}
                                sx={{
                                    right: { xs: -15, sm: -25, md: -35 },
                                }}
                                aria-label="Next products"
                            >
                                <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
                            </NavigationButton>
                        </>
                    )}

                    {/* Enhanced Products Grid */}
                    <Grid
                        container
                        spacing={{ xs: 3, sm: 4, md: 6 }}
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
                                    timeout={800}
                                    style={{
                                        transitionDelay: `${index * 200}ms`
                                    }}
                                >
                                    <ProductCard
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        sx={{
                                            maxWidth: currentProducts.length === 1 ? '450px' : 'none',
                                            mx: currentProducts.length === 1 ? 'auto' : 'initial',
                                        }}
                                    >
                                        {/* Enhanced Product Image Section */}
                                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                            {/* Floating Badges */}
                                            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                                                {product.isNew && (
                                                    <Chip
                                                        label="NEW"
                                                        className="floating-badge"
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                                            color: 'white',
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            height: 28,
                                                            mb: 1,
                                                            boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)',
                                                        }}
                                                    />
                                                )}
                                                {product.discount && (
                                                    <Chip
                                                        label={`-${product.discount}%`}
                                                        className="floating-badge"
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                                            color: 'white',
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            height: 28,
                                                            boxShadow: '0 4px 15px rgba(250, 112, 154, 0.4)',
                                                        }}
                                                    />
                                                )}
                                            </Box>

                                            <CardMedia
                                                component="img"
                                                height="320"
                                                image={product.image}
                                                alt={product.title}
                                                className="product-image"
                                                sx={{
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    filter: hoveredProduct === product.id ? 'brightness(1.1)' : 'brightness(1)',
                                                }}
                                            />

                                            <GradientOverlay
                                                sx={{
                                                    opacity: hoveredProduct === product.id ? 1 : 0,
                                                }}
                                            />

                                            {/* Enhanced Action Buttons */}
                                            <Box
                                                className="action-buttons"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 16,
                                                    right: 16,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1,
                                                    opacity: 0,
                                                    transform: 'translateY(-20px)',
                                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    zIndex: 2,
                                                }}
                                            >
                                                <Tooltip title="Add to Wishlist" placement="left">
                                                    <ActionButton
                                                        onClick={() => handleWishlistToggle(product.id)}
                                                        sx={{
                                                            color: wishlistItems.has(product.id) ? '#e74c3c' : '#6c757d',
                                                            '&:hover': {
                                                                backgroundColor: wishlistItems.has(product.id) ? 'rgba(231, 76, 60, 0.1)' : 'rgba(255, 255, 255, 0.95)',
                                                                color: wishlistItems.has(product.id) ? '#e74c3c' : '#6c757d',
                                                            }
                                                        }}
                                                    >
                                                        {wishlistItems.has(product.id) ?
                                                            <FavoriteIcon sx={{ fontSize: 20 }} /> :
                                                            <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                                                        }
                                                    </ActionButton>
                                                </Tooltip>

                                                <Tooltip title="Quick View" placement="left">
                                                    <ActionButton
                                                        onClick={() => handleQuickView(product.id)}
                                                        sx={{
                                                            color: '#6c757d',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(103, 126, 234, 0.1)',
                                                                color: '#677eea',
                                                            }
                                                        }}
                                                    >
                                                        <VisibilityIcon sx={{ fontSize: 20 }} />
                                                    </ActionButton>
                                                </Tooltip>
                                            </Box>

                                            {/* Enhanced Quick Add to Cart Button */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 16,
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    opacity: hoveredProduct === product.id ? 1 : 0,
                                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    zIndex: 2,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<ShoppingCartIcon />}
                                                    onClick={() => handleAddToCart(product.id)}
                                                    sx={{
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        color: 'white',
                                                        borderRadius: '25px',
                                                        px: 3,
                                                        py: 1.5,
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem',
                                                        textTransform: 'none',
                                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(135deg, #5a67d8 0%, #667eea 100%)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
                                                        }
                                                    }}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Box>
                                        </Box>

                                        {/* Enhanced Product Details */}
                                        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            {/* Category Tag */}
                                            {product.category && (
                                                <Chip
                                                    label={product.category}
                                                    size="small"
                                                    sx={{
                                                        alignSelf: 'flex-start',
                                                        mb: 2,
                                                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                                        color: '#667eea',
                                                        fontWeight: 600,
                                                        fontSize: '0.75rem',
                                                        height: 24,
                                                        '& .MuiChip-label': {
                                                            px: 1.5,
                                                        }
                                                    }}
                                                />
                                            )}

                                            {/* Product Title */}
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem',
                                                    lineHeight: 1.3,
                                                    mb: 2,
                                                    color: '#2c3e50',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    minHeight: '2.6rem',
                                                    transition: 'color 0.3s ease',
                                                    '&:hover': {
                                                        color: '#667eea',
                                                        cursor: 'pointer',
                                                    }
                                                }}
                                            >
                                                {product.title}
                                            </Typography>

                                            {/* Rating Section */}
                                            {product.rating && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Rating
                                                        value={product.rating}
                                                        precision={0.1}
                                                        readOnly
                                                        size="small"
                                                        sx={{
                                                            color: '#ffc107',
                                                            '& .MuiRating-iconEmpty': {
                                                                color: 'rgba(0,0,0,0.1)',
                                                            }
                                                        }}
                                                    />
                                                    {product.reviewCount && (
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                ml: 1,
                                                                color: '#6c757d',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            ({product.reviewCount})
                                                        </Typography>
                                                    )}
                                                </Box>
                                            )}

                                            {/* Enhanced Price Section */}
                                            <Box
                                                className="price-tag"
                                                sx={{
                                                    mt: 'auto',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                    flexWrap: 'wrap'
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 800,
                                                        fontSize: '1.4rem',
                                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                        backgroundClip: 'text',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                    }}
                                                >
                                                    ${product.price.toFixed(2)}
                                                </Typography>

                                                {product.originalPrice && product.originalPrice > product.price && (
                                                    <>
                                                        <Typography
                                                            variant="body2"
                                                            component="span"
                                                            sx={{
                                                                textDecoration: 'line-through',
                                                                color: '#6c757d',
                                                                fontSize: '1rem',
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            ${product.originalPrice.toFixed(2)}
                                                        </Typography>

                                                        <Chip
                                                            label={`Save $${(product.originalPrice - product.price).toFixed(2)}`}
                                                            size="small"
                                                            icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
                                                            sx={{
                                                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: '0.7rem',
                                                                height: 24,
                                                                '& .MuiChip-icon': {
                                                                    color: 'white',
                                                                    fontSize: 14,
                                                                },
                                                                '& .MuiChip-label': {
                                                                    px: 1,
                                                                }
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </Box>
                                        </Box>
                                    </ProductCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Enhanced Pagination Dots */}
                {totalPages > 1 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1.5,
                            mt: 6,
                            py: 2,
                        }}
                    >
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationDot
                                key={index}
                                active={Math.floor(currentIndex / productsPerPage) === index}
                                onClick={() => handleDotClick(index * productsPerPage)}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default SimilarProducts;