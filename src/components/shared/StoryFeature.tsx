'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Typography,
    Box,
    useTheme,
    Paper,
    useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface StoryFeatureProps {
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
    onButtonClick?: string;
}

const StoryFeature = ({
    title,
    description,
    buttonText,
    imageSrc,
    imageAlt,
    onButtonClick,
}: StoryFeatureProps) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper',
                p: { xs: 2, sm: 3, md: 4 },
                width: '100%'
            }}
        >
            <Paper
                elevation={0}
                className={`story-feature-container ${isVisible ? 'visible' : ''}`}
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1600px',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    overflow: 'hidden',
                    borderRadius: { xs: 2, sm: 3 },
                    transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                    transform: 'translateY(20px)',
                    opacity: 0,
                    '&.visible': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                }}
            >
                <Box
                    className={`content-section ${isVisible ? 'visible' : ''}`}
                    sx={{
                        flex: { xs: '1', md: '0 0 50%', lg: '0 0 40%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        mt: { xs: 3, sm: 4, md: 10 },
                        padding: { xs: 3, sm: 4, md: 5 },
                        opacity: 0,
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                        transitionDelay: '0.3s',
                        transform: 'translateX(-20px)',
                        zIndex: 2,
                        position: 'relative',
                        backgroundColor: theme.palette.background.paper,
                        height: { xs: 'auto', md: '100%' },
                        minHeight: { xs: '200px', sm: '250px' },
                        '&.visible': {
                            opacity: 1,
                            transform: 'translateX(0)'
                        }
                    }}
                >
                    <Typography
                        variant={isXs ? "h5" : isSm ? "h4" : "h3"}
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: { xs: 1.5, sm: 2, md: 3 },
                            color: 'text.primary',
                            fontFamily: '"Playfair Display", serif',
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant={isXs ? "body2" : "body1"}
                        sx={{
                            mb: { xs: 2, sm: 3, md: 4 },
                            color: 'text.secondary',
                            lineHeight: { xs: 1.6, md: 1.8 },
                            maxWidth: '95%',
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 4, sm: 6, md: 'none' },
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {description}
                    </Typography>
                </Box>

                <Box
                    className={`image-section ${isVisible ? 'visible' : ''}`}
                    sx={{
                        flex: { xs: '1', md: '0 0 50%', lg: '0 0 60%' },
                        position: 'relative',
                        height: { xs: '200px', sm: '300px', md: '450px', lg: '500px' },
                        width: '100%',
                        display: 'block',
                        overflow: 'hidden',
                        opacity: 0,
                        order: { xs: 1, md: 1 },
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                        transitionDelay: '0.5s',
                        transform: 'translateX(20px)',
                        '&.visible': {
                            opacity: 1,
                            transform: 'translateX(0)'
                        }
                    }}
                >

                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50px',
                        overflow: 'hidden'
                    }}>
                        {isXs || isSm ? (
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    borderRadius: '16px'
                                }}
                                onError={(e) => {
                                    console.error("Image failed to load:", imageSrc);
                                }}
                            />
                        ) : (
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                priority
                                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 60vw"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderRadius: '16px'
                                }}
                                onError={(e) => {
                                    console.error("Image failed to load:", imageSrc);
                                }}
                            />
                        )}
                    </div>
                    <Box
                        className={`button-container ${isVisible ? 'visible' : ''}`}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            opacity: 0,
                            zIndex: 3,
                            transform: 'translateY(20px)',
                            transition: 'opacity 0.8s ease-out, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transitionDelay: '0.8s',
                            '&.visible': {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                bgcolor: 'background.paper', // White background
                                borderTopRightRadius: { xs: '30px', sm: '40px', md: '50px' },
                                width: { xs: '140px', sm: '180px', md: '220px' },
                                height: { xs: '50px', sm: '60px', md: '70px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Box
                                onClick={() => router.push(onButtonClick!)}
                                sx={{
                                    bgcolor: theme.palette.warning.main,
                                    color: theme.palette.warning.contrastText,
                                    cursor: 'pointer',
                                    borderRadius: { xs: '20px', sm: '25px', md: '30px' },
                                    height: { xs: '36px', sm: '42px', md: '48px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'left',
                                    width: { xs: '120px', sm: '160px', md: '170px' },
                                    padding: { xs: '0 12px', sm: '0 16px', md: '0 24px' },
                                    fontWeight: 500,
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    '&:hover': {
                                        bgcolor: theme.palette.warning.dark,
                                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
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
                                        fontWeight: 500,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                        lineHeight: 1.2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    {buttonText}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default StoryFeature;