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

interface FeaturedCategoryProps {
    title: string;
    isTitleCenter?: boolean;
    description: string;
    ctaText?: string;
    buttonText: string;
    onButtonClick?: string;
}

const FeaturedCategories = ({
    title,
    isTitleCenter = true,
    description,
    ctaText,
    buttonText,
    onButtonClick,
}: FeaturedCategoryProps) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    useEffect(() => {
        setIsVisible(true);
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
                width: '100%'
            }}
        >
            <Paper
                elevation={0}
                className={`featured-container ${isVisible ? 'visible' : ''}`}
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '600px', md: '800px' },
                    height: { xs: '200px', sm: '300px', md: '330px' },
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
                        src="/images/shared/featuredCategory/Subtract.png"
                        alt={title}
                        fill
                        priority
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 600px, 800px"
                        style={{
                            objectFit: 'cover',
                            transition: 'transform 1.5s ease-out',
                            transform: 'scale(1)'
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
                        justifyContent: 'center',
                        padding: { xs: 2, sm: 3, md: 4 },
                        opacity: 0,
                        transition: 'opacity 0.8s ease-out',
                        transitionDelay: '0.3s',
                        '&.visible': {
                            opacity: 1
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                            zIndex: -1
                        }
                    }}
                >
                    <Typography
                        variant={isXs ? "h6" : isSm ? "h5" : "h4"} 
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: { xs: 0.5, sm: 1, md: 2 }, 
                            textAlign: isTitleCenter ? 'center' : 'left',
                            width: isTitleCenter ? 'auto' : '100%',
                            color: theme.palette.text.primary,
                            px: { xs: 0.5, sm: 1, md: 2 } 
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant={isXs ? "caption" : isSm ? "body2" : "body1"} 
                        sx={{
                            textAlign: isTitleCenter ? 'center' : 'left',
                            maxWidth: { xs: '95%', sm: '90%', md: '85%' },
                            mb: { xs: 1, sm: 2, md: 3 }, 
                            px: { xs: 0.5, sm: 1, md: 2 }, 
                            textShadow: '0 1px 1px rgba(0,0,0,0.05)',
                            color: theme.palette.text.secondary,
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 2, sm: 3, md: 4 }, 
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: { xs: 1.2, sm: 1.4, md: 1.6 } 
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
                                px: { xs: 0.5, sm: 1, md: 2 }, 
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            <Typography
                                variant={isXs ? "caption" : isSm ? "body2" : "body1"} 
                                color="primary"
                            >
                                {ctaText}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box
                    className={`bottom-right-button ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease',
                        transitionDelay: '0.6s',
                        zIndex: 10,
                        '&.visible': {
                            opacity: 1,
                            transform: 'translateY(0)'
                        }
                    }}
                >
                    <Box
                        onClick={() => router.push(onButtonClick!)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: theme.palette.warning.main,
                            color: theme.palette.warning.contrastText,
                            borderRadius: { xs: '20px 0 0 0', sm: '25px 0 0 0', md: '30px 0 0 0' }, 
                            height: { xs: '28px', sm: '36px', md: '44px' },
                            width: '100%', 
                            maxWidth: { xs: '120px', sm: '160px', md: '200px' }, 
                            padding: { xs: '0 8px', sm: '0 12px', md: '0 16px' }, 
                            cursor: 'pointer',
                            fontWeight: 500,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': {
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                bgcolor: theme.palette.warning.dark,
                            },
                            '&:active': {
                                transform: 'scale(0.98)',
                            },
                        }}
                    >
                        <Typography
                            variant={isXs ? "caption" : "button"}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.85rem' },
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
            </Paper>
        </Box>
    );
};

export default FeaturedCategories;