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
import React from 'react';

import { useAddToCart, useCart, useUpdateCart } from '@/hooks/useCart';
import { ProductsOfCategoryProps } from '@/types/category';

const ProductsOfCategory: React.FC<ProductsOfCategoryProps> = ({
    Products,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const router = useRouter();
    const { addToCart, isPending: isAddingToCart } = useAddToCart();
    const { updateCart, isPending: isUpdatingCart } = useUpdateCart();
    const { data: cartData } = useCart();

    const handleAddToCart = (productId: string) => {
        if (isAddingToCart || isUpdatingCart) return;

        const product = Products.productsData.find(item => item.id === productId);

        if (product) {
            const existingCartItem = cartData?.items?.find((item: any) => item.product._id === productId);
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
        <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        maxWidth: '800px',
                        mx: 'auto'
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            color: '#2c3e50',
                            fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                    >
                        {Products.title}
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {displayedProducts.map((product, index) => (
                        <Grid size={{ xs: 12, md: 4, sm: 6 }} key={product.id}>
                            <Fade in={true} timeout={300 + index * 100}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                            '& .product-image': {
                                                transform: 'scale(1.08)',
                                            },
                                            '& .add-to-cart-btn': {
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)',
                                            }
                                        }
                                    }}
                                >
                                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                        <CardMedia
                                            component="img"
                                            height="280"
                                            image={product.image}
                                            alt={product.title}
                                            className="product-image"
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            }}
                                        />

                                        <IconButton
                                            onClick={() => handleAddToCart(product.id)}
                                            className="add-to-cart-btn"
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                bgcolor: 'var(--primary-color, #e74c3c)',
                                                color: 'white',
                                                width: 48,
                                                height: 48,
                                                '&:hover': {
                                                    bgcolor: 'var(--primary-color-dark, #c0392b)',
                                                },
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                                                '&:active': {
                                                    transform: 'scale(0.95)',
                                                }
                                            }}
                                            aria-label={`Add ${product.title} to cart`}
                                        >
                                            <AddIcon sx={{ fontSize: 24 }} />
                                        </IconButton>
                                    </Box>

                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            p: 3,
                                            gap: 2,
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    mb: 1.5,
                                                    fontWeight: 700,
                                                    color: '#2c3e50',
                                                    fontSize: '1.125rem',
                                                    lineHeight: 1.3,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {product.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                onClick={() => handleOnClick(product.slug)}
                                                sx={{
                                                    fontWeight: 500,
                                                    color: 'var(--primary-color, #e74c3c)',
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    display: 'inline-block',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        color: 'var(--primary-color-dark, #c0392b)',
                                                        transform: 'translateX(4px)',
                                                    },
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        width: '0',
                                                        height: '2px',
                                                        bottom: '-2px',
                                                        left: '0',
                                                        backgroundColor: 'var(--primary-color, #e74c3c)',
                                                        transition: 'width 0.3s ease',
                                                    },
                                                    '&:hover::after': {
                                                        width: '100%',
                                                    }
                                                }}
                                            >
                                                View Details →
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center',
                                                minWidth: 'fit-content',
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    color: 'var(--primary-color, #e74c3c)',
                                                    fontWeight: 800,
                                                    fontSize: '1.5rem',
                                                    textShadow: '0 2px 4px rgba(231, 76, 60, 0.1)',
                                                }}
                                            >
                                                ${product.price}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {hasMoreProducts && (
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Box
                            component="button"
                            onClick={() => setShowAll(!showAll)}
                            sx={{
                                px: 4,
                                py: 2,
                                bgcolor: 'var(--primary-color, #e74c3c)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 3,
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                                '&:hover': {
                                    bgcolor: 'var(--primary-color-dark, #c0392b)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                }
                            }}
                        >
                            {showAll ? 'View Less' : `View More`}
                        </Box>
                    </Box>
                )}

                {Products.productsData.length === 0 && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            color: '#6c757d'
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            No products found in this category
                        </Typography>
                        <Typography variant="body1">
                            Check back soon for new arrivals!
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default ProductsOfCategory;