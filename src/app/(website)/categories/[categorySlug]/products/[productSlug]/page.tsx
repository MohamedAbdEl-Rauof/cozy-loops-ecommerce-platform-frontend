'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  priceBeforeDiscount?: number;
  discountPercentage?: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  maker: {
    _id: string;
    name: string;
    slug: string;
    location: string;
  };
  mainImage?: string;
  images?: string[];
  averageRating?: number;
  numReviews?: number;
}

const ProductPage = () => {
  const params = useParams();
  
  // Extract both slugs from the URL
  // URL: /categories/[categorySlug]/products/[productSlug]
  const categorySlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const productSlug = Array.isArray(params.slug) ? params.slug[1] : params.slug;
  
  // For the nested route structure, we need to access the slugs differently
  // Since you have /categories/[slug]/products/[slug], Next.js will have:
  // - First [slug] as the category slug
  // - Second [slug] as the product slug
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Category slug:', categorySlug);
        console.log('Product slug:', productSlug);
        console.log('Full params:', params);
        
        // Replace with your actual API endpoint
        const response = await fetch(`/api/products/${productSlug}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        
        // Optionally verify the product belongs to the correct category
        if (productData.category && productData.category.slug !== categorySlug) {
          console.warn('Product category mismatch');
        }
        
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug, categorySlug, params]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product...
        </Typography>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Product Not Found
        </Typography>
        <Typography variant="body1">
          {error || 'The product you are looking for does not exist.'}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Debug info: Category: {categorySlug}, Product: {productSlug}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          ${product.price}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {product.description}
        </Typography>
        
        {product.maker && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Made by: {product.maker.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.maker.location}
            </Typography>
          </Box>
        )}
        
        {product.category && (
          <Typography variant="body2" color="text.secondary">
            Category: {product.category.name}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProductPage; 