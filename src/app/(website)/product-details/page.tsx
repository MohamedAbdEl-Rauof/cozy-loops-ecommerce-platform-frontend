"use client"
import { Box, Container } from "@mui/material";
import SmallNavbar from "@/components/shared/SmallNavbar";
import StoryFeature from "@/components/shared/StoryFeature";
import ProductsOfCategory from "@/components/shared/ProductsOfCategory";
import CategoriesGrid from "@/components/shared/CategoriesGrid";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import Testimonials from "@/components/shared/Testimonials";
import ProductDetails from "@/components/shared/PrdouctDetails";

const Products = {
  title: "Handcrafted Punch Needle Collection",
  description: "Discover our curated selection of premium punch needle supplies and artisan-made pieces, perfect for every skill level.",
  productsData: [
    {
      id: '1',
      title: 'Beginner Punch Needle Kit',
      image: '/images/categories.png',
      price: 29.99
    },
    {
      id: '2',
      title: 'Premium Wool Yarn Set',
      image: '/images/categories.png',
      price: 45.99
    },
    {
      id: '3',
      title: 'Adjustable Punch Needle',
      image: '/images/categories.png',
      price: 24.99
    },
    {
      id: '4',
      title: 'Embroidery Hoop Set',
      image: '/images/categories.png',
      price: 18.99
    },
    {
      id: '5',
      title: 'Pattern Collection Book',
      image: '/images/categories.png',
      price: 32.99
    },
    {
      id: '6',
      title: 'Monk\'s Cloth Fabric',
      image: '/images/categories.png',
      price: 15.99
    },
    {
      id: '7',
      title: 'Deluxe Starter Bundle',
      image: '/images/categories.png',
      price: 89.99
    },
    {
      id: '8',
      title: 'Metallic Thread Collection',
      image: '/images/categories.png',
      price: 28.99
    },
    {
      id: '9',
      title: 'Advanced Pattern Set',
      image: '/images/categories.png',
      price: 42.99
    }
  ]
}

const categoriesData = {
  title: "Makers Behind the Loops",
  description: "Meet the talented artisans who bring creativity and passion to every stitch, each with their own unique story and artistic vision.",
  categories: [
    {
      id: "1",
      title: "Nour from Mansoura",
      description: "“I see color as emotion—and every loop tells a feeling.”",
      image: "/images/shared/makers/makerNoura.png",
      isMaker: true,
      buttonText: "View Profile",
      buttonLink: "/makers/nour",
      slug: "nour-mansoura"
    },
    {
      id: "2",
      title: "Khaled from Alexandria",
      description: "“Punch needle gave me a new voice—each design is a rhythm in thread.”",
      image: "/images/shared/makers/makerKhaled.png",
      isMaker: true,
      buttonText: "View Profile",
      buttonLink: "/makers/khaled",
      slug: "khaled-alexandria"
    },
    {
      id: "3",
      title: "Rania from Giza",
      description: "“Inspired by nature and folk tales, I punch joy into every stitch.”",
      image: "/images/shared/makers/makerRania.png",
      isMaker: true,
      buttonText: "View Profile",
      buttonLink: "/makers/rania",
      slug: "rania-giza"
    },
  ]
};

const featuredCategories = {
  title: "Meet Fatma from Cairo – Creating jewelry inspired by tradition",
  isTitleCenter: false,
  description: "",
  image: "/images/shared/productImage.jpg",
  ctaText: "",
  buttonText: "View Profile",
  buttonLink: "#"
}

const testimonialsData = {
  title: "Why Shoppers Love Our Loops",
  description: "From thoughtful gifts to home highlights, our customers can’t get enough of the charm and quality behind each handmade loop.",
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


// Add this mock data before the Page component
const productData = {
  id: "prod-001",
  name: "Whimsical Punch Needle Art Kit - Rainbow Dreams",
  images: [
    {
      id: "img-1",
      url: "/images/shared/prdouct.jpg",
      alt: "Main product image - Rainbow Dreams punch needle kit"
    },
    {
      id: "img-2",
      url: "/images/categories.png",
      alt: "Product detail view 1"
    },
    {
      id: "img-3",
      url: "/images/shared/productImage.jpg",
      alt: "Product detail view 2"
    },
    {
      id: "img-4",
      url: "/images/shared/makers/makerNoura.png",
      alt: "Product in use demonstration"
    }
  ],
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  stockCount: 15,
  price: 89.99,
  originalPrice: 119.99,
  colors: [
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
  ],
  description: "Create stunning punch needle art with our comprehensive",
};

const Page = () => {
  return (
    <Box component="main" sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <SmallNavbar
        category="Category"
        page1="Punch Needle"
        page2="Rouaf"
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
          px: 0,
          mx: 'auto',
        }}
      >


        <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'white' }}>
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
            onAddToCart={(quantity, color) => {
              console.log(`Adding ${quantity} items in ${color} to cart`);
              // Handle add to cart logic here
            }}
            onToggleFavorite={() => {
              console.log('Toggling favorite status');
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
            isFavorite={false}
          />
        </Box>

        <Box sx={{
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          bgcolor: '#f8f9fa'
        }}>
          <CategoriesGrid categoriesData={categoriesData} />
        </Box>

        <Box sx={{
          py: { xs: 6, sm: 8, md: 10 },
          bgcolor: 'white',
          borderTop: '1px solid #e0e0e0'
        }}>
          <FeaturedCategories featuredCategories={featuredCategories} />
        </Box>

        <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
          <Testimonials testimonialsData={testimonialsData} />
        </Box>
      </Container>
    </Box>
  );
};

export default Page;