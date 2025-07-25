'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Typography,
    Box,
    useTheme,
    Paper,
    useMediaQuery,
    Container,
    Button,
    Chip
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ArrowForward, TrendingUp } from '@mui/icons-material';
import { FeaturedCategoriesData } from '@/types/home';

interface FeaturedCategoriesProps {
    featuredCategories: FeaturedCategoriesData;
}

const FeaturedCategories = ({
    featuredCategories
}: FeaturedCategoriesProps) => {
    const { title, isTitleCenter, description, ctaText, buttonText, buttonLink, image } = featuredCategories;
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 20);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container
            maxWidth={false}
            sx={{
                px: { xs: 2, sm: 3, md: 4, lg: 6 },
                py: { xs: 3, sm: 4, md: 6 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Paper
                    elevation={0}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`featured-container ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: {
                            xs: '100%',
                            sm: '600px',
                            md: '900px',
                            lg: '1100px',
                            xl: '1300px'
                        },
                        height: {
                            xs: '280px',
                            sm: '350px',
                            md: '450px',
                            lg: '520px',
                            xl: '580px'
                        },
                        overflow: 'hidden',
                        borderRadius: { xs: 3, sm: 4, md: 5, lg: 6 },
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transform: isVisible
                            ? (isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)')
                            : 'translateY(40px) scale(0.95)',
                        opacity: isVisible ? 1 : 0,
                        boxShadow: isVisible
                            ? (isHovered
                                ? `0 32px 80px rgba(255, 112, 67, 0.15), 0 16px 40px rgba(255, 112, 67, 0.1)`
                                : `0 16px 40px rgba(255, 112, 67, 0.08), 0 8px 20px rgba(255, 112, 67, 0.04)`)
                            : '0 4px 8px rgba(0,0,0,0.02)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid 'var(--primary-color)20`,
                    }}
                >
                    <Box
                        className={`image-container ${isVisible ? 'visible' : ''}`}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: `linear-gradient(
                                    135deg,
                                    rgba(255, 229, 184, 0.3) 0%,
                                    rgba(255, 229, 184, 0.1) 40%,
                                    rgba(255, 112, 67, 0.05) 100%
                                )`,
                                zIndex: 2,
                                transition: 'opacity 0.6s ease',
                                opacity: isHovered ? 0.8 : 0.5,
                            }
                        }}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 960px) 600px, (max-width: 1200px) 900px, 1300px"
                            style={{
                                objectFit: 'cover',
                                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transform: isHovered ? 'scale(1.1)' : 'scale(1.05)',
                                filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: isTitleCenter
                                    ? `linear-gradient(
                                        to bottom,
                                        rgba(255, 229, 184, 0.4) 0%,
                                        rgba(255, 229, 184, 0.2) 30%,
                                        rgba(255, 229, 184, 0.15) 70%,
                                        rgba(255, 112, 67, 0.3) 100%
                                    )`
                                    : `linear-gradient(
                                        to right,
                                        rgba(255, 229, 184, 0.6) 0%,
                                        rgba(255, 229, 184, 0.3) 50%,
                                        rgba(255, 112, 67, 0.2) 100%
                                    )`,
                                zIndex: 1,
                                transition: 'opacity 0.6s ease',
                                opacity: isHovered ? 0.9 : 0.7,
                            }}
                        />
                    </Box>

                    <Box
                        className={`content-overlay ${isVisible ? 'visible' : ''}`}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isTitleCenter ? 'center' : 'flex-start',
                            justifyContent: isTitleCenter ? 'center' : 'flex-end',
                            padding: {
                                xs: 3,
                                sm: 4,
                                md: 5,
                                lg: 6,
                                xl: 7
                            },
                            opacity: isVisible ? 1 : 0,
                            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '0.05s',
                            zIndex: 3,
                        }}
                    >
                        {ctaText && (
                            <Chip
                                icon={<TrendingUp sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
                                label={ctaText}
                                size={isXs ? "small" : "medium"}
                                sx={{
                                    mb: { xs: 2, sm: 2.5, md: 3 },
                                    alignSelf: isTitleCenter ? 'center' : 'flex-start',
                                    bgcolor: `rgba(255, 229, 184, 0.95)`,
                                    color: 'var(--primary-color)',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid var(--primary-overlay)80`,
                                    transition: 'all 0.2s ease',
                                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                    '&:hover': {
                                        bgcolor: 'var(--primary-color)',
                                        color: 'white',
                                        transform: 'translateY(-2px) scale(1.05)',
                                    }
                                }}
                            />
                        )}

                        <Typography
                            variant={isXs ? "h4" : isSm ? "h3" : isMd ? "h2" : isLg ? "h1" : "h1"}
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                mb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                                textAlign: isTitleCenter ? 'center' : 'left',
                                color: '#2c1810',
                                textShadow: `0 2px 8px rgba(255, 229, 184, 0.8), 0 4px 16px rgba(255, 112, 67, 0.3)`,
                                fontSize: {
                                    xs: '1.75rem',
                                    sm: '2.25rem',
                                    md: '2.75rem',
                                    lg: '3.5rem',
                                    xl: '4rem'
                                },
                                lineHeight: { xs: 1.1, sm: 1.15, md: 1.2, lg: 1.25 },
                                letterSpacing: '-0.03em',
                                maxWidth: isTitleCenter ? '95%' : '80%',
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transitionDelay: '0.02s',
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant={isXs ? "body1" : isSm ? "h6" : "h5"}
                            sx={{
                                textAlign: isTitleCenter ? 'center' : 'left',
                                maxWidth: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
                                mb: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                                color: '#3d2914',
                                textShadow: `0 2px 8px rgba(255, 229, 184, 0.6)`,
                                fontSize: {
                                    xs: '0.95rem',
                                    sm: '1.1rem',
                                    md: '1.25rem',
                                    lg: '1.4rem',
                                    xl: '1.5rem'
                                },
                                lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                                fontWeight: 500,
                                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transitionDelay: '0.02s',
                            }}
                        >
                            {description}
                        </Typography>

                        <Button
                            variant="contained"
                            endIcon={<ArrowForward />}
                            onClick={() => router.push(buttonLink)}
                            sx={{
                                alignSelf: isTitleCenter ? 'center' : 'flex-start',
                                bgcolor: 'var(--primary-color)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                                px: { xs: 3, sm: 4, md: 5 },
                                py: { xs: 1.5, sm: 2, md: 2.5 },
                                borderRadius: '9999px !important',
                                textTransform: 'none',
                                boxShadow: `0 8px 24px rgba(255, 112, 67, 0.3)`,
                                backdropFilter: 'blur(10px)',
                                border: `1px solid rgba(255, 229, 184, 0.3)`,
                                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                                transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                transitionDelay: '0.02s',
                                '&:hover': {
                                    bgcolor: 'var(--primary-hover)',
                                    transform: 'translateY(-3px) scale(1.05)',
                                    boxShadow: `0 12px 32px rgba(255, 112, 67, 0.4), 0 6px 16px rgba(255, 229, 184, 0.3)`,
                                },
                                '&:active': {
                                    transform: 'translateY(-1px) scale(1.02)',
                                }
                            }}
                        >
                            {buttonText}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default FeaturedCategories;