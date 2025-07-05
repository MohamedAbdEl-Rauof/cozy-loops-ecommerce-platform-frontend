"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Grid,
    Container,
    Chip,
    Tooltip,
    Fade,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Delete as DeleteIcon,
    ShoppingCart as ShoppingCartIcon,
    Visibility as VisibilityIcon,
    ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
        '& .product-image': {
            transform: 'scale(1.05)',
        },
        '& .action-buttons': {
            opacity: 1,
            transform: 'translateY(0)',
        }
    }
}));

const ProductImage = styled(CardMedia)({
    height: 250,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
});

const DeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
    color: 'white',
    zIndex: 2,
    width: 40,
    height: 40,
    '&:hover': {
        backgroundColor: '#d32f2f',
        transform: 'scale(1.1)',
    },
    transition: 'all 0.3s ease',
}));

const CartButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 112, 67, 0.9)',
    color: 'white',
    zIndex: 2,
    width: 48,
    height: 48,
    '&:hover': {
        backgroundColor: '#ff5722',
        transform: 'scale(1.1)',
    },
    transition: 'all 0.3s ease',
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2, 0),
    borderBottom: '2px solid rgba(255, 112, 67, 0.1)',
}));

const MoveAllButton = styled(Button)(({ theme }) => ({
    borderRadius: '25px',
    padding: '12px 24px',
    fontWeight: 600,
    textTransform: 'none',
    background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
    color: 'white',
    boxShadow: '0 8px 25px rgba(255, 112, 67, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        background: 'linear-gradient(135deg, #ff5722 0%, #e64a19 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(255, 112, 67, 0.6)',
    }
}));

const ViewProductButton = styled(Button)(({ theme }) => ({
    borderRadius: '20px',
    padding: '8px 16px',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '0.875rem',
    border: '1px solid #ff7043',
    color: '#ff7043',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 112, 67, 0.1)',
        borderColor: '#ff5722',
        color: '#ff5722',
    }
}));

interface WishlistItem {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface WishlistCardProps {
    items?: WishlistItem[];
    onDeleteItem?: (itemId: number) => void;
    onAddToCart?: (itemId: number) => void;
    onViewProduct?: (itemId: number) => void;
    onMoveAllToCart?: () => void;
    onStartShopping?: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
    items = [],
    onDeleteItem,
    onAddToCart,
    onViewProduct,
    onMoveAllToCart,
    onStartShopping
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(
        items.map(item => ({ ...item, inStock: item.inStock ?? true }))
    );

    const handleDeleteItem = (itemId: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
        onDeleteItem?.(itemId);
    };

    const handleAddToCart = (itemId: number) => {
        onAddToCart?.(itemId);
    };

    const handleViewProduct = (itemId: number) => {
        onViewProduct?.(itemId);
    };

    const handleMoveAllToCart = () => {
        onMoveAllToCart?.();
    };

    const handleStartShopping = () => {
        onStartShopping?.();
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: {
                    xs: '100%',
                    sm: '100%',
                    md: '1200px',
                    lg: '1400px',
                    xl: '1600px'
                },
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 3, md: 4 },
            }}
        >
            {/* Header Section */}
            <HeaderContainer>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '1.75rem', md: '2.25rem' },
                            background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Wishlist
                    </Typography>
                    <Chip
                        label={wishlistItems.length}
                        sx={{
                            backgroundColor: '#ff7043',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            height: '32px',
                            animation: `${pulse} 2s infinite`,
                        }}
                    />
                </Box>

                {wishlistItems.length > 0 && (
                    <MoveAllButton
                        startIcon={<ShoppingBagIcon />}
                        onClick={handleMoveAllToCart}
                        sx={{
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            padding: { xs: '8px 16px', md: '12px 24px' },
                        }}
                    >
                        Move All to Cart
                    </MoveAllButton>
                )}
            </HeaderContainer>

            {/* Wishlist Items Grid */}
            {wishlistItems.length > 0 ? (
                <Grid container spacing={3}>
                    {wishlistItems.map((item, index) => (
                        <Grid size={{xs:12, sm:6, md:4, lg:4}} key={item.id}>
                            <Fade
                                in={true}
                                timeout={800}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <StyledCard>
                                    {/* Product Image with Action Buttons */}
                                    <Box sx={{ position: 'relative' }}>
                                        <ProductImage
                                            className="product-image"
                                            image={item.image}
                                            title={item.title}
                                        />

                                        {/* Delete Button - Top Right */}
                                            <Tooltip title="Remove from Wishlist">
                                            <DeleteButton
                                                onClick={() => handleDeleteItem(item.id)}
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </DeleteButton>
                                        </Tooltip>

                                        {/* Add to Cart Button - Bottom Left */}
                                        <Tooltip title="Add to Cart">
                                            <CartButton
                                                onClick={() => handleAddToCart(item.id)}
                                                sx={{
                                                    opacity: 1,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <ShoppingCartIcon />
                                            </CartButton>
                                        </Tooltip>

                                    </Box>

                                    {/* Product Details */}
                                    <CardContent sx={{ p: 3 }}>
                                        {/* Product Title */}
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '1.1rem',
                                                color: '#2c3e50',
                                                mb: 2,
                                                lineHeight: 1.3,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                minHeight: '2.6rem',
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        {/* Bottom Section: View Product Button and Price */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: 2,
                                            }}
                                        >
                                            {/* View Product Button */}
                                            <ViewProductButton
                                                startIcon={<VisibilityIcon />}
                                                onClick={() => handleViewProduct(item.id)}
                                                size="small"
                                                sx={{
                                                    flex: 1,
                                                    maxWidth: '140px',
                                                }}
                                            >
                                                View Product
                                            </ViewProductButton>

                                            {/* Price */}
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: '1.25rem',
                                                        color: '#ff7043',
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    {item.price} EGP
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                // Empty Wishlist State
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 4,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        animation: `${slideInUp} 0.8s ease-out`,
                    }}
                >
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            opacity: 0.8,
                        }}
                    >
                        <ShoppingBagIcon
                            sx={{
                                fontSize: 60,
                                color: 'white',
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: '#2c3e50',
                            mb: 2,
                            fontSize: { xs: '1.5rem', md: '2rem' },
                        }}
                    >
                        Your Wishlist is Empty
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6c757d',
                            mb: 4,
                            maxWidth: '400px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        Start adding products you love to your wishlist.
                        You can save items for later and easily move them to your cart when ready.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleStartShopping}
                        sx={{
                            borderRadius: '25px',
                            padding: '12px 32px',
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '1rem',
                            background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                            color: 'white',
                            boxShadow: '0 8px 25px rgba(255, 112, 67, 0.4)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #ff5722 0%, #e64a19 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 35px rgba(255, 112, 67, 0.6)',
                            }
                        }}
                    >
                        Start Shopping
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default WishlistCard;