'use client';

import { Box, Container } from "@mui/material";

import ImageWithText from "@/components/about/ImageWithText";
import FeatureCardsSection from "@/components/shared/FeatureCardsSection";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import MainAboutSection from "@/components/shared/MainAboutSection";
import StoryFeature from "@/components/shared/StoryFeature";
import {
    featureCardsSectionData,
    missionData,
    madeInEgyptData,
    storyFeatureData,
    featuredCategoriesData
} from "@/data/pages/aboutPageData";

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
                <Box sx={{ mb: { xs: 4, sm: 6, md: 8, lg: 10 } }}>
                    <MainAboutSection />
                </Box>

                <Box sx={{ mb: { xs: 4, sm: 6, md: 8, lg: 10 } }}>
                    <ImageWithText dataContent={missionData} />
                </Box>

                <Box sx={{ mb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
                    <ImageWithText dataContent={madeInEgyptData} />
                </Box>

                <Container
                    maxWidth={false}
                    sx={{
                        maxWidth: {
                            xs: '100%',
                            sm: '100%',
                            md: '1200px',
                            lg: '1400px',
                            xl: '1600px'
                        },
                        px: { xs: 2, sm: 3, md: 4, lg: 6 },
                        mx: 'auto',
                    }}
                >
                    <Box sx={{ mb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
                        <StoryFeature
                            title={storyFeatureData.title}
                            description={storyFeatureData.description}
                            buttonText={storyFeatureData.buttonText}
                            imageSrc={storyFeatureData.imageSrc}
                            imageAlt={storyFeatureData.imageAlt}
                            onButtonClick={storyFeatureData.onButtonClick}
                            badge={storyFeatureData.badge}
                        />
                    </Box>

                    <Box sx={{ mb: { xs: 6, sm: 8, md: 10, lg: 12 } }}>
                        <FeatureCardsSection
                            sectionTitle={featureCardsSectionData.sectionTitle}
                            sectionDescription={featureCardsSectionData.sectionDescription}
                            cards={featureCardsSectionData.cards}
                        />
                    </Box>

                    <Box sx={{ pb: { xs: 4, sm: 6, md: 8, lg: 10 } }}>
                        <FeaturedCategories featuredCategories={featuredCategoriesData} />
                    </Box>
                </Container>
            </Container>
        </Box>    );
}
