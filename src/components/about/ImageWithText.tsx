'use client';

import { Box, Typography, Fade, Slide, Button, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {ImageWithTextProps } from '@/types/about';

const ImageWithText = ({
    dataContent
}: ImageWithTextProps) => {
    const { title, description, imageSrc, imageAlt, flipContent, imageWidth, imageHeight, buttonText, buttonLink, onButtonClick } = dataContent
    const [isVisible, setIsVisible] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const defaultWidth = {
        xs: '100%',
        sm: '90%',
        md: '80%',
        lg: '75%',
        xl: '70%'
    };

    const defaultHeight = {
        xs: '200px',
        sm: '240px',
        md: '280px',
        lg: '320px',
        xl: '360px'
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        } else if (buttonLink) {
            router.push(buttonLink);
        }
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: flipContent ? 'row' : 'row-reverse'
                },
                alignItems: 'center',
                justifyContent: 'center',
                gap: {
                    xs: 3,
                    sm: 4,
                    md: 6,
                    lg: 8,
                    xl: 10
                },
                mx: 'auto',
                maxWidth: {
                    xs: '100%',
                    sm: '600px',
                    md: '100%',
                    lg: '1200px',
                    xl: '1400px'
                },
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 3, sm: 4, md: 6 },
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
        >
            <Slide
                direction={isMobile ? "up" : (flipContent ? "left" : "right")}
                in={isVisible}
                timeout={1000}
                style={{ transitionDelay: '200ms' }}
            >
                <Box
                    sx={{
                        flex: { xs: 'none', md: 0.8 },
                        position: 'relative',
                        width: imageWidth || defaultWidth,
                        height: imageHeight || defaultHeight,
                        maxWidth: {
                            xs: '320px',
                            sm: '380px',
                            md: '520px',
                            lg: '580px',
                            xl: '640px'
                        },
                        borderRadius: {
                            xs: '16px',
                            sm: '20px',
                            md: '24px',
                            lg: '28px'
                        },
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        mx: { xs: 'auto', md: 0 },
                        '&:hover': {
                            transform: {
                                xs: 'scale(1.02)',
                                md: 'translateY(-8px) scale(1.02)'
                            }
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority={false}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transition: 'all 0.4s ease',
                            opacity: imageLoaded ? 1 : 0,
                        }}
                        onLoad={handleImageLoad}
                    />
                </Box>
            </Slide>

            <Fade
                in={isVisible}
                timeout={1200}
                style={{ transitionDelay: '400ms' }}
            >
                <Box
                    sx={{
                        flex: { xs: 'none', md: 1 },
                        width: { xs: '100%', md: 'auto' },
                        textAlign: {
                            xs: 'center',
                            sm: 'center',
                            md: flipContent ? 'right' : 'left'
                        },
                        pl: {
                            md: flipContent ? 0 : 2,
                            lg: flipContent ? 0 : 3
                        },
                        pr: {
                            md: flipContent ? 2 : 0,
                            lg: flipContent ? 3 : 0
                        },
                        px: { xs: 1, sm: 2, md: 0 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%'
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: { xs: 800, md: 900 },
                            mb: { xs: 2, sm: 2.5, md: 3, lg: 4 },
                            fontSize: {
                                xs: '1.75rem',
                                sm: '2.25rem',
                                md: '2.75rem',
                                lg: '3.5rem',
                                xl: '4rem'
                            },
                            lineHeight: { xs: 1.2, sm: 1.3, md: 1.2 },
                            color: 'var(--text-primary)',
                            background: 'linear-gradient(135deg, var(--text-primary), var(--primary-color))',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: isInView ? 'fadeInUp 1s ease-out' : 'none',
                            '@keyframes fadeInUp': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(40px)'
                                },
                                '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0)'
                                }
                            }
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: {
                                xs: '1rem',
                                sm: '1.125rem',
                                md: '1.25rem',
                                lg: '1.375rem',
                                xl: '1.5rem'
                            },
                            lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                            color: 'var(--text-secondary)',
                            mb: buttonText ? { xs: 3, sm: 3.5, md: 4, lg: 5 } : 0,
                            maxWidth: { xs: '100%', md: '90%', lg: '85%' },
                            mx: { xs: 'auto', md: flipContent ? 'auto' : 0 },
                            ml: { md: flipContent ? 'auto' : 0 },
                            animation: isInView ? 'fadeInUp 1s ease-out 0.2s both' : 'none',
                            '@keyframes fadeInUp': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(40px)'
                                },
                                '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0)'
                                }
                            }
                        }}
                    >
                        {description}
                    </Typography>

                    {buttonText && (
                        <Box
                            sx={{
                                animation: isInView ? 'fadeInUp 1s ease-out 0.4s both' : 'none',
                                display: 'flex',
                                justifyContent: {
                                    xs: 'center',
                                    md: flipContent ? 'flex-end' : 'flex-start'
                                },
                                '@keyframes fadeInUp': {
                                    '0%': {
                                        opacity: 0,
                                        transform: 'translateY(40px)'
                                    },
                                    '100%': {
                                        opacity: 1,
                                        transform: 'translateY(0)'
                                    }
                                }
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleButtonClick}
                                sx={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                    px: { xs: 4, sm: 5, md: 6, lg: 7 },
                                    py: { xs: 1.5, sm: 2, md: 2.5 },
                                    fontSize: {
                                        xs: '0.875rem',
                                        sm: '1rem',
                                        md: '1.125rem',
                                        lg: '1.25rem'
                                    },
                                    fontWeight: 600,
                                    borderRadius: '50px !important',
                                    textTransform: 'none',
                                    minWidth: { xs: '140px', sm: '160px', md: '180px' },
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                        transition: 'left 0.5s ease',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'var(--primary-hover)',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                                        '&::before': {
                                            left: '100%',
                                        }
                                    },
                                    '&:active': {
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                    },
                                    '@media (hover: none)': {
                                        '&:hover': {
                                            transform: 'none',
                                            backgroundColor: 'var(--primary-color)',
                                        }
                                    }
                                }}
                            >
                                {buttonText}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default ImageWithText;