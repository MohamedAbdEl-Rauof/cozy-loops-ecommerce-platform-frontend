"use client"
import { Box } from "@mui/system";
import SmallNavbar from "@/components/shared/SmallNavbar";
import StoryFeature from "@/components/shared/StoryFeature";
import ProductsOfCategory from "@/components/shared/ProductsOfCategory";

const Products = {
  title: "Products",
  description: "Discover our products and their unique features.",
  productsData: [
    {
      id: '1',
      title: 'Beginner Punch Needle Kit',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 29.99
    },
    {
      id: '2',
      title: 'Premium Wool Yarn Set',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 45.99
    },
    {
      id: '3',
      title: 'Adjustable Punch Needle',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 24.99
    },
    {
      id: '4',
      title: 'Embroidery Hoop Set',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 18.99
    },
    {
      id: '5',
      title: 'Pattern Collection Book',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 32.99
    },
    {
      id: '6',
      title: 'Monk\'s Cloth Fabric',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 15.99
    },
    {
      id: '7',
      title: 'Monk\'s Cloth Fabric',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 15.99
    },
    {
      id: '8',
      title: 'Monk\'s Cloth Fabric',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 15.99
    },
    {
      id: '9',
      title: 'Monk\'s Cloth Fabric',
      description: 'Complete starter kit',
      image: '/images/categories.png',
      price: 15.99
    }

  ]
}


const Page = () => {
  return (
    <Box>
      <SmallNavbar />
      <StoryFeature
        title="Whimsical Punch Needle Art"
        description="Colorful textures and joyful stitches—each piece is a cozy statement."
        buttonText="Shop All Punch Needle"
        imageSrc="/images/shared/prdouct.jpg"
        imageAlt=""
        onButtonClick="/"
      />
      <ProductsOfCategory Products={Products} onAddToCart={() => { }} />
    </Box>
  );
};

export default Page;