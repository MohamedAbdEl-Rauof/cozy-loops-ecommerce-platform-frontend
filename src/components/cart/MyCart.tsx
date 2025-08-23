"use client"
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Card,
    CardContent,
    Divider,
    Avatar,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { MyCartProps } from '@/types/cart';
import { useRouter } from 'next/navigation';

const StyledTableContainer = styled(TableContainer)(() => ({
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
}));

const StyledTableHead = styled(TableHead)(() => ({
    background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
    '& .MuiTableCell-head': {
        color: 'white',
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    }
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(255, 112, 67, 0.02)',
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 112, 67, 0.05)',
        transform: 'scale(1.001)',
        transition: 'all 0.2s ease',
    },
    '& .MuiTableCell-root': {
        borderBottom: '1px solid rgba(255, 112, 67, 0.1)',
        padding: '16px',
    }
}));

const QuantityBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 112, 67, 0.05)',
    border: '1px solid rgba(255, 112, 67, 0.2)',
    minWidth: '120px',
}));

const QuantityButton = styled(IconButton)(() => ({
    width: '32px',
    height: '32px',
    backgroundColor: '#ff7043',
    color: 'white',
    '&:hover': {
        backgroundColor: '#ff5722',
        transform: 'scale(1.1)',
    },
    '&:disabled': {
        backgroundColor: '#ccc',
        color: '#666',
    },
    transition: 'all 0.2s ease',
}));

const CartTotalCard = styled(Card)(() => ({
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 112, 67, 0.2)',
    boxShadow: '0 8px 32px rgba(255, 112, 67, 0.15)',
}));

const CheckoutButton = styled(Button)(() => ({
    borderRadius: '25px',
    padding: '16px 32px',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '1.1rem',
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

const MyCart: React.FC<MyCartProps> = ({
    items = [],
    onUpdateQuantity,
    onRemoveItem,
    onProceedToCheckout,
    shippingCost = 0,
    isCheckoutLoading
}) => {
    const cartItems = items;
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalShippingCost = subtotal >= 500 ? 0 : shippingCost;
    const total = subtotal + finalShippingCost;
    const router = useRouter();

    const handleQuantityChange = (itemId: string, change: number) => {
        const currentItem = cartItems.find(item => item.id === itemId);
        if (currentItem) {
            const newQuantity = Math.max(1, currentItem.quantity + change);
            onUpdateQuantity?.(itemId, newQuantity);
        }
    };

    const handleRemoveItem = (itemId: string) => {
        onRemoveItem?.(itemId);
    };

    const handleProceedToCheckout = () => {
        onProceedToCheckout?.();
    };

    const handleStartShopping = () => {
        router.push('/categories');
    };

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 4,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                >
                    <ShoppingCartIcon
                        sx={{
                            fontSize: 80,
                            color: '#ff7043',
                            mb: 2,
                            opacity: 0.7,
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: '#2c3e50',
                            mb: 2,
                        }}
                    >
                        Your Cart is Empty
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6c757d',
                            mb: 4,
                        }}
                    >
                        Add some products to your cart to get started.
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
            </Container>
        );
    }

    return (
        <Container maxWidth={false} sx={{ py: { xs: 2, sm: 3, md: 4 }, maxWidth: '1350px', px: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontWeight: 800,
                    mb: { xs: 3, sm: 4 },
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '3rem' },
                }}
            >
                Shopping Cart
            </Typography>

            <Box sx={{
                display: 'flex',
                gap: { xs: 3, md: 4 },
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'stretch', lg: 'flex-start' }
            }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        {cartItems.map((item) => (
                            <Card
                                key={item.id}
                                sx={{
                                    mb: 2,
                                    borderRadius: '16px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    border: '1px solid rgba(255, 112, 67, 0.1)',
                                    overflow: 'hidden',
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                        <Avatar
                                            src={item.image}
                                            alt={item.name}
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '12px',
                                                border: '2px solid rgba(255, 112, 67, 0.2)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#2c3e50',
                                                    fontSize: '1rem',
                                                    mb: 1,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#ff7043',
                                                    fontSize: '1.1rem',
                                                }}
                                            >
                                                {item.price} EGP
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            onClick={() => handleRemoveItem(item.id)}
                                            sx={{
                                                color: '#ff4444',
                                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                                width: 36,
                                                height: 36,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 68, 68, 0.2)',
                                                },
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}>
                                        <QuantityBox sx={{ minWidth: '100px' }}>
                                            <QuantityButton
                                                size="small"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                                sx={{ width: '28px', height: '28px' }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </QuantityButton>

                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#2c3e50',
                                                    minWidth: '20px',
                                                    textAlign: 'center',
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>

                                            <QuantityButton
                                                size="small"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                sx={{ width: '28px', height: '28px' }}
                                            >
                                                <AddIcon fontSize="small" />
                                            </QuantityButton>
                                        </QuantityBox>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: '#2c3e50',
                                                fontSize: '1rem',
                                            }}
                                        >
                                            {(item.price * item.quantity).toFixed(2)} EGP
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <StyledTableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: { md: '0.9rem', lg: '1rem' } }}>Product</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { md: '0.9rem', lg: '1rem' } }}>Price</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { md: '0.9rem', lg: '1rem' } }}>Quantity</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { md: '0.9rem', lg: '1rem' } }}>Subtotal</TableCell>
                                    <TableCell align="center" sx={{ fontSize: { md: '0.9rem', lg: '1rem' } }}>Action</TableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <StyledTableRow key={item.id}>
                                        <TableCell sx={{ padding: { md: '12px', lg: '16px' } }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 1.5, lg: 2 } }}>
                                                <Avatar
                                                    src={item.image}
                                                    alt={item.name}
                                                    sx={{
                                                        width: { md: 50, lg: 60 },
                                                        height: { md: 50, lg: 60 },
                                                        borderRadius: '12px',
                                                        border: '2px solid rgba(255, 112, 67, 0.2)',
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: '#2c3e50',
                                                        fontSize: { md: '0.9rem', lg: '1rem' },
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        maxWidth: { md: '150px', lg: '200px' },
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#ff7043',
                                                    fontSize: { md: '0.9rem', lg: '1rem' },
                                                }}
                                            >
                                                {item.price} EGP
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <QuantityBox sx={{ minWidth: { md: '100px', lg: '120px' } }}>
                                                <QuantityButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                    sx={{
                                                        width: { md: '28px', lg: '32px' },
                                                        height: { md: '28px', lg: '32px' }
                                                    }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </QuantityButton>

                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: '#2c3e50',
                                                        minWidth: '24px',
                                                        textAlign: 'center',
                                                        fontSize: { md: '0.9rem', lg: '1rem' },
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>

                                                <QuantityButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    sx={{
                                                        width: { md: '28px', lg: '32px' },
                                                        height: { md: '28px', lg: '32px' }
                                                    }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </QuantityButton>
                                            </QuantityBox>
                                        </TableCell>

                                        <TableCell align="center">
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#2c3e50',
                                                    fontSize: { md: '1rem', lg: '1.1rem' },
                                                }}
                                            >
                                                {(item.price * item.quantity).toFixed(2)} EGP
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleRemoveItem(item.id)}
                                                sx={{
                                                    color: '#ff4444',
                                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                                    width: { md: 36, lg: 40 },
                                                    height: { md: 36, lg: 40 },

                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 68, 68, 0.2)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </Box>

                <Box sx={{
                    width: { xs: '100%', lg: '400px' },
                    position: { lg: 'sticky' },
                    top: { lg: '20px' },
                    alignSelf: { lg: 'flex-start' }
                }}>
                    <CartTotalCard>
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: { xs: 2, sm: 3 },
                                    color: '#2c3e50',
                                    textAlign: 'center',
                                    fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                }}
                            >
                                Cart Totals
                            </Typography>

                            <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                        py: 1,
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#6c757d',
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                        }}
                                    >
                                        Subtotal:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#2c3e50',
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                        }}
                                    >
                                        {subtotal.toFixed(2)} EGP
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 112, 67, 0.2)' }} />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                        py: 1,
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#6c757d',
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                        }}
                                    >
                                        Shipping:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: shippingCost === 0 ? '#28a745' : '#2c3e50',
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                        }}
                                    >
                                        {subtotal >= 500 ? 'Free' : `${shippingCost.toFixed(2)} EGP`}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 112, 67, 0.2)' }} />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        py: { xs: 1.5, sm: 2 },
                                        px: { xs: 1.5, sm: 2 },
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(255, 112, 67, 0.1)',
                                        border: '1px solid rgba(255, 112, 67, 0.3)',
                                        flexWrap: 'wrap',
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#2c3e50',
                                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                        }}
                                    >
                                        Total:
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#ff7043',
                                            fontSize: { xs: '1.3rem', sm: '1.5rem' },
                                        }}
                                    >
                                        {total.toFixed(2)} EGP
                                    </Typography>
                                </Box>
                            </Box>

                            <CheckoutButton
                                fullWidth
                                onClick={handleProceedToCheckout}
                                startIcon={isCheckoutLoading ? <CircularProgress size={20} color="inherit" /> : <ShoppingCartIcon />}
                                disabled={isCheckoutLoading}
                                sx={{
                                    py: { xs: 1.5, sm: 2 },
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    borderRadius: { xs: '20px', sm: '25px' },
                                }}
                            >
                                {isCheckoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                            </CheckoutButton>
                        </CardContent>
                    </CartTotalCard>
                </Box>
            </Box>
        </Container>
    );
};

export default MyCart;