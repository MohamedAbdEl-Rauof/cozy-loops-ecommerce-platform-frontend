'use client';

import { ArrowForward, AutoStories } from '@mui/icons-material';
import {
    Typography,
    Box,
    useTheme,
    Paper,
    useMediaQuery,
    Button,
    Chip,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { StoryFeatureData } from '@/types/home';

const StoryFeature = ({
    title,
    description,
    buttonText,
    imageSrc,
    imageAlt,
    onButtonClick,
    badge,
    reverse = false,
}: StoryFeatureData) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const brandColors = {
        primary: '#FF7043',
        primaryHover: '#FF5722',
        warm: '#FFE5B8',
        warmDark: '#FFD699',
        text: '#2C1810',
        textSecondary: '#5D4037',
        background: '#FFFBF7',
    };

    const handleButtonClick = () => {
        if (onButtonClick) {
            router.push(onButtonClick);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: brandColors.background,

                width: '100%',
                minHeight: { xs: 'auto', md: '70vh' },
            }}
        >
            <Paper
                elevation={0}
                className={`story-feature-container ${isVisible ? 'visible' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        md: reverse ? 'row-reverse' : 'row'
                    },
                    overflow: 'hidden',
                    borderRadius: { xs: 3, sm: 4, md: 5 },
                    bgcolor: 'transparent',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: isHovered
                        ? `0 20px 60px rgba(255, 112, 67, 0.15), 0 8px 32px rgba(255, 229, 184, 0.2)`
                        : `0 10px 40px rgba(255, 112, 67, 0.08), 0 4px 20px rgba(255, 229, 184, 0.1)`,
                }}
            >
                <Box
                    className={`content-section ${isVisible ? 'visible' : ''}`}
                    sx={{
                        flex: { xs: '1', md: '0 0 45%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: {
                            xs: 4,
                            sm: 5,
                            md: 6,
                            lg: 8
                        },
                        bgcolor: 'white',
                        position: 'relative',
                        zIndex: 2,
                        opacity: isVisible ? 1 : 0,
                        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionDelay: '0.3s',
                        transform: isVisible
                            ? 'translateX(0)'
                            : `translateX(${reverse ? '20px' : '-20px'})`,
                        borderRadius: { xs: 3, md: reverse ? '0 24px 24px 0' : '24px 0 0 24px' },
                        boxShadow: `0 8px 32px rgba(255, 229, 184, 0.15)`,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.warm})`,
                            borderRadius: '2px 2px 0 0',
                        }
                    }}
                >
                    <Chip
                        icon={<AutoStories sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                        label={badge}
                        size={isXs ? "small" : "medium"}
                        sx={{
                            mb: { xs: 2, sm: 3, md: 4 },
                            alignSelf: 'flex-start',
                            bgcolor: `rgba(255, 229, 184, 0.9)`,
                            color: brandColors.text,
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${brandColors.warm}`,
                            transition: 'all 0.3s ease',
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            '&:hover': {
                                bgcolor: brandColors.warm,
                                transform: 'translateY(-2px) scale(1.05)',
                                boxShadow: `0 4px 12px rgba(255, 229, 184, 0.4)`,
                            }
                        }}
                    />

                    <Typography
                        variant={isXs ? "h4" : isSm ? "h3" : isMd ? "h2" : "h1"}
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            mb: { xs: 2, sm: 3, md: 4 },
                            color: brandColors.text,
                            fontFamily: '"Playfair Display", serif',
                            lineHeight: { xs: 1.2, md: 1.3 },
                            fontSize: {
                                xs: '1.75rem',
                                sm: '2.25rem',
                                md: '2.75rem',
                                lg: '3.25rem'
                            },
                            letterSpacing: '-0.02em',
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '0.4s',
                            background: `linear-gradient(135deg, ${brandColors.text}, ${brandColors.textSecondary})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant={isXs ? "body1" : "h6"}
                        sx={{
                            mb: { xs: 3, sm: 4, md: 5 },
                            color: brandColors.textSecondary,
                            lineHeight: { xs: 1.6, md: 1.7 },
                            fontSize: {
                                xs: '1rem',
                                sm: '1.125rem',
                                md: '1.25rem'
                            },
                            fontWeight: 400,
                            maxWidth: '90%',
                            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '0.5s',
                        }}
                    >
                        {description}
                    </Typography>

                    <Button
                        variant="contained"
                        endIcon={<ArrowForward />}
                        onClick={handleButtonClick}
                        sx={{
                            alignSelf: 'start',
                            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.125rem' },
                            px: { xs: 4, sm: 5, md: 6 },
                            py: { xs: 1.5, sm: 2, md: 2.5 },
                            minWidth: { xs: '160px', sm: '180px', md: '200px' },
                            height: { xs: '44px', sm: '52px', md: '56px' },
                            borderRadius: '30px !important',
                            textTransform: 'none',
                            letterSpacing: '0.5px',
                            boxShadow: '0 10px 25px -5px rgba(255, 112, 67, 0.4), 0 8px 10px -6px rgba(255, 112, 67, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: `1px solid rgba(255, 229, 184, 0.3)`,
                            position: 'relative',
                            overflow: 'hidden',
                            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: '0.02s',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0))',
                                opacity: 0,
                                transition: 'opacity 300ms ease',
                            },
                            '&:hover': {
                                background: 'linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-color) 100%)',
                                transform: 'translateY(-3px) scale(1.05)',
                                boxShadow: '0 20px 25px -5px rgba(255, 112, 67, 0.5), 0 10px 10px -5px rgba(255, 112, 67, 0.3)',
                                '&::before': {
                                    opacity: 1,
                                }
                            },
                            '&:active': {
                                transform: 'translateY(-1px) scale(1.02)',
                                boxShadow: '0 5px 10px -3px rgba(255, 112, 67, 0.3), 0 2px 3px -2px rgba(255, 112, 67, 0.1)',
                            }
                        }}
                    >
                        {buttonText}
                    </Button>
                </Box>

                <Box
                    className={`image-section ${isVisible ? 'visible' : ''}`}
                    sx={{
                        flex: { xs: '1', md: '0 0 55%' },
                        position: 'relative',
                        height: {
                            xs: '300px',
                            sm: '400px',
                            md: '500px',
                            lg: '600px'
                        },
                        minHeight: { xs: '250px', sm: '350px' },
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        opacity: isVisible ? 1 : 0,
                        order: { xs: 1, md: reverse ? 2 : 1 },
                        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionDelay: '0.4s',
                        transform: isVisible
                            ? 'translateX(0) scale(1)'
                            : `translateX(${reverse ? '-20px' : '20px'}) scale(0.95)`,
                        borderRadius: { xs: 3, md: reverse ? '24px 0 0 24px' : '0 24px 24px 0' },
                        backgroundColor: '#f5f5f5',
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            priority
                            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 55vw"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: 'inherit',
                                filter: isHovered
                                    ? 'brightness(1.1) contrast(1.05) saturate(1.1)'
                                    : 'brightness(1) contrast(1) saturate(1)',
                                transition: 'all 0.4s ease',
                                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(245, 245, 245, 0.8)',
                            zIndex: 1,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: brandColors.textSecondary,
                                fontWeight: 500,
                            }}
                        >
                            Loading...
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, 
                                rgba(255, 229, 184, 0.1) 0%, 
                                rgba(255, 112, 67, 0.05) 50%, 
                                transparent 100%)`,
                            opacity: isHovered ? 0.7 : 0.3,
                            transition: 'opacity 0.3s ease',
                            borderRadius: 'inherit',
                            pointerEvents: 'none',
                            zIndex: 2,
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: 20, sm: 30, md: 40, lg: 60 },
                            left: { xs: 15, sm: 20, md: 30, lg: 40 },
                            width: { xs: 30, sm: 40, md: 60, lg: 80 },
                            height: { xs: 30, sm: 40, md: 60, lg: 80 },
                            borderRadius: '50%',
                            background: `radial-gradient(circle, 
                                rgba(255, 112, 67, 0.6) 0%, 
                                rgba(255, 112, 67, 0.3) 50%, 
                                transparent 100%)`,
                            opacity: isVisible ? 0.5 : 0,
                            transform: isVisible
                                ? 'translateY(0) scale(1)'
                                : 'translateY(20px) scale(0.8)',
                            transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '1s',
                            animation: isVisible ? 'floatReverse 8s ease-in-out infinite' : 'none',
                            zIndex: 3,
                            '@keyframes floatReverse': {
                                '0%, 100%': {
                                    transform: 'translateY(0px) scale(1)',
                                },
                                '50%': {
                                    transform: 'translateY(8px) scale(1.1)',
                                }
                            }
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default StoryFeature;