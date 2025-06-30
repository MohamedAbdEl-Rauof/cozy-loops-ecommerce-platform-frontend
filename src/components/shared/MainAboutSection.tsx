'use client';

import { Box, Typography, Fade, Slide } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const MainAboutSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 30);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                px: { xs: 2, sm: 4 },
                width: '100%'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: { xs: 4, md: 6 }
                }}
            >
                <Fade in={isVisible} timeout={700}>
                    <Box>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{
                                fontWeight: 'bold',
                                mb: 3,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                background: '#000000',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
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
                            Every Stitch Tells a Story
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                lineHeight: 1.7,
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
                            At Cozy Loops, we believe that handmade is more than a product—it's a feeling.
                            A reminder that care, creativity, and culture still have a place in the fast-paced
                            world we live in. We're here to connect you with local artisans across Egypt and
                            the Middle East, each with a story to tell and a craft to share.
                        </Typography>
                    </Box>
                </Fade>

                <Slide direction="up" in={isVisible} timeout={600}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: '300px', sm: '400px', md: '600px' },
                            borderRadius: '20px',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-10px)',
                                '& img': {
                                    transform: 'scale(1.1)',
                                }
                            }
                        }}
                    >
                        <Image
                            src="/images/about/mainAbout.png"
                            alt="About Cozy Loops hero"
                            fill
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                transition: 'transform 0.7s ease',

                            }}
                            priority
                        />
                    </Box>
                </Slide>
            </Box>
        </Box>
    );
};

export default MainAboutSection;