
'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CallMadeIcon from '@mui/icons-material/CallMade';

const craftCategories = [
    {
        name: 'Knitting',
        image: '/images/home/shopByCraft/accessories.png',
        fallbackImage: '/images/placeholder.jpg',
        link: '/category/knitting',
        description: 'Explore our knitting supplies'
    },
    {
        name: 'Crochet',
        image: '/images/home/shopByCraft/concrete.jpg',
        fallbackImage: '/images/placeholder.jpg',
        link: '/category/crochet',
        description: 'Discover crochet patterns & tools'
    },
    {
        name: 'Embroidery',
        image: '/images/home/shopByCraft/punch.jpg',
        fallbackImage: '/images/placeholder.jpg',
        link: '/category/embroidery',
        description: 'Beautiful embroidery supplies'
    },
    {
        name: 'Sewing',
        image: '/images/home/shopByCraft/tufting.png',
        fallbackImage: '/images/placeholder.jpg',
        link: '/category/sewing',
        description: 'Quality sewing materials'
    },
    {
        name: 'Yarn',
        image: '/images/home/shopByCraft/wall.png',
        fallbackImage: '/images/placeholder.jpg',
        link: '/category/yarn',
        description: 'Premium yarns for all projects'
    },
    {
        name: 'Accessories',
        image: '/images/home/shopByCraft/creations.jpg',
        fallbackImage: '/images/placeholder.jpg',
        link: '/category/accessories',
        description: 'Essential crafting accessories'
    },
];

const ShopByCraft = () => {
    const theme = useTheme();
    const router = useRouter();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [imgError, setImgError] = useState<Record<number, boolean>>({});

    // Handle image error by using fallback
    const handleImageError = (index: number) => {
        setImgError(prev => ({ ...prev, [index]: true }));
    };

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                width: '100%',
                py: { xs: 6, md: 8 }
            }}
        >
            <Box
                sx={{
                    px: { xs: 2, sm: 4 },
                    py: { xs: 2, sm: 3 },
                    maxWidth: '1200px',
                    mx: 'auto',
                }}
            >
                <Box sx={{ position: 'relative', mb: 5, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            position: 'relative',
                            display: 'inline-block',
                            color: theme.palette.text.primary,
                        }}
                    >
                        Shop by Craft
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            maxWidth: '600px',
                            mx: 'auto',
                            mt: 3,
                            px: 2
                        }}
                    >
                        Browse our handmade categories and find what inspires you.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)'
                        },
                        gridTemplateRows: {
                            xs: 'auto',
                            md: 'repeat(1, 800px)'
                        },
                        gridTemplateAreas: {
                            md: ` "item1 item3 item5" `
                        },
                        gap: { xs: 3, md: '0px 24px' },
                        maxWidth: '1400px',
                        mx: 'auto',
                        mb: 4,
                        height: { xs: 'auto', md: '800px' }
                    }}
                >
                    {craftCategories.map((category, index) => {

                        let gridArea, heightPercentage, top, marginTop;

                        switch (index) {
                            case 0:
                                gridArea = 'item1';
                                heightPercentage = '58%';
                                top = '0';
                                marginTop = 0;
                                break;
                            case 1:
                                gridArea = 'item1';
                                heightPercentage = '40%';
                                top = '60%';
                                marginTop = '5px';
                                break;
                            case 2:
                                gridArea = 'item3';
                                heightPercentage = '38%';
                                top = '0';
                                marginTop = 0;
                                break;
                            case 3:
                                gridArea = 'item3';
                                heightPercentage = '60%';
                                top = '40%';
                                marginTop = '5px';
                                break;
                            case 4:
                                gridArea = 'item5';
                                heightPercentage = '58%';
                                top = '0';
                                marginTop = 0;
                                break;
                            case 5:
                                gridArea = 'item5';
                                heightPercentage = '40%';
                                top = '60%';
                                marginTop = '5px';
                                break;
                            default:
                                gridArea = '';
                                heightPercentage = '100%';
                                top = '0';
                                marginTop = 0;
                        }
                        return (
                            <Box
                                key={index}
                                onClick={() => router.push(category.link)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                sx={{
                                    position: { xs: 'relative', md: 'absolute' },
                                    gridArea: { md: gridArea },
                                    height: {
                                        xs: '250px',
                                        sm: '300px',
                                        md: heightPercentage
                                    },
                                    width: {
                                        xs: '100%',
                                        md: 'calc(100% - 0px)'
                                    },
                                    top: { md: top },
                                    marginTop: { md: marginTop },
                                    left: { md: '0' },
                                    borderRadius: 13,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)',
                                    '&:hover': {
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                    },
                                    mb: { xs: 3, md: 0 }
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <Image
                                        src={imgError[index] ? category.fallbackImage : category.image}
                                        alt={category.name}
                                        width={500}
                                        height={500}
                                        priority={index < 3}
                                        onError={() => handleImageError(index)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            transition: 'transform 0.5s ease',
                                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                                        borderRadius: '50%',
                                        width: 36,
                                        height: 36,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                                        opacity: hoveredIndex === index ? 1 : 0.8,
                                        zIndex: 2,
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.9)',
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(category.link);
                                    }}
                                >
                                    <CallMadeIcon sx={{ color: 'white', fontSize: 20 }} />
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: -5,
                                        left: 0,
                                        maxWidth: '50%',
                                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: 3,
                                        padding: '17px 20px',
                                        transition: 'all 0.3s ease',
                                        transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{
                                            color: 'text.primary',
                                            mb: 0.5,
                                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                                        }}
                                    >
                                        {category.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {category.description}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default ShopByCraft;