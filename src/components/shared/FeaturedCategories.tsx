'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Typography,
    Box,
    useTheme,
    Paper,
    useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface FeaturedCategoriesProps {
    featuredCategories: {
        title: string;
        isTitleCenter: boolean;
        description: string;
        ctaText: string;
        buttonText: string;
        buttonLink: string;
    };
}

const FeaturedCategories = ({
    featuredCategories
}: FeaturedCategoriesProps) => {
    const { title, isTitleCenter, description, ctaText, buttonText, buttonLink } = featuredCategories;
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        // Reduced delay for component appearance
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100); // Reduced from default to 100ms

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper',
                p: { xs: 1, sm: 2, md: 3 },
                overflow: 'hidden',
                width: '100%',
                my: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Paper
                elevation={0}
                className={`featured-container ${isVisible ? 'visible' : ''}`}
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1300px' },
                    height: { xs: '180px', sm: '250px', md: '350px', lg: '400px' },
                    overflow: 'hidden',
                    borderRadius: { xs: 1, sm: 2, md: 3 },
                    transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
                    transform: 'translateY(20px)',
                    opacity: 0,
                    '&.visible': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    },
                    // Responsive corner cuts
                    clipPath: {
                        xs: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 0, 20px 20px, 20px 20px)',
                        sm: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 0, 30px 30px, 30px 30px)',
                        md: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 0, 40px 40px, 40px 40px)'
                    }
                }}
            >
                {/* Image container */}
                <Box
                    className={`image-container ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        '&.visible img': {
                            transform: 'scale(1.05)',
                        }
                    }}
                 >
                    <Image
                        src="/images/shared/featuredCategory.jpg"
                        alt={title}
                        fill
                        priority
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 600px, (max-width: 1280px) 900px, 1300px"
                        style={{
                            objectFit: 'cover',
                            transition: 'transform 1.2s ease-out',
                            transform: 'scale(1)'
                        }}
                    />

                    {/* Overlay with FBE8CC color */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: '#FFF6E6',
                            opacity: 0.25,
                            mixBlendMode: 'multiply',
                            zIndex: 1
                        }}
                    />
                </Box>

                {/* Content overlay */}
                <Box
                    className={`content-overlay ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isTitleCenter ? 'center' : 'flex-start',
                        justifyContent: 'center',
                        padding: { xs: 1.5, sm: 2.5, md: 3.5, lg: 4 },
                        opacity: 0,
                        transition: 'opacity 0.6s ease-out',
                        transitionDelay: '0.2s',
                        zIndex: 2,
                        '&.visible': {
                            opacity: 1
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
                            zIndex: -1
                        }
                    }}
                >
                    <Typography
                        variant={isXs ? "h6" : isSm ? "h5" : isMd ? "h4" : "h3"}
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: { xs: 0.5, sm: 1, md: 1.5, lg: 2 },
                            textAlign: isTitleCenter ? 'center' : 'left',
                            width: isTitleCenter ? 'auto' : '100%',
                            color: theme.palette.text.primary,
                            px: { xs: 0.5, sm: 1, md: 1.5, lg: 2 },
                            fontSize: {
                                xs: '1.1rem',
                                sm: '1.4rem',
                                md: '1.8rem',
                                lg: '2.2rem'
                            },
                            lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 }
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant={isXs ? "caption" : isSm ? "body2" : "body1"}
                        sx={{
                            textAlign: isTitleCenter ? 'center' : 'left',
                            maxWidth: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
                            mb: { xs: 1, sm: 1.5, md: 2, lg: 3 },
                            px: { xs: 0.5, sm: 1, md: 1.5, lg: 2 },
                            textShadow: '0 1px 1px rgba(0,0,0,0.05)',
                            color: theme.palette.text.secondary,
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 2, sm: 2, md: 3, lg: 4 },
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: { xs: 1.2, sm: 1.3, md: 1.5, lg: 1.6 },
                            fontSize: {
                                xs: '0.75rem',
                                sm: '0.875rem',
                                md: '1rem',
                                lg: '1.1rem'
                            }
                        }}
                    >
                        {description}
                    </Typography>

                    {ctaText && (
                        <Box
                            className="cta-text"
                            sx={{
                                fontWeight: 'medium',
                                textShadow: '0 1px 1px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                alignSelf: isTitleCenter ? 'center' : 'flex-start',
                                px: { xs: 0.5, sm: 1, md: 1.5, lg: 2 },
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            <Typography
                                variant={isXs ? "caption" : isSm ? "body2" : "body1"}
                                color="primary"
                                sx={{
                                    fontSize: {
                                        xs: '0.7rem',
                                        sm: '0.8rem',
                                        md: '0.9rem',
                                        lg: '1rem'
                                    },
                                    fontWeight: 500
                                }}
                            >
                                {ctaText}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Top left corner cut with white background */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
                        height: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
                        backgroundColor: 'white',
                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                        zIndex: 3
                    }}
                />

                {/* Bottom right corner with button - Updated design */}
                <Box
                    className={`bottom-right-button ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease',
                        transitionDelay: '0.4s',
                        zIndex: 10,
                        '&.visible': {
                            opacity: 1,
                            transform: 'translateY(0)'
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            bgcolor: 'background.paper',
                            borderTopLeftRadius: {
                                xs: '20px',
                                sm: '30px',
                                md: '40px',
                                lg: '50px'
                            },
                            width: {
                                xs: '110px',
                                sm: '150px',
                                md: '180px',
                                lg: '220px'
                            },
                            height: {
                                xs: '40px',
                                sm: '50px',
                                md: '60px',
                                lg: '70px'
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Box
                            onClick={() => router.push(`${buttonLink}`)}
                            sx={{
                                bgcolor: theme.palette.warning.main,
                                color: theme.palette.warning.contrastText,
                                cursor: 'pointer',
                                borderRadius: {
                                    xs: '16px',
                                    sm: '20px',
                                    md: '25px',
                                    lg: '30px'
                                },
                                height: {
                                    xs: '30px',
                                    sm: '36px',
                                    md: '42px',
                                    lg: '48px'
                                },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: {
                                    xs: '90px',
                                    sm: '130px',
                                    md: '160px',
                                    lg: '190px'
                                },
                                padding: {
                                    xs: '0 8px',
                                    sm: '0 12px',
                                    md: '0 16px',
                                    lg: '0 24px'
                                },
                                fontWeight: 500,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                '&:hover': {
                                    bgcolor: theme.palette.warning.dark,
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                                    transform: 'translateY(-2px)'
                                },
                                '&:active': {
                                    transform: 'scale(0.98)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                },
                            }}
                        >
                            <Typography
                                variant={isXs ? "caption" : "button"}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    width: '100%',
                                    color: theme.palette.warning.contrastText,
                                    fontSize: {
                                        xs: '0.7rem',
                                        sm: '0.8rem',
                                        md: '0.9rem',
                                        lg: '1rem'
                                    },
                                }}
                            >
                                {buttonText}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default FeaturedCategories;