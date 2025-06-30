'use client';

import { Box, Typography, Fade, Slide } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageWithTextProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    flipContent?: boolean;
    imageWidth?: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
    imageHeight?: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
}

const ImageWithText = ({
    title,
    description,
    imageSrc,
    imageAlt,
    flipContent,
    imageWidth,
    imageHeight
}: ImageWithTextProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const defaultWidth = { xs: '100%', sm: '90%', md: '100%' };
    const defaultHeight = {
        xs: '250px',
        sm: '350px',
        md: '450px',
        lg: '500px',
        xl: '600px'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: flipContent ? 'row' : 'row-reverse'
                },
                alignItems: 'center',
                gap: { xs: 3, sm: 4, md: 12 },
                mx: 'auto',
                pb: 10
            }}
        >
            {/* Image Section */}
            <Slide
                direction={flipContent ? "right" : "left"}
                in={isVisible}
                timeout={1200}
            >
                <Box
                    sx={{
                        flex: { xs: 'none', md: 1.5 },
                        position: 'relative',
                        width: imageWidth || defaultWidth,
                        height: imageHeight || defaultHeight,
                        borderRadius: { xs: '15px', sm: '18px', md: '20px' },
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        mx: { xs: 'auto', md: 0 },
                        '&:hover': {
                            transform: { xs: 'none', md: 'translateY(-8px)' },
                        }
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </Box>
            </Slide>

            {/* Text Content Section */}
            <Fade in={isVisible} timeout={1000}>
                <Box
                    sx={{
                        flex: { xs: 'none', md: 1 },
                        width: { xs: '100%', md: 'auto' },
                        textAlign: { xs: 'center', sm: 'center', md: 'left' },
                        pl: { md: flipContent ? 2 : 0 },
                        pr: { md: flipContent ? 0 : 2 },
                        px: { xs: 1, sm: 2, md: 0 }
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: 900,
                            mb: { xs: 2, sm: 2.5, md: 3 },
                            fontSize: {
                                xs: '1.5rem',
                                sm: '2rem',
                                md: '2.5rem',
                                lg: '3rem'
                            },
                            color: 'text.primary',
                            animation: 'fadeInUp 1s ease-out',
                            '@keyframes fadeInUp': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(30px)'
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
                                xs: '0.9rem',
                                sm: '1rem',
                                md: '1.2rem',
                                lg: '1.4rem'
                            },
                            lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                            color: '#000000',
                            animation: 'fadeInUp 1s ease-out 0.3s both',
                            '@keyframes fadeInUp': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(30px)'
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
                </Box>
            </Fade>

        </Box>
    );
};

export default ImageWithText;