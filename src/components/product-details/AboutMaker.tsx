'use client';

import {
    LocationOn,
    Person,
    Store,
    Verified,
    CalendarToday,
    Palette,
    Handyman
} from '@mui/icons-material';
import {
    Typography,
    Box,
    useTheme,
    Paper,
    useMediaQuery,
    Button,
    Chip,
    Divider,
    Avatar,
    Rating,
    Stack
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { StoryFeatureProps } from '@/types/product';

const AboutMaker = ({
    title,
    makerInfo,
    buttonText1,
    buttonText2,
    imageSrc,
    imageAlt,
    onShopClick,
    onViewMoreClick,
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

    const handleButton1Click = () => {
        if (onShopClick) {
            onShopClick();
        } else {
            router.push('/artisan-shop');
        }
    };

    const handleButton2Click = () => {
        if (onViewMoreClick) {
            onViewMoreClick();
        } else {
            router.push('/artisan-products');
        }
    };

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
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    '&.visible': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                }}
            >
                <Box
                    className={`content-section ${isVisible ? 'visible' : ''}`}
                    sx={{
                        flex: { xs: '1', md: '0 0 50%', lg: '0 0 45%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: { xs: 3, sm: 4, md: 5, lg: 6 },
                        opacity: 0,
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                        transitionDelay: '0.3s',
                        transform: 'translateX(-20px)',
                        zIndex: 2,
                        position: 'relative',
                        backgroundColor: theme.palette.background.paper,
                        height: { xs: 'auto', md: '100%' },
                        minHeight: { xs: '400px', sm: '450px', md: '600px' },
                        '&.visible': {
                            opacity: 1,
                            transform: 'translateX(0)'
                        }
                    }}
                >
                    {/* Title */}
                    <Typography
                        variant={isXs ? "h5" : isSm ? "h4" : "h3"}
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: { xs: 2, sm: 3, md: 4 },
                            color: 'text.primary',
                            fontFamily: '"Playfair Display", serif',
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </Typography>

                    {/* Maker Info Card */}
                    <Box
                        sx={{
                            bgcolor: 'grey.50',
                            borderRadius: 2,
                            p: { xs: 2, sm: 3 },
                            mb: { xs: 3, sm: 4 },
                            border: '1px solid',
                            borderColor: 'grey.200'
                        }}
                    >
                        {/* Header with Avatar and Basic Info */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                            <Avatar
                                src={makerInfo.avatar}
                                alt={makerInfo.name}
                                sx={{
                                    width: { xs: 60, sm: 70 },
                                    height: { xs: 60, sm: 70 },
                                    border: '3px solid',
                                    borderColor: 'primary.main'
                                }}
                            >
                                <Person sx={{ fontSize: '2rem' }} />
                            </Avatar>

                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                        }}
                                    >
                                        {makerInfo.name}
                                    </Typography>
                                    {makerInfo.isVerified && (
                                        <Verified sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                                    )}
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <LocationOn sx={{ color: 'text.secondary', fontSize: '1rem' }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: { xs: '0.875rem', sm: '0.9rem' }
                                        }}
                                    >
                                        {makerInfo.location}
                                    </Typography>
                                </Box>

                                {/* Rating and Reviews */}
                                {makerInfo.rating && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Rating
                                            value={makerInfo.rating}
                                            readOnly
                                            size="small"
                                            precision={0.1}
                                        />
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            ({makerInfo.totalReviews || 0} reviews)
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        {/* Stats Row */}
                        {(makerInfo.yearsOfExperience || makerInfo.totalProducts || makerInfo.completedOrders) && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                mb: 3,
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'grey.100'
                            }}>
                                {makerInfo.yearsOfExperience && (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                            {makerInfo.yearsOfExperience}+
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Years Experience
                                        </Typography>
                                    </Box>
                                )}
                                {makerInfo.totalProducts && (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                            {makerInfo.totalProducts}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Products
                                        </Typography>
                                    </Box>
                                )}
                                {makerInfo.completedOrders && (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                            {makerInfo.completedOrders}+
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Orders Completed
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Specialties */}
                        {makerInfo.specialties && makerInfo.specialties.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Palette sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            fontSize: { xs: '0.875rem', sm: '0.9rem' }
                                        }}
                                    >
                                        Specialties
                                    </Typography>
                                </Box>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {makerInfo.specialties.map((specialty, index) => (
                                        <Chip
                                            key={index}
                                            label={specialty}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                fontSize: '0.75rem',
                                                height: '24px',
                                                mb: 0.5
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        <Divider sx={{ my: 2 }} />

                        {/* Mini Bio */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Person sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        fontSize: { xs: '0.875rem', sm: '0.9rem' }
                                    }}
                                >
                                    About Me
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                    fontStyle: 'italic',
                                    pl: 1,
                                    borderLeft: '3px solid',
                                    borderColor: 'primary.light',
                                    bgcolor: 'grey.25'
                                }}
                            >
                                &ldquo;{makerInfo.miniBio}&rdquo;
                            </Typography>
                        </Box>

                        {/* Joined Date */}
                        {makerInfo.joinedDate && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                                <CalendarToday sx={{ color: 'text.secondary', fontSize: '1rem' }} />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                                    }}
                                >
                                    Member since {makerInfo.joinedDate}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1.5, sm: 2 },
                        mt: 2
                    }}>
                        {/* Primary Button (Contained) */}
                        <Button
                            variant="contained"
                            onClick={handleButton1Click}
                            startIcon={<Store />}
                            sx={{
                                py: { xs: 1, sm: 1.2 },
                                px: { xs: 2.5, sm: 3 },
                                borderRadius: '99999px  !important',
                                textTransform: 'none',
                                fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                fontWeight: 600,
                                bgcolor: 'primary.main',
                                color: 'white',
                                minWidth: { xs: '100%', sm: '140px' },
                                maxHeight: { xs: 48, sm: 56 },
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                                }
                            }}
                        >
                            {buttonText1}
                        </Button>

                        {/* Secondary Button (Outlined) */}
                        <Button
                            variant="text"
                            onClick={handleButton2Click}
                            sx={{
                                py: { xs: 1, sm: 1.2 },
                                px: { xs: 2.5, sm: 3 },
                                borderRadius: '9999px !important',
                                textTransform: 'none',
                                fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                fontWeight: 600,
                                color: 'black',
                                minWidth: { xs: '100%', sm: '140px' },
                                maxHeight: { xs: 48, sm: 56 },
                                '&:hover': {
                                    transform: 'translateY(-1px)',
                                    textDecoration: 'underline',
                                }
                            }}
                        >
                            {buttonText2}
                        </Button>
                    </Box>

                    {/* Artisan Badge */}
                    <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                            label="Verified Artisan"
                            color="primary"
                            variant="outlined"
                            size="small"
                            icon={<Verified />}
                            sx={{
                                fontWeight: 500,
                                fontSize: '0.75rem'
                            }}
                        />
                        {makerInfo.yearsOfExperience && makerInfo.yearsOfExperience >= 5 && (
                            <Chip
                                label="Expert Craftsperson"
                                color="secondary"
                                variant="outlined"
                                size="small"
                                icon={<Handyman />}
                                sx={{
                                    fontWeight: 500,
                                    fontSize: '0.75rem'
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {/* Image Section */}
                <Box
                    className={`image-section ${isVisible ? 'visible' : ''}`}
                    sx={{
                        flex: { xs: '1', md: '0 0 50%', lg: '0 0 55%' },
                        position: 'relative',
                        height: { xs: '300px', sm: '400px', md: '600px', lg: '650px' },
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
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
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
                                    borderRadius: '20px'
                                }}
                                onError={() => {
                                    console.error("Image failed to load:", imageSrc);
                                }}
                            />
                        ) : (
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderRadius: '20px'
                                }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 55vw"
                                priority
                                onError={() => {
                                    console.error("Image failed to load:", imageSrc);
                                }}
                            />
                        )}

                        {/* Image Overlay with Gradient */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '40%',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                                borderRadius: '0 0 20px 20px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                p: 3
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'white',
                                    fontWeight: 500,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                }}
                            >
                                {imageAlt}
                            </Typography>
                        </Box>
                    </div>
                </Box>
            </Paper>
        </Box>
    );
};

export default AboutMaker;