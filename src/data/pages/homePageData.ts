import { StoryFeatureData, TestimonialsData } from "@/types/home";

import { FeaturedCategoriesData } from "./categoriesPageData";

export const featuredCategoriesData: FeaturedCategoriesData = {
  title: "Need a gift? Make it personal.",
  isTitleCenter: false,
  description: "Custom handmade gifts that speak louder than words.",
  image: "/images/shared/featuredCategory.jpg",
  ctaText: "",
  buttonText: "Explore Custom Picks",
  buttonLink: "/categories",
};

export const storyFeatureData: StoryFeatureData = {
  title: "Our Story",
  description: "At Cozy Loops, we believe in the beauty of handmade craftsmanship. Each bag is knitted with care, blending comfort and style to create pieces that are as unique as you are.",
  buttonText: "Meet the Maker",
  imageSrc: "/images/shared/storyFeature.jpg",
  imageAlt: "Hands crafting a knitted bag",
  onButtonClick: "/about",
  badge: "Our Story",
};

export const productImages = [
  {
    src: "/images/home/heroSec/rethaferguson.png",
    alt: "Knitting craft with colorful yarn",
    category: "Fiber Arts"
  },
  {
    src: "/images/home/heroSec/karolina.png",
    alt: "White ceramic sculpture",
    category: "Ceramics"
  },
  {
    src: "/images/home/heroSec/hiteshchoudhary.png",
    alt: "Handwoven fabric pattern",
    category: "Textiles"
  },
  {
    src: "/images/home/heroSec/enginakyurt.png",
    alt: "Colorful embroidery work",
    category: "Embroidery"
  },
  {
    src: "/images/home/heroSec/unsplash.png",
    alt: "Wooden loom weaving",
    category: "Weaving"
  },
  {
    src: "/images/home/heroSec/toochinda.png",
    alt: "Hands making pottery",
    category: "Pottery"
  }
];

export const testimonialsData: TestimonialsData = {
  title: "What Our Shoppers Are Saying",
  description: "Real words from our beloved Cozy Loops community.",
  items: [],
};
