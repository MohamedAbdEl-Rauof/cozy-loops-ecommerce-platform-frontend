'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import { useProductStore } from '@/store/productStore';
import SmallNavbar from "@/components/shared/SmallNavbar";
import Testimonials from "@/components/shared/Testimonials";
import ProductDetails from "@/components/shared/PrdouctDetails";
import FeatureCardsSection from "@/components/shared/FeatureCardsSection";
import AbountMaker from "@/components/product-details/AbountMaker";
import SimilarProducts from "@/components/product-details/SimilarProducts";
import Comments from "@/components/product-details/Comments";
import { makerService } from '@/services/makerService';

const testimonialsData = {
  title: "What Buyers Are Saying",
  description: "",
  items: [
    {
      id: 1,
      name: "Mariam S.",
      avatar: "/images/navbarLogo.svg?height=60&width=60",
      text: "Every detail felt personal — I'll definitely order again!",
      rating: 5,
    },
    {
      id: 2,
      name: "Ahmed R.",
      avatar: "/images/navbarLogo.svg?height=60&width=60",
      text: "It's like shopping at a handmade bazaar... from my couch.",
      rating: 5,
    },
    {
      id: 3,
      name: "Dalia A.",
      avatar: "/images/navbarLogo.svg?height=60&width=60",
      text: "Support local talent and get amazing quality? Yes, please.",
      rating: 5,
    },
  ]
};

const FeatureCardsSectionData = {
  sectionTitle: "Details & Inspiration",
  sectionDescription: "Inspired by spring blooms and woven with care, this piece brings warmth to minimalist or boho spaces alike.",
  cards: [
    {
      imageUrl: "/images/shared/textile 1.png",
      title: "Materials",
      description: "Cotton yarn, Monk's cloth, Wooden hoop frame",
    },
    {
      imageUrl: "/images/shared/measuring-tape.png",
      title: "Size/Dimensions",
      description: "25cm diameter (custom sizes available on request)",
    },
    {
      imageUrl: "/images/shared/color-palette.png",
      title: "Color Palette",
      description: "Coral, blush, sage, ivory",
    },
    {
      imageUrl: "/images/shared/user-guide.png",
      title: "Care Instructions",
      description: "Gently dust or spot clean with a damp cloth. Keep out of direct sunlight.",
    }
  ]
};

const FeatureCardsSectionData2 = {
  sectionTitle: "Shipping & Policies",
  sectionDescription: "",
  cards: [
    {
      imageUrl: "/images/shared/fast-delivery.png",
      title: "Ships within 2–4 business days from Cairo",
      description: "",
    },
    {
      imageUrl: "/images/shared/delivery.png",
      title: "Delivery across Egypt & the Middle East",
      description: "",
    },
    {
      imageUrl: "/images/shared/return 1.png",
      title: "Free returns within 7 days",
      description: "(conditions apply)",
    }
  ]
};

const similarProductsData = {
  title: "Similar Products",
  productsData: [
    {
      id: "1",
      title: "Wireless Bluetooth Headphones",
      image: "/images/shared/featuredCategory.jpg",
      price: 99.99
    },
    {
      id: "2",
      title: "Smart Watch Series 5",
      image: "/images/shared/featuredCategory.jpg",
      price: 299.99
    },
    {
      id: "3",
      title: "Portable Bluetooth Speaker",
      image: "/images/shared/featuredCategory.jpg",
      price: 79.99
    },
    {
      id: "4",
      title: "USB-C Fast Charger",
      image: "/images/shared/featuredCategory.jpg",
      price: 29.99
    },
    {
      id: "5",
      title: "Wireless Mouse",
      image: "/images/shared/featuredCategory.jpg",
      price: 49.99
    },
    {
      id: "6",
      title: "Wireless Mouse",
      image: "/images/shared/featuredCategory.jpg",
      price: 49.99
    },
    {
      id: "7",
      title: "Wireless Mouse",
      image: "/images/shared/featuredCategory.jpg",
      price: 49.99
    },
    {
      id: "8",
      title: "Wireless Mouse",
      image: "/images/shared/featuredCategory.jpg",
      price: 49.99
    },
    {
      id: "9",
      title: "Wireless Mouse",
      image: "/images/shared/featuredCategory.jpg",
      price: 49.99
    },
    {
      id: "10",
      title: "Wireless Mouse",
      image: "/images/shared/featuredCategory.jpg",
      price: 49.99
    }
  ]
};

const ProductPage = () => {
  const params = useParams();

  const categorySlug = params.categorySlug as string;
  const productSlug = params.productSlug as string;

  const { categoryProducts, fetchProductsByCategorySlug } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the product in the store by matching the slug
  const product = categoryProducts?.find(p => p.slug === productSlug) || null;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        // If we don't have the products for this category yet, fetch them
        if (!categoryProducts || categoryProducts.length === 0) {
          await fetchProductsByCategorySlug(categorySlug);
        }

        // After fetching, if we still don't have the product, show an error
        const foundProduct = categoryProducts?.find(p => p.slug === productSlug);
        if (!foundProduct) {
          console.error('Product not found after fetching category products');
          setError('Product not found in this category');
        } else {
          console.log('Found product:', foundProduct);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [categorySlug, productSlug, fetchProductsByCategorySlug, categoryProducts]);

  const transformProductData = () => {
    if (!product) return null;

    // Map product images to the format expected by ProductDetails
    const productImages = product.images?.map((url, index) => ({
      id: `img-${index + 1}`,
      url: url,
      alt: `${product.name} - image ${index + 1}`,
      main: false // Default all images to not be main
    })) || [];

    // If there's a main image, make sure it's first in the array and marked as main
    if (product.mainImage) {
      // Check if main image is already in the array
      const mainImageIndex = productImages.findIndex(img => img.url === product.mainImage);

      if (mainImageIndex !== -1) {
        // If main image exists in array, mark it as main and move to front
        productImages[mainImageIndex].main = true;
        const mainImageObj = productImages.splice(mainImageIndex, 1)[0];
        productImages.unshift(mainImageObj);
      } else {
        // If main image is not in the array, add it to the front
        productImages.unshift({
          id: 'img-main',
          url: product.mainImage,
          alt: `${product.name} - main image`,
          main: true
        });
      }
    } else if (productImages.length > 0) {
      // If no main image is specified but we have images, mark the first one as main
      productImages[0].main = true;
    }

    // Define product colors - use variants if available, otherwise use default colors
    const colors = [
      {
        name: "Rainbow Mix",
        value: "#ff6b6b",
        available: true
      },
      {
        name: "Ocean Breeze",
        value: "#4ecdc4",
        available: true
      },
      {
        name: "Sunset Glow",
        value: "#45b7d1",
        available: true
      },
      {
        name: "Forest Green",
        value: "#96ceb4",
        available: false
      },
      {
        name: "Golden Hour",
        value: "#feca57",
        available: true
      }
    ];

    return {
      id: product._id,
      name: product.name,
      images: productImages,
      rating: product.averageRating || 4.5,
      reviewCount: product.numReviews || 0,
      inStock: (product.stock || 0) > 0,
      stockCount: product.stock || 0,
      price: product.price,
      originalPrice: product.priceBeforeDiscount,
      colors: colors,
      description: product.description || product.shortDescription,
      discountPercentage: product.discountPercentage
    };
  };

  const productData = transformProductData();


  if (loading && !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading product...
        </Typography>
      </Container>
    );
  }

  if (error || !product || !productData) {
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
    <Box component="main" sx={{ bgcolor: '#fafafa' }}>
      {/* Navigation */}
      <SmallNavbar
        category={product.category?.name || "Category"}
        page1={product.category?.name || "Products"}
        page2={product.name}
      />

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
          mx: 'auto',
        }}
      >
        {/* Product Details Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: { xs: 0, md: '16px 16px 0 0' },
            boxShadow: { xs: 'none', md: '0 4px 20px rgba(0,0,0,0.08)' }
          }}
        >
          <ProductDetails
            id={productData.id}
            name={productData.name}
            images={productData.images}
            rating={productData.rating}
            reviewCount={productData.reviewCount}
            inStock={productData.inStock}
            stockCount={productData.stockCount}
            price={productData.price}
            originalPrice={productData.originalPrice}
            colors={productData.colors}
            description={productData.description}
            discountPercentage={productData.discountPercentage}
            onAddToCart={(quantity, color) => {
              console.log(`Adding ${quantity} items in ${color} to cart`);
              // Handle add to cart logic here
            }}
            onToggleFavorite={() => {
              console.log('Toggling favorite status');
              setIsFavorite(!isFavorite);
              // Handle favorite toggle logic here
            }}
            onShare={() => {
              console.log('Sharing product');
              // Handle share logic here
              if (navigator.share) {
                navigator.share({
                  title: productData.name,
                  text: productData.description,
                  url: window.location.href,
                });
              }
            }}
            isFavorite={isFavorite}
          />
        </Box>

        {/* Feature Cards Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
            mt: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <FeatureCardsSection
            sectionTitle={FeatureCardsSectionData.sectionTitle}
            sectionDescription={FeatureCardsSectionData.sectionDescription}
            cards={FeatureCardsSectionData.cards}
          />
        </Box>

        {/* About The Maker Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)',
            mx: { xs: 1, sm: 2, md: 3 },
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite',
            },
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }}
        >
          <AbountMaker
            title="About The Maker"
            makerInfo={{
              name: "Nour Hassan",
              location: "Mansoura, Egypt",
              miniBio: "Hi! I'm Nour from Mansoura. Punch needle art lets me bring joy to people's spaces—one loop at a time. I'm inspired by the colors of Egyptian nature and love turning simple threads into soft, happy designs.",
              avatar: "/images/makers/nour-hassan.jpg",
              joinedDate: "March 2020",
              rating: 4.8,
              totalReviews: 127,
              specialties: ["Punch Needle", "Embroidery", "Wall Art", "Home Decor"],
              yearsOfExperience: 6,
              isVerified: true,
              totalProducts: 45,
              completedOrders: 320
            }}
            buttonText1="Visit Artisan Shop"
            buttonText2="View More by Nour"
            imageSrc="/images/shared/storyFeature.jpg"
            imageAlt="Nour crafting a beautiful punch needle wall hanging"
            onButton1Click={() => {
              console.log('Navigate to Nour\'s artisan shop');
              // router.push('/artisan/nour-hassan');
            }}
            onButton2Click={() => {
              console.log('View more products by Nour');
              // router.push('/products?maker=nour-hassan');
            }}
          />
        </Box>

        {/* Related Products Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >

        </Box>

        {/* Makers Section */}
        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >

        </Box>




        <SimilarProducts Products={similarProductsData} onAddToCart={() => console.log("Product added to cart")} />


        {/* Testimonials Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            mb: { xs: 4, sm: 6, md: 8 },
            bgcolor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            mx: { xs: 1, sm: 2, md: 3 },
            overflow: 'hidden'
          }}
        >
          <Testimonials testimonialsData={testimonialsData} />
        </Box>

        <Comments />

        <Box
          component="section"
          sx={{
            mb: { xs: 6, sm: 8, md: 10, lg: 12 },
            mt: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <FeatureCardsSection
            sectionTitle={FeatureCardsSectionData2.sectionTitle}
            sectionDescription={FeatureCardsSectionData2.sectionDescription}
            cards={FeatureCardsSectionData2.cards}
          />
        </Box>

      </Container>
    </Box>
  );
};

export default ProductPage; 