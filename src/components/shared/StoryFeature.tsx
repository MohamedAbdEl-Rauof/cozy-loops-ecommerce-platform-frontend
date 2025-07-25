'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Typography,
    Box,
    useTheme,
    Paper,
    useMediaQuery,
    Button,
    Chip,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ArrowForward, AutoStories } from '@mui/icons-material';
import {StoryFeatureData} from '@/types/home';

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
                py: { xs: 4, sm: 6, md: 8, lg: 10 },
                px: { xs: 2, sm: 3, md: 4 },
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
                    maxWidth: '1400px',
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
                            alignSelf: 'flex-start',
                            bgcolor: brandColors.primary,
                            color: 'white',
                            fontWeight: 500,
                            fontSize: { xs: '0.6rem', sm: '1rem', md: '1.125rem' },
                            px: { xs: 1, sm: 5, md: 6 },
                            py: { xs: 0.1, sm: 2, md: 2.5 },
                            borderRadius: '9999px !important',
                            textTransform: 'none',
                            boxShadow: `0 8px 24px rgba(255, 112, 67, 0.3)`,
                            border: `2px solid transparent`,
                            position: 'relative',
                            overflow: 'hidden',
                            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '0.6s',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
                                transition: 'left 0.6s ease',
                            },
                            '&:hover': {
                                bgcolor: brandColors.primaryHover,
                                transform: 'translateY(-3px) scale(1.05)',
                                boxShadow: `0 12px 32px rgba(255, 112, 67, 0.4), 0 6px 16px rgba(255, 229, 184, 0.3)`,
                                border: `2px solid ${brandColors.warm}`,
                                '&::before': {
                                    left: '100%',
                                }
                            },
                            '&:active': {
                                transform: 'translateY(-1px) scale(1.02)',
                                boxShadow: `0 6px 20px rgba(255, 112, 67, 0.35)`,
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
                        height: { xs: '300px', sm: '400px', md: '500px', lg: '600px' },
                        width: '100%',
                        display: 'block',
                        overflow: 'hidden',
                        opacity: isVisible ? 1 : 0,
                        order: { xs: 1, md: reverse ? 2 : 1 },
                        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transitionDelay: '0.4s',
                        transform: isVisible 
                            ? 'translateX(0) scale(1)' 
                            : `translateX(${reverse ? '-20px' : '20px'}) scale(0.95)`,
                        borderRadius: { xs: 3, md: reverse ? '24px 0 0 24px' : '0 24px 24px 0' },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, 
                                rgba(255, 229, 184, 0.1) 0%, 
                                rgba(255, 112, 67, 0.05) 50%, 
                                transparent 100%)`,
                            zIndex: 2,
                            borderRadius: 'inherit',
                            transition: 'opacity 0.3s ease',
                            opacity: isHovered ? 0.7 : 0.3,
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            borderRadius: 'inherit',
                            overflow: 'hidden',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `radial-gradient(circle at center, 
                                    transparent 30%, 
                                    rgba(255, 229, 184, 0.1) 70%)`,
                                zIndex: 1,
                                opacity: isHovered ? 1 : 0,
                                transition: 'opacity 0.4s ease',
                            }
                        }}
                    >
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
                                    borderRadius: 'inherit',
                                    filter: isHovered 
                                        ? 'brightness(1.1) contrast(1.05) saturate(1.1)' 
                                        : 'brightness(1) contrast(1) saturate(1)',
                                    transition: 'filter 0.4s ease',
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
                                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 55vw"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderRadius: 'inherit',
                                    filter: isHovered 
                                        ? 'brightness(1.1) contrast(1.05) saturate(1.1)' 
                                        : 'brightness(1) contrast(1) saturate(1)',
                                    transition: 'filter 0.4s ease',
                                }}
                                onError={(e) => {
                                    console.error("Image failed to load:", imageSrc);
                                }}
                            />
                        )}
                    </Box>

                    <Box
                        sx={{
                            position: 'absolute',
                            top: { xs: 20, sm: 30, md: 40 },
                            right: { xs: 20, sm: 30, md: 40 },
                            width: { xs: 60, sm: 80, md: 100 },
                            height: { xs: 60, sm: 80, md: 100 },
                            borderRadius: '50%',
                            background: `radial-gradient(circle, 
                                rgba(255, 229, 184, 0.8) 0%, 
                                rgba(255, 229, 184, 0.4) 50%, 
                                transparent 100%)`,
                            zIndex: 3,
                            opacity: isVisible ? 0.6 : 0,
                            transform: isVisible 
                                ? 'translateY(0) rotate(0deg)' 
                                : 'translateY(-20px) rotate(-10deg)',
                            transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '0.8s',
                            animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
                            '@keyframes float': {
                                '0%, 100%': {
                                    transform: 'translateY(0px) rotate(0deg)',
                                },
                                '50%': {
                                    transform: 'translateY(-10px) rotate(5deg)',
                                }
                            }
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: 30, sm: 40, md: 60 },
                            left: { xs: 20, sm: 30, md: 40 },
                            width: { xs: 40, sm: 60, md: 80 },
                            height: { xs: 40, sm: 60, md: 80 },
                            borderRadius: '50%',
                            background: `radial-gradient(circle, 
                                rgba(255, 112, 67, 0.6) 0%, 
                                rgba(255, 112, 67, 0.3) 50%, 
                                transparent 100%)`,
                            zIndex: 3,
                            opacity: isVisible ? 0.5 : 0,
                            transform: isVisible 
                                ? 'translateY(0) scale(1)' 
                                : 'translateY(20px) scale(0.8)',
                            transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            transitionDelay: '1s',
                            animation: isVisible ? 'floatReverse 8s ease-in-out infinite' : 'none',
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

                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, 
                            rgba(255, 251, 247, 0.1) 0%, 
                            rgba(255, 229, 184, 0.05) 25%, 
                            rgba(255, 112, 67, 0.03) 50%, 
                            transparent 75%)`,
                        zIndex: 1,
                        borderRadius: 'inherit',
                        opacity: isHovered ? 0.8 : 0.4,
                        transition: 'opacity 0.6s ease',
                        pointerEvents: 'none',
                    }}
                />
            </Paper>
        </Box>
    );
};

export default StoryFeature;