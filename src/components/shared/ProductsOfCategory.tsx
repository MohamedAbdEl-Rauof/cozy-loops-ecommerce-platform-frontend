"use client"
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Typography,
    Grid,
    CardMedia,
    IconButton,
    Container,
    Fade
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useAddToCart, useCart, useUpdateCart } from '@/hooks/useCart';
import { CartItem } from '@/types/cart';
import { ProductsOfCategoryProps } from '@/types/category';

import AuthDialog from '../dialogs/AuthDialog';

const ProductsOfCategory: React.FC<ProductsOfCategoryProps> = ({
    Products,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const router = useRouter();
    const { addToCart, isPending: isAddingToCart } = useAddToCart();
    const { updateCart, isPending: isUpdatingCart } = useUpdateCart();
    const { data: cartData } = useCart();
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [authDialogMessage, setAuthDialogMessage] = useState('');
    const { user } = useAuth();

    const handleAddToCart = (productId: string) => {
        if (isAddingToCart || isUpdatingCart) return;

        const product = Products.productsData.find(item => item.id === productId);

        if (product) {
            const existingCartItem = cartData?.items?.find((item: CartItem) => item.product._id === productId);
            if (!user) {
                setAuthDialogMessage('Please log in to add items to your cart.');
                setAuthDialogOpen(true);
                return;
            }

            if (existingCartItem) {
                updateCart({
                    productId: productId,
                    quantity: existingCartItem.quantity + 1,
                });
            } else {
                addToCart({
                    productId: productId,
                    quantity: 1,
                });
            }
        }
    };
    const handleOnClick = (productSlug: string) => {
        router.push(`/categories/${Products.mainSlug}/products/${productSlug}`);
    }

    const displayedProducts = showAll ? Products.productsData : Products.productsData.slice(0, 6);
    const hasMoreProducts = Products.productsData.length > 6;

    return (
        <Box
            sx={{
                py: { xs: 4, sm: 6, md: 8 },
                bgcolor: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 80%, rgba(255, 112, 67, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 229, 184, 0.05) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }
            }}
        >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: { xs: 4, sm: 6, md: 8 },
                        maxWidth: '900px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, md: 0 }
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            mb: { xs: 2, sm: 3, md: 4 },
                            fontWeight: { xs: 700, md: 800 },
                            color: '#2c3e50',
                            fontSize: {
                                xs: '1.75rem',
                                sm: '2.25rem',
                                md: '2.75rem',
                                lg: '3rem'
                            },
                            lineHeight: { xs: 1.2, md: 1.1 },
                            letterSpacing: { xs: '-0.01em', md: '-0.02em' },
                            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 4px 8px rgba(44, 62, 80, 0.1)',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: { xs: -8, md: -12 },
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: { xs: 60, md: 80 },
                                height: { xs: 3, md: 4 },
                                background: 'linear-gradient(90deg, var(--primary-color), var(--warm-color))',
                                borderRadius: 2
                            }
                        }}
                    >
                        {Products.title}
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                    sx={{
                        px: { xs: 1, sm: 2, md: 0 }
                    }}
                >
                    {displayedProducts.map((product, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                            <Fade in={true} timeout={300 + index * 100}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        borderRadius: { xs: 2, sm: 3, md: 4 },
                                        overflow: 'hidden',
                                        backgroundColor: 'white',
                                        boxShadow: {
                                            xs: '0 2px 12px rgba(0,0,0,0.06)',
                                            sm: '0 4px 20px rgba(0,0,0,0.08)',
                                            md: '0 6px 24px rgba(0,0,0,0.1)'
                                        },
                                        border: '1px solid rgba(255,255,255,0.8)',
                                        backdropFilter: 'blur(10px)',
                                        position: 'relative',
                                        '&:hover': {
                                            transform: {
                                                xs: 'translateY(-4px)',
                                                md: 'translateY(-8px)'
                                            },
                                            boxShadow: {
                                                xs: '0 8px 32px rgba(0,0,0,0.12)',
                                                md: '0 16px 48px rgba(0,0,0,0.15)'
                                            },
                                            '& .product-image': {
                                                transform: 'scale(1.08)',
                                            },
                                            '& .add-to-cart-btn': {
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 8px 24px rgba(231, 76, 60, 0.4)',
                                            },
                                            '& .product-overlay': {
                                                opacity: 1,
                                            }
                                        }
                                    }}
                                >
                                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                        <CardMedia
                                            component="img"
                                            height={280}
                                            image={product.image}
                                            alt={product.title}
                                            className="product-image"
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                height: { xs: 200, sm: 240, md: 280 }
                                            }}
                                        />

                                        {/* Gradient overlay */}
                                        <Box
                                            className="product-overlay"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                                pointerEvents: 'none'
                                            }}
                                        />

                                        <IconButton
                                            onClick={() => handleAddToCart(product.id)}
                                            className="add-to-cart-btn"
                                            disabled={isAddingToCart || isUpdatingCart}
                                            sx={{
                                                position: 'absolute',
                                                top: { xs: 12, md: 16 },
                                                right: { xs: 12, md: 16 },
                                                bgcolor: 'var(--primary-color, #e74c3c)',
                                                color: 'white',
                                                width: { xs: 40, sm: 44, md: 48 },
                                                height: { xs: 40, sm: 44, md: 48 },
                                                '&:hover': {
                                                    bgcolor: 'var(--primary-color-dark, #c0392b)',
                                                },
                                                '&:disabled': {
                                                    bgcolor: 'rgba(231, 76, 60, 0.6)',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                },
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                '&:active': {
                                                    transform: 'scale(0.95)',
                                                }
                                            }}
                                            aria-label={`Add ${product.title} to cart`}
                                        >
                                            <AddIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                                        </IconButton>

                                        {/* Price badge */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                bottom: { xs: 12, md: 16 },
                                                left: { xs: 12, md: 16 },
                                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                                backdropFilter: 'blur(10px)',
                                                borderRadius: { xs: 2, md: 3 },
                                                px: { xs: 1.5, md: 2 },
                                                py: { xs: 0.5, md: 1 },
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'var(--primary-color, #e74c3c)',
                                                    fontWeight: 800,
                                                    fontSize: {
                                                        xs: '1rem',
                                                        sm: '1.1rem',
                                                        md: '1.25rem'
                                                    },
                                                    lineHeight: 1,
                                                    textShadow: '0 2px 4px rgba(231, 76, 60, 0.1)',
                                                }}
                                            >
                                                ${product.price}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: { xs: 2, sm: 2.5, md: 3 },
                                            gap: { xs: 1, md: 1.5 },
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontWeight: { xs: 600, md: 700 },
                                                color: '#2c3e50',
                                                fontSize: {
                                                    xs: '1rem',
                                                    sm: '1.05rem',
                                                    md: '1.125rem'
                                                },
                                                lineHeight: 1.3,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                mb: { xs: 1, md: 1.5 },
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: 'var(--primary-color, #e74c3c)',
                                                }
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Box sx={{ mt: 'auto' }}>
                                            <Typography
                                                variant="body2"
                                                onClick={() => handleOnClick(product.slug)}
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'var(--primary-color, #e74c3c)',
                                                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        color: 'var(--primary-color-dark, #c0392b)',
                                                        transform: 'translateX(4px)',
                                                    },
                                                    '&::after': {
                                                        content: '"→"',
                                                        marginLeft: '4px',
                                                        transition: 'transform 0.3s ease',
                                                    },
                                                    '&:hover::after': {
                                                        transform: 'translateX(4px)',
                                                    }
                                                }}
                                            >
                                                View Details
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {hasMoreProducts && (
                    <Box sx={{ textAlign: 'center', mt: { xs: 4, sm: 6, md: 8 } }}>
                        <Fade in={true} timeout={600}>
                            <Box
                                component="button"
                                onClick={() => setShowAll(!showAll)}
                                sx={{
                                    px: { xs: 3, sm: 4, md: 6 },
                                    py: { xs: 1.5, sm: 2, md: 2.5 },
                                    bgcolor: 'var(--primary-color, #e74c3c)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: { xs: 2, md: 3 },
                                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                                    backdropFilter: 'blur(10px)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                        transition: 'left 0.5s ease',
                                    },
                                    '&:hover': {
                                        bgcolor: 'var(--primary-color-dark, #c0392b)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(231, 76, 60, 0.4)',
                                        '&::before': {
                                            left: '100%',
                                        }
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)',
                                    }
                                }}
                            >
                                {showAll ? 'Show Less Products' : `Show All ${Products.productsData.length} Products`}
                            </Box>
                        </Fade>
                    </Box>
                )}

                {Products.productsData.length === 0 && (
                    <Fade in={true} timeout={800}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: { xs: 6, sm: 8, md: 12 },
                                px: { xs: 2, sm: 3 },
                                color: '#6c757d',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,249,250,0.9) 100%)',
                                borderRadius: { xs: 3, md: 4 },
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                                mx: { xs: 1, sm: 2, md: 0 }
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: { xs: 2, md: 3 },
                                    fontWeight: 600,
                                    color: '#495057',
                                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                                }}
                            >
                                No Products Found
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.6,
                                    maxWidth: '400px',
                                    mx: 'auto'
                                }}
                            >
                                We're working hard to bring you amazing products. Check back soon for new arrivals in this category!
                            </Typography>
                        </Box>
                    </Fade>
                )}
            </Container>

            <AuthDialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                title="Login Required"
                message={authDialogMessage}
            />
        </Box>
    );
};

export default ProductsOfCategory;