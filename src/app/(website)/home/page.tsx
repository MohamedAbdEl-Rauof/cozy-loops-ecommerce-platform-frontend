"use client"
import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Container,
    Fade
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
}

interface ProductsData {
    title: string;
    description: string;
    productsData: Product[];
}

interface ProductsOfCategoryProps {
    Products: ProductsData; // Changed from Products[] to ProductsData
    onAddToCart: (productId: string) => void;
}

const ProductsOfCategory: React.FC<ProductsOfCategoryProps> = ({
    Products,
    onAddToCart
}) => {

    const handleAddToCart = (productId: string) => {
        if (onAddToCart) {
            onAddToCart(productId);
        } else {
            // Placeholder for future implementation
            console.log(`Adding product ${productId} to cart`);
        }
    };

    return (
        <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
            <Container maxWidth="lg">
                {/* Title and Description Section */}
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

                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            color: '#6c757d',
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', md: '1.125rem' }
                        }}
                    >
                        {Products.description}
                    </Typography>
                </Box>

                {/* Products Grid */}
                <Grid container spacing={3}>
                    {Products.productsData.map((product, index) => (
                        <Grid size={{xs:12 , md:4 , sm:6}} key={product.id}>
                            <Fade in={true} timeout={300 + index * 100}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                        },
                                        borderRadius: 2,
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Product Image with Add Button */}
                                    <Box sx={{ position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={product.image}
                                            alt={product.title}
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.05)'
                                                }
                                            }}
                                        />

                                        {/* Add to Cart Button */}
                                        <IconButton
                                            onClick={() => handleAddToCart(product.id)}
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                right: 12,
                                                bgcolor: 'var(--primary-color, #e74c3c)',
                                                color: 'white',
                                                width: 40,
                                                height: 40,
                                                '&:hover': {
                                                    bgcolor: 'var(--primary-color-dark, #c0392b)',
                                                    transform: 'scale(1.1)',
                                                },
                                                transition: 'all 0.2s ease-in-out',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                            }}
                                            aria-label={`Add ${product.title} to cart`}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Box>

                                    {/* Product Content */}
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            p: 3
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                mb: 1,
                                                fontWeight: 600,
                                                color: '#2c3e50',
                                                fontSize: '1.125rem'
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#6c757d',
                                                mb: 2,
                                                flexGrow: 1,
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {product.description}
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'var(--primary-color, #e74c3c)',
                                                fontWeight: 700,
                                                fontSize: '1.25rem'
                                            }}
                                        >
                                            ${product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>

                {/* Empty State */}
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