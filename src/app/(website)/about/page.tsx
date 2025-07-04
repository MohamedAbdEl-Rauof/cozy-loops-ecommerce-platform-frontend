'use client';

import ImageWithText from "@/components/about/ImageWithText";
import FeatureCardsSection from "@/components/shared/FeatureCardsSection";
import MainAboutSection from "@/components/shared/MainAboutSection";
import StoryFeature from "@/components/shared/StoryFeature";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import { Box, Container } from "@mui/material";

const FeatureCardsSectionData = {
    sectionTitle: "Why Choose Cozy Loops?",
    sectionDescription: "Browse pieces picked to match your style and story",
    cards: [
        {
            imageUrl: "/images/shared/hand-made.png",
            title: "100% Handmade with Heart",
            description: "",
        },
        {
            imageUrl: "/images/shared/secure-shield.png",
            title: "Ethically Sourced & Fair to Makers",
            description: "",
        },
        {
            imageUrl: "/images/shared/gift.png",
            title: "Customizable & Personal Gifts",
            description: "",
        },
        {
            imageUrl: "/images/shared/working-woman.png",
            title: "Community-Driven and Woman-Led",
            description: "",
        }
    ]
};

const featuredCategories = {
    title: "Have a Question or Want to Collaborate?",
    isTitleCenter: false,
    image: "/images/shared/featuredCategory.jpg",
    description: "We love hearing from our community.",
    ctaText: "",
    buttonText: "Contact Us",
    buttonLink: "Contact Us",
}

export default function About() {
    return (
        <Box component="main" sx={{ bgcolor: 'white' }}>
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
                    px: { xs: 2, sm: 3, md: 4, lg: 6 },
                    mx: 'auto',
                }}
            >
                <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
                    <MainAboutSection />
                </Box>

                <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
                    <ImageWithText
                        title="Our Mission"
                        description="To celebrate the art of handmade creation by supporting independent makers and bringing soulful, meaningful products into everyday life."
                        imageSrc="/images/shared/ImageWithText1.png"
                        imageAlt="Our Mission"
                        flipContent={false}
                        imageWidth={{ xs: '100%', sm: '80%', md: '90%', lg: '100%' }}
                        imageHeight={{ xs: '400px', sm: '700px', md: '1000px', lg: '1100px' }}
                    />
                </Box>

                <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
                    <ImageWithText
                        title="Made in Egypt (and Beyond)"
                        description="Every Cozy Loops piece is handmade with care and cultural roots—supporting a vibrant community of local makers and storytellers with every purchase."
                        imageSrc="/images/shared/ImageWithText2.png"
                        imageAlt="Made in Egypt"
                        flipContent={true}
                        imageWidth={{ xs: '100%', sm: '80%', md: '65%', lg: '70%' }}
                        imageHeight={{ xs: '350px', sm: '380px', md: '500px', lg: '700px' }}
                    />
                </Box>

                <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
                    <StoryFeature
                        title="Meet the Makers"
                        description="We proudly work with independent artisans—many of them women, small business owners, and traditional crafters—who pour their love into every piece they create."
                        buttonText="Explore Artisan Stories"
                        imageSrc="/images/shared/storyFeatureAbout.png"
                        imageAlt="Meet the Makers"
                        onButtonClick="/"
                    />
                </Box>

                <Box sx={{ mb: { xs: 8, sm: 10, md: 12, lg: 16 } }}>
                    <FeatureCardsSection
                        sectionTitle={FeatureCardsSectionData.sectionTitle}
                        sectionDescription={FeatureCardsSectionData.sectionDescription}
                        cards={FeatureCardsSectionData.cards}
                    />
                </Box>

                <Box sx={{ pb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
                    <FeaturedCategories featuredCategories={featuredCategories} />
                </Box>

            </Container>
        </Box>
    );
}