'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Button,
    Typography,
    Box,
    useTheme,
    Paper
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Define the props interface
interface FeaturedCategoryProps {
    title: string;
    description: string;
    ctaText: string;
    buttonText: string;
    imageSrc: string;
    onButtonClick?: () => void;
}

const FeaturedCategories = ({
    title = "The Art of Punch Needle",
    description = "Punch needle embroidery is a modern twist on a centuries-old technique. Using a simple tool and loads of imagination, artisans loop yarn through fabric to create lush, raised textures full of life. Each piece is stitched by hand, making every design truly one-of-a-kind.",
    ctaText = "Want to learn more?",
    buttonText = "Explore",
    imageSrc = "/images/shared/featuredCategory/Subtract.png",
    onButtonClick = () => console.log("Button clicked")
}: FeaturedCategoryProps) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set visible after component mounts for animations to trigger
        setIsVisible(true);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.paper',
                p: 3,
                overflow: 'hidden'
            }}
        >
            <Paper
                elevation={3}
                className={`featured-container ${isVisible ? 'visible' : ''}`}
                sx={{
                    position: 'relative',
                    width: '1200px',
                    height: '290px',
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
                    opacity: 0,
                    transform: 'translateY(20px)',
                    '&.visible': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                }}
            >
                {/* Background image with zoom effect */}
                <Box
                    className={`image-container ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        priority
                    />
                </Box>

                {/* Content overlay with fade-in effect */}
                <Box
                    className={`content-overlay ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(2px)',
                        opacity: 0,
                        transition: 'opacity 0.8s ease-out',
                        transitionDelay: '0.3s',
                        '&.visible': {
                            opacity: 1
                        }
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                            color: theme.palette.text.primary
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '90%',
                            mb: 4,
                            textShadow: '0 1px 1px rgba(0,0,0,0.05)',
                            color: theme.palette.text.secondary
                        }}
                    >
                        {description}
                    </Typography>

                    <Box
                        className="cta-text"
                        sx={{
                            fontWeight: 'medium',
                            textShadow: '0 1px 1px rgba(0,0,0,0.1)',
                            color: theme.palette.primary.main,
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <Typography variant="body1">{ctaText}</Typography>
                    </Box>
                </Box>

                {/* Bottom-right button with bounce effect */}
                <Box
                    className={`bottom-right-button ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'absolute',
                        bottom: -24,
                        right: -24,
                        bgcolor: 'background.paper',
                        borderRadius: '50%',
                        width: 130,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 2,
                        opacity: 0,
                        transform: 'translate(100px, 100px)',
                        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease',
                        transitionDelay: '0.6s',
                        '&.visible': {
                            opacity: 1,
                            transform: 'translate(0, 0)'
                        }
                    }}
                >
                    <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={onButtonClick}
                        endIcon={<ArrowForwardIcon />}
                        className="bounce-button"
                        sx={{
                            borderRadius: 28,
                            px: 2,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 'medium',
                            boxShadow: 1,
                            transition: 'transform 0.3s ease, background-color 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                transform: 'scale(0.95)',
                            }
                        }}
                    >
                        {buttonText}
                    </Button>
                </Box>

                {/* Top-left decorative element with rotate animation */}
                <Box
                    className={`top-left-decoration ${isVisible ? 'visible' : ''}`}
                    sx={{
                        position: 'absolute',
                        top: -24,
                        left: -24,
                        bgcolor: 'background.paper',
                        borderRadius: '50%',
                        width: 130,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translate(-100px, -100px) rotate(-20deg)',
                        transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease',
                        transitionDelay: '0.8s',
                        '&.visible': {
                            opacity: 1,
                            transform: 'translate(0, 0) rotate(0deg)'
                        }
                    }}
                >
                </Box>
            </Paper>

            {/* CSS Keyframes for animations */}
            <style jsx global>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .bounce-button:hover {
          animation: bounce 1s infinite ease-in-out;
        }
      `}</style>
        </Box>
    );
};

export default FeaturedCategories;