"use client"
import {
    Edit,
    Delete,
    Add,
    CreditCard,
    Security,
    CalendarToday,
    Person,
} from '@mui/icons-material';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    Chip,
    IconButton,
    Alert,
    InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const PaymentCard = styled(Card)(() => ({
    marginBottom: '16px',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
        borderColor: '#FF7043',
        boxShadow: '0 4px 12px rgba(255, 112, 67, 0.15)',
    },
}));

const DefaultChip = styled(Chip)(() => ({
    backgroundColor: '#FF7043',
    color: 'white',
    fontWeight: 600,
}));

const SaveButton = styled(Button)(() => ({
    backgroundColor: '#FF7043',
    color: 'white',
    padding: '12px 30px',
    '&:hover': {
        backgroundColor: '#FF5722',
    },
}));

const CardIcon = styled(Box)(() => ({
    width: 40,
    height: 25,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
}));

interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'amex' | 'discover';
    cardNumber: string;
    expiryDate: string;
    cardholderName: string;
    isDefault: boolean;
}

const PaymentSection: React.FC = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        {
            id: '1',
            type: 'visa',
            cardNumber: '**** **** **** 1234',
            expiryDate: '12/25',
            cardholderName: 'John Doe',
            isDefault: true,
        },
        {
            id: '2',
            type: 'amex',
            cardNumber: '**** **** **** 5678',
            expiryDate: '08/26',
            cardholderName: 'John Doe',
            isDefault: false,
        },
    ]);

    const [editingCard, setEditingCard] = useState<PaymentMethod | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
    });

    const getCardType = (cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'discover' => {
        const number = cardNumber.replace(/\s/g, '');
        if (number.startsWith('4')) return 'visa';
        if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
        if (number.startsWith('3')) return 'amex';
        return 'discover';
    };

    const getCardColor = (type: string) => {
        switch (type) {
            case 'visa': return '#1A1F71';
            case 'mastercard': return '#EB001B';
            case 'amex': return '#006FCF';
            case 'discover': return '#FF6000';
            default: return '#666';
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleInputChange = (field: string, value: string) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        }

        setFormData(prev => ({
            ...prev,
            [field]: formattedValue
        }));
    };

    const handleEdit = (card: PaymentMethod) => {
        setEditingCard(card);
        setFormData({
            cardNumber: card.cardNumber,
            expiryDate: card.expiryDate,
            cvv: '',
            cardholderName: card.cardholderName,
        });
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        setPaymentMethods(prev => prev.filter(card => card.id !== id));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleSave = () => {
        const cardType = getCardType(formData.cardNumber);

        if (editingCard) {
            setPaymentMethods(prev => prev.map(card =>
                card.id === editingCard.id
                    ? {
                        ...card,
                        cardNumber: formData.cardNumber,
                        expiryDate: formData.expiryDate,
                        cardholderName: formData.cardholderName,
                        type: cardType,
                    }
                    : card
            ));
        } else {
            const newCard: PaymentMethod = {
                id: Date.now().toString(),
                type: cardType,
                cardNumber: formData.cardNumber,
                expiryDate: formData.expiryDate,
                cardholderName: formData.cardholderName,
                isDefault: paymentMethods.length === 0,
            };
            setPaymentMethods(prev => [...prev, newCard]);
        }

        setShowForm(false);
        setEditingCard(null);
        setFormData({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingCard(null);
        setFormData({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
        });
    };

    const setAsDefault = (id: string) => {
        setPaymentMethods(prev => prev.map(card => ({
            ...card,
            isDefault: card.id === id
        })));
    };

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 },
                mb: 3
            }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                    Payment Methods
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setShowForm(true)}
                    sx={{
                        backgroundColor: '#FF7043',
                        '&:hover': { backgroundColor: '#FF5722' },
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1, sm: 1.5 },
                        minWidth: { xs: 'auto', sm: '120px' },
                        width: { xs: '100%', sm: 'auto' }
                    }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        Add Card
                    </Box>
                    <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                        Add
                    </Box>
                </Button>
            </Box>

            {showSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Payment method updated successfully!
                </Alert>
            )}

            {showForm && (
                <Card sx={{ mb: 4, border: '2px solid #FF7043' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: '#333' }}>
                            {editingCard ? 'Edit Payment Method' : 'Add New Payment Method'}
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Card Number"
                                    value={formData.cardNumber}
                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                    variant="outlined"
                                    placeholder="1234 5678 9012 3456"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CreditCard sx={{ color: '#FF7043' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Expiry Date"
                                    value={formData.expiryDate}
                                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                    variant="outlined"
                                    placeholder="MM/YY"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarToday sx={{ color: '#FF7043' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="CVV"
                                    value={formData.cvv}
                                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                                    variant="outlined"
                                    placeholder="123"
                                    type="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Security sx={{ color: '#FF7043' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Cardholder Name"
                                    value={formData.cardholderName}
                                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                    variant="outlined"
                                    placeholder="John Doe"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person sx={{ color: '#FF7043' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{
                            mt: 3,
                            display: 'flex',
                            gap: { xs: 1, sm: 2 },
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                            <SaveButton
                                onClick={handleSave}
                                sx={{
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                    px: { xs: 2, sm: 4 },
                                    py: { xs: 1.5, sm: 1.5 },
                                    flex: { xs: 1, sm: 'none' },
                                    minWidth: { sm: '140px' }
                                }}
                            >
                                {editingCard ? 'Update Card' : 'Save Card'}
                            </SaveButton>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{
                                    borderColor: '#ccc',
                                    color: '#666',
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                    px: { xs: 2, sm: 4 },
                                    py: { xs: 1.5, sm: 1.5 },
                                    flex: { xs: 1, sm: 'none' },
                                    minWidth: { sm: '100px' }
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}

            <Grid container spacing={3}>
                {paymentMethods.map((card) => (
                    <Grid size={{ xs: 12, md: 6 }} key={card.id}>
                        <PaymentCard
                            sx={{
                                background: `linear-gradient(135deg, ${getCardColor(card.type)}15 0%, ${getCardColor(card.type)}08 100%)`,
                                borderRadius: '16px',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    background: `linear-gradient(90deg, ${getCardColor(card.type)} 0%, ${getCardColor(card.type)}80 100%)`,
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3, position: 'relative' }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    mb: 3
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <CardIcon sx={{
                                            backgroundColor: getCardColor(card.type),
                                            borderRadius: '8px',
                                            width: 50,
                                            height: 32,
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            boxShadow: `0 2px 8px ${getCardColor(card.type)}40`
                                        }}>
                                            {card.type.toUpperCase()}
                                        </CardIcon>
                                        {card.isDefault && (
                                            <DefaultChip
                                                label="Default"
                                                size="small"
                                                sx={{
                                                    background: 'linear-gradient(45deg, #FF7043 30%, #FF5722 90%)',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    boxShadow: '0 2px 4px rgba(255, 112, 67, 0.3)'
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: { xs: 0.25, sm: 0.5 },
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        p: { xs: 0.25, sm: 0.5 }
                                    }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEdit(card)}
                                            sx={{
                                                color: '#FF7043',
                                                width: { xs: 28, sm: 32 },
                                                height: { xs: 28, sm: 32 },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 112, 67, 0.1)',
                                                    transform: 'scale(1.1)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(card.id)}
                                            sx={{
                                                color: '#f44336',
                                                width: { xs: 28, sm: 32 },
                                                height: { xs: 28, sm: 32 },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                                    transform: 'scale(1.1)'
                                                },
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: 'monospace',
                                            fontSize: '1.1rem',
                                            color: '#2c3e50',
                                            letterSpacing: '1px',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {card.cardNumber}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 3,
                                    p: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#666',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            Expires
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#2c3e50',
                                                fontFamily: 'monospace'
                                            }}
                                        >
                                            {card.expiryDate}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#666',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            Cardholder
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#2c3e50',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {card.cardholderName}
                                        </Typography>
                                    </Box>
                                </Box>

                                {!card.isDefault && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => setAsDefault(card.id)}
                                        fullWidth
                                        sx={{
                                            borderColor: '#FF7043',
                                            color: '#FF7043',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            borderRadius: '12px',
                                            py: { xs: 1, sm: 1 },
                                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 112, 67, 0.1)',
                                                borderColor: '#FF5722',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 12px rgba(255, 112, 67, 0.2)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                            Set as Default
                                        </Box>
                                        <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                                            Default
                                        </Box>
                                    </Button>
                                )}

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: -20,
                                        right: -20,
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: `linear-gradient(45deg, ${getCardColor(card.type)}20, ${getCardColor(card.type)}10)`,
                                        zIndex: 0
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: -30,
                                        left: -30,
                                        width: 100,
                                        height: 100,
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${getCardColor(card.type)}15, ${getCardColor(card.type)}05)`,
                                        zIndex: 0
                                    }}
                                />
                            </CardContent>
                        </PaymentCard>
                    </Grid>
                ))}
            </Grid>

            {paymentMethods.length === 0 && !showForm && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        No payment methods saved yet
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setShowForm(true)}
                        sx={{
                            backgroundColor: '#FF7043',
                            '&:hover': { backgroundColor: '#FF5722' },
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            px: { xs: 3, sm: 4 },
                            py: { xs: 1.5, sm: 1.5 },
                            minWidth: { xs: '200px', sm: '220px' }
                        }}
                    >
                        Add Your First Card
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default PaymentSection;