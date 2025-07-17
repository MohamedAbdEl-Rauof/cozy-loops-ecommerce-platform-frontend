'use client';

import { useParams } from 'next/navigation';
import { Box, Container, CircularProgress, Alert } from '@mui/material';
import { useProductFromCategory } from '@/hooks/useProducts';
import { ProductImage, ProductColor } from '@/types/product';
import SmallNavbar from "@/components/shared/SmallNavbar";
import ProductDetails from "@/components/shared/PrdouctDetails";
import FeatureCardsSection from "@/components/shared/FeatureCardsSection";
import AbountMaker from "@/components/product-details/AbountMaker";
import SimilarProducts from "@/components/product-details/SimilarProducts";
import Comments from "@/components/product-details/Comments";
import { useMakersBySlug } from "@/hooks/useMakers";
import ExisitingComments from '@/components/about/ExisitingComments';
import { useProductsTestimonialsBySlug } from '@/hooks/useTestimonials';


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

// Helper function to transform API images to component format
const transformImages = (images: string[] = [], productName: string): ProductImage[] => {
  if (!images || images.length === 0) {
    // Fallback to placeholder images if no images provided
    return [
      {
        id: '1',
        url: '/placeholder-product.jpg', // Make sure you have this placeholder image
        alt: productName
      }
    ];
  }

  return images.map((url, index) => ({
    id: (index + 1).toString(),
    url,
    alt: `${productName} - Image ${index + 1}`
  }));
};

// Helper function to transform API colors to component format
const transformColors = (colors: string[] = []): ProductColor[] => {
  if (!colors || colors.length === 0) {
    // Default colors if none provided by API
    return [
      {
        name: "Default",
        value: "#000000",
        available: true
      }
    ];
  }

  // Color name mapping (you can expand this based on your needs)
  const colorNames: { [key: string]: string } = {
    '#ff6b6b': 'Red',
    '#4ecdc4': 'Teal',
    '#45b7d1': 'Blue',
    '#96ceb4': 'Green',
    '#feca57': 'Yellow',
    '#000000': 'Black',
    '#ffffff': 'White',
    '#8b4513': 'Brown',
    '#800080': 'Purple',
    '#ffc0cb': 'Pink'
  };

  return colors.map((color, index) => ({
    name: colorNames[color.toLowerCase()] || `Color ${index + 1}`,
    value: color,
    available: true
  }));
};


const ProductPage = () => {
  const params = useParams();

  const categorySlug = params.categorySlug as string;
  const productSlug = params.productSlug as string;

  const {
    data: product,
    isLoading,
    error,
  } = useProductFromCategory(categorySlug, productSlug);

  const {
    data: testimonials,
    isLoading: testimonialsLoading,
    error: testimonialsError,
    refetch: refetchTestimonials
  } = useProductsTestimonialsBySlug(productSlug);

  const handleCommentSubmitted = () => {
    refetchTestimonials();
  };

  const { data: makerData, isLoading: makerLoading, error: makerError } = useMakersBySlug(product?.maker?.slug || '');

  if (isLoading) {
    return (
      <Box
        component="main"
        sx={{
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
    return (
      <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
        <Container maxWidth="md">
          <Alert severity="error" sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box component="main" sx={{ bgcolor: 'white', p: 4 }}>
        <Container maxWidth="md">
          <Alert severity="warning" sx={{ mb: 4 }}>
            Product not found
          </Alert>
        </Container>
      </Box>
    );
  }


  // Transform the API data to match component expectations
  const transformedImages = transformImages(product.images, product.name);
  const transformedColors = transformColors(product.colors);

  const handleAddToCart = (quantity: number, color: string) => {
    console.log('Adding to cart:', { productId: product._id, quantity, color });
    // Implement your add to cart logic here
  };

  const handleToggleFavorite = () => {
    console.log('Toggle favorite for product:', product._id);
    // Implement your favorite toggle logic here
  };

  const handleShare = () => {
    console.log('Share product:', product._id);
    // Implement your share logic here
  };



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
            id={product._id}
            name={product.name}
            images={transformedImages}
            rating={product.rating || 4.5}
            reviewCount={product.reviewCount || 0}
            inStock={product.inStock !== false}
            stockCount={product.stockCount || 10}
            price={product.price}
            originalPrice={product.priceBeforeDiscount}
            colors={transformedColors}
            description={product.shortDescription || product.description}
            discountPercentage={product.discountPercentage || 0}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
            isFavorite={false}
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
          {/* <AbountMaker
            title="About The Maker"
            makerInfo={{
              name: "Nour Hassan",
              location: "Mansoura, Egypt",
              miniBio: "Hi! I'm Nour from Mansoura. Punch needle art lets me bring joy to people's spaces—one loop at a time. I'm inspired by the colors of Egyptian nature and love turning simple threads into soft, happy designs.",
              avatar: "/images/makers/nour-hassan.jpg",
              joinedDate: "March 2020",
              rating: 4,
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
          /> */}

          <AbountMaker
            title="About The Maker"
            makerInfo={{
              name: makerData?.name || product?.maker?.name || "Unknown Maker",
              location: makerData?.location || product?.maker?.location || "Unknown Location",
              miniBio: makerData?.aboutMe || product?.maker?.message || "Passionate artisan creating beautiful handcrafted pieces.",
              avatar: makerData?.image || product?.maker?.image || "/images/makers/default-maker.jpg",
              joinedDate: makerData?.joinDate
                ? new Date(makerData.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })
                : "Unknown",   // problem here 
              rating: makerData?.rating || 4.5,
              totalReviews: 127,
              specialties: makerData?.specialties || ["Handcrafted", "Artisan"],
              yearsOfExperience: makerData?.joinDate ? new Date().getFullYear() - new Date(makerData.joinDate).getFullYear() : 0,  // problem here
              isVerified: true,
              totalProducts: 45,
              completedOrders: 320
            }}
            buttonText1="Visit Artisan Shop"
            buttonText2={`View More by ${makerData?.name || 'Maker'}`} // problem here
            imageSrc={makerData?.image || product?.maker?.image || "/images/shared/storyFeature.jpg"}
            imageAlt={`${makerData?.name || 'Maker'} crafting beautiful handmade pieces`} // problem here 
            onButton1Click={() => {
              console.log(`Navigate to ${makerData?.name}'s artisan shop`);
              // router.push(`/makers/${makerData?.slug}`);
            }}
            onButton2Click={() => {
              console.log(`View more products by ${makerData?.name}`);
              // router.push(`/products?maker=${makerData?.slug}`);
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



        <Comments onCommentSubmitted={handleCommentSubmitted} />

        <ExisitingComments mockComments={testimonials || []} />

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