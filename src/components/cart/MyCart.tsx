"use client"
import React, { useState } from 'react';
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
    Paper,
    IconButton,
    Button,
    Card,
    CardContent,
    Divider,
    useTheme,
    useMediaQuery,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
    '& .MuiTableCell-head': {
        color: 'white',
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

const QuantityBox = styled(Box)(({ theme }) => ({
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

const QuantityButton = styled(IconButton)(({ theme }) => ({
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

const CartTotalCard = styled(Card)(({ theme }) => ({
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 112, 67, 0.2)',
    boxShadow: '0 8px 32px rgba(255, 112, 67, 0.15)',
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
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

// Interfaces
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface MyCartProps {
    items?: CartItem[];
    onUpdateQuantity?: (itemId: number, newQuantity: number) => void;
    onRemoveItem?: (itemId: number) => void;
    onProceedToCheckout?: () => void;
    shippingCost?: number;
}

const MyCart: React.FC<MyCartProps> = ({
    items = [],
    onUpdateQuantity,
    onRemoveItem,
    onProceedToCheckout,
    shippingCost = 0
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [cartItems, setCartItems] = useState<CartItem[]>(items);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;

    // Handle quantity changes
    const handleQuantityChange = (itemId: number, change: number) => {
        setCartItems(prevItems => 
            prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    onUpdateQuantity?.(itemId, newQuantity);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    // Handle item removal
    const handleRemoveItem = (itemId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        onRemoveItem?.(itemId);
    };

    // Handle checkout
    const handleProceedToCheckout = () => {
        onProceedToCheckout?.();
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
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontWeight: 800,
                    mb: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Shopping Cart
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
                {/* Cart Items Table */}
                <Box sx={{ flex: 1 }}>
                    <StyledTableContainer component={Paper}>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Subtotal</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <StyledTableRow key={item.id}>
                                        {/* Product */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    src={item.image}
                                                    alt={item.name}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: '12px',
                                                        border: '2px solid rgba(255, 112, 67, 0.2)',
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: '#2c3e50',
                                                        fontSize: '1rem',
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>

                                        {/* Price */}
                                        <TableCell align="center">
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#ff7043',
                                                }}
                                            >
                                                {item.price} EGP
                                            </Typography>
                                        </TableCell>

                                        {/* Quantity */}
                                        <TableCell align="center">
                                            <QuantityBox>
                                                <QuantityButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
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
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>
                                                
                                                <QuantityButton
                                                    size="small"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </QuantityButton>
                                            </QuantityBox>
                                        </TableCell>

                                        {/* Subtotal */}
                                        <TableCell align="center">
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#2c3e50',
                                                    fontSize: '1.1rem',
                                                }}
                                            >
                                                {(item.price * item.quantity).toFixed(2)} EGP
                                            </Typography>
                                        </TableCell>

                                        {/* Action */}
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => handleRemoveItem(item.id)}
                                                sx={{
                                                    color: '#ff4444',
                                                    backgroundColor: 'rgba(255, 68, 68, 0.1)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 68, 68, 0.2)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </Box>

                {/* Cart Totals */}
                <Box sx={{ width: { xs: '100%', lg: '400px' } }}>
                    <CartTotalCard>
                        <CardContent sx={{ p: 3 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    color: '#2c3e50',
                                    textAlign: 'center',
                                }}
                            >
                                Cart Totals
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                {/* Subtotal */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                        py: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#6c757d',
                                        }}
                                    >
                                        Subtotal:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#2c3e50',
                                        }}
                                    >
                                        {subtotal.toFixed(2)} EGP
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 112, 67, 0.2)' }} />

                                {/* Shipping */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mb: 2,
                                        py: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#6c757d',
                                        }}
                                    >
                                        Shipping:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: shippingCost === 0 ? '#28a745' : '#2c3e50',
                                        }}
                                    >
                                        {shippingCost === 0 ? 'Free' : `${shippingCost.toFixed(2)} EGP`}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 112, 67, 0.2)' }} />

                                {/* Total */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        py: 2,
                                        px: 2,
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(255, 112, 67, 0.1)',
                                        border: '1px solid rgba(255, 112, 67, 0.3)',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#2c3e50',
                                        }}
                                    >
                                        Total:
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: '#ff7043',
                                        }}
                                    >
                                        {total.toFixed(2)} EGP
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Checkout Button */}
                            <CheckoutButton
                                fullWidth
                                onClick={handleProceedToCheckout}
                                startIcon={<ShoppingCartIcon />}
                            >
                                Proceed to Checkout
                            </CheckoutButton>
                        </CardContent>
                    </CartTotalCard>
                </Box>
            </Box>
        </Container>
    );
};

export default MyCart;