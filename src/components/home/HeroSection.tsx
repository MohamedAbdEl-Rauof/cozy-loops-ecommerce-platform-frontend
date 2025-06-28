import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Fade,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const productImages = [
  {
    src: "/images/home/sec-1/rethaferguson.png",
    alt: "Knitting craft with colorful yarn",
    category: "Fiber Arts"
  },
  {
    src: "/images/home/sec-1/karolina.png",
    alt: "White ceramic sculpture",
    category: "Ceramics"
  },
  {
    src: "/images/home/sec-1/hiteshchoudhary.png",
    alt: "Handwoven fabric pattern",
    category: "Textiles"
  },
  {
    src: "/images/home/sec-1/enginakyurt.png",
    alt: "Colorful embroidery work",
    category: "Embroidery"
  },
  {
    src: "/images/home/sec-1/unsplash.png",
    alt: "Wooden loom weaving",
    category: "Weaving"
  },
  {
    src: "/images/home/sec-1/toochinda.png",
    alt: "Hands making pottery",
    category: "Pottery"
  }
];

const HeroSection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #FBE8CC 0%, #FFF3E0 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
          zIndex: 1,
          background: 'url("/images/home/pattern-bg.png")',
          backgroundSize: 'cover',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)',
            animation: 'pulse 15s infinite alternate',
          },
          '@keyframes pulse': {
            '0%': { opacity: 0.3 },
            '100%': { opacity: 0.7 },
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
          filter: 'blur(20px)',
          animation: 'float 20s infinite ease-in-out',
          display: { xs: 'none', md: 'block' },
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.05) 100%)',
          filter: 'blur(15px)',
          animation: 'float2 15s infinite ease-in-out',
          display: { xs: 'none', md: 'block' },
          zIndex: 1,
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) translateX(0)' },
            '50%': { transform: 'translateY(-20px) translateX(20px)' },
          },
          '@keyframes float2': {
            '0%, 100%': { transform: 'translateY(0) translateX(0)' },
            '50%': { transform: 'translateY(20px) translateX(-20px)' },
          },
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 8, lg: 4 },
          pt: { xs: 6, md: 0 },
          pb: { xs: 10, md: 0 },
          height: { md: '100vh' },
          maxHeight: { md: '900px' },
        }}
      >
        <Fade in={isVisible} timeout={1000}>
          <Box
            sx={{
              textAlign: { xs: 'center', lg: 'left' },
              maxWidth: { xs: '100%', lg: '50%' },
              order: { xs: 1, lg: 1 },
              px: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                letterSpacing: '2px',
                mb: 2,
                display: 'block',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                textTransform: 'uppercase',
              }}
            >
              Artisan Marketplace
            </Typography>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.1rem',
                color: '#1A2E35',
                mb: 3,
                maxWidth: '100%',
                position: 'relative',
                textShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                '& span': {
                  color: 'var(--primary-color)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '5px',
                    left: 0,
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'rgba(249, 115, 22, 0.2)',
                    zIndex: -1,
                    borderRadius: '4px',
                  }
                }
              }}
            >
              Discover <span>Handmade</span> Treasures That Tell a Story
            </Typography>

            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.35rem' },
                color: '#475569',
                mb: 5,
                mt: 4,
                maxWidth: '600px',
                mx: { xs: 'auto', lg: 0 },
                lineHeight: 1.6,
              }}
            >
              Support local artisans and bring unique, handcrafted pieces into your home.
              Each creation carries the passion and skill of its maker.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 3, sm: 4 }}
              justifyContent={{ xs: 'center', lg: 'flex-start' }}
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <MuiLink
                component={Link}
                href="/collection"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)',
                  color: 'white',
                  borderRadius: '30px',
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 5, sm: 6 },
                  minWidth: { xs: '200px', sm: '220px' },
                  height: { xs: '48px', sm: '56px' },
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4), 0 8px 10px -6px rgba(249, 115, 22, 0.2)',
                  textDecoration: 'none',
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
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
                    transform: 'translateY(-3px)',
                    boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.5), 0 10px 10px -5px rgba(249, 115, 22, 0.3)',
                    textDecoration: 'none',
                    '&::before': {
                      opacity: 1,
                    }
                  },
                  '&:active': {
                    transform: 'translateY(1px)',
                    boxShadow: '0 5px 10px -3px rgba(249, 115, 22, 0.3), 0 2px 3px -2px rgba(249, 115, 22, 0.1)',
                  }
                }}
              >
                Shop the Collection
                <ArrowForwardIcon sx={{ ml: 1, fontSize: '1.2rem' }} />
              </MuiLink>
              <MuiLink
                component={Link}
                href="/about"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  color: '#334155',
                  border: '2px solid rgba(203, 213, 225, 0.5)',
                  borderRadius: '30px',
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 5, sm: 6 },
                  minWidth: { xs: '200px', sm: '220px' },
                  height: { xs: '48px', sm: '56px' },
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  textTransform: 'none',
                  position: 'relative',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 10px -2px rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    color: '#1E293B',
                    borderColor: '#94A3B8',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 6px 15px -3px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(1px)',
                    boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.05)',
                  }
                }}
              >
                Learn More
              </MuiLink>
            </Stack>
          </Box>
        </Fade>

        <Fade in={isVisible} timeout={1500} style={{ transitionDelay: '300ms' }}>
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', lg: '60%' },
              height: { xs: '450px', sm: '500px', md: '550px', lg: '650px' }, // Increased heights
              order: { xs: 2, lg: 2 },
              mt: { xs: 4, lg: 0 },
            }}
          >
            {/* 3D Floating Gallery */}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {productImages.map((image, index) => {
                // Calculate position based on index and active image
                const isActive = index === activeImageIndex;
                const distance = Math.abs(index - activeImageIndex);
                const distanceFromActive = distance > productImages.length / 2
                  ? productImages.length - distance
                  : distance;

                // Calculate 3D position
                const zPosition = isActive ? 0 : -100 - (distanceFromActive * 50);
                const xPosition = isActive ? 0 : (index > activeImageIndex ? 1 : -1) * (20 + (distanceFromActive * 10));
                const yPosition = isActive ? 0 : (distanceFromActive * 5);
                const scale = isActive ? 1 : Math.max(0.7, 1 - (distanceFromActive * 0.1));
                const rotation = isActive ? 0 : (index % 2 === 0 ? 3 : -3);
                const opacity = isActive ? 1 : Math.max(0.4, 1 - (distanceFromActive * 0.2));

                return (
                  <Box
                    key={`gallery-${index}`}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translateZ(${zPosition}px) translateX(${xPosition}px) translateY(${yPosition}px) scale(${scale}) rotate(${rotation}deg)`,
                      width: { xs: '300px', sm: '340px', md: '380px', lg: '420px' }, // Increased widths
                      height: { xs: '340px', sm: '380px', md: '420px', lg: '460px' }, // Increased heights
                      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      opacity: opacity,
                      zIndex: isActive ? 10 : 5 - distanceFromActive,
                      visibility: distanceFromActive > 3 ? 'hidden' : 'visible',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        borderRadius: '20px',
                        boxShadow: isActive
                          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                          : '0 15px 30px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                        border: '5px solid white',
                        transition: 'all 0.4s ease',
                        '&:hover': {
                          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
                          transform: 'scale(1.03)',
                        }
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                        style={{
                          objectFit: 'cover',
                          borderRadius: '15px',
                        }}
                        priority={index < 3}
                      />

                      {/* Gradient overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                          borderRadius: '0 0 15px 15px',
                        }}
                      />

                      {/* Image caption */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          padding: '20px',
                          color: 'white',
                          textAlign: 'left',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(249, 115, 22, 0.8)',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            mb: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {image.category}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            mb: 0.5,
                          }}
                        >
                          {image.alt}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Image navigation dots */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1.5,
                justifyContent: 'center',
                zIndex: 20,
              }}
            >
              {productImages.map((_, index) => (
                <Box
                  key={`dot-${index}`}
                  onClick={() => setActiveImageIndex(index)}
                  sx={{
                    width: index === activeImageIndex ? '12px' : '8px',
                    height: index === activeImageIndex ? '12px' : '8px',
                    borderRadius: '50%',
                    backgroundColor: index === activeImageIndex
                      ? 'var(--primary-color)'
                      : 'rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: index === activeImageIndex
                        ? 'var(--primary-color)'
                        : 'rgba(0,0,0,0.4)',
                      transform: 'scale(1.2)',
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '20px', md: '40px' },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(-10px)' },
          }
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#475569',
            mb: 1,
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          Scroll Down
        </Typography>
        <IconButton
          onClick={scrollToNextSection}
          sx={{
            color: '#475569',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(203, 213, 225, 0.5)',
            width: '40px',
            height: '40px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transform: 'scale(1.1)',
            },
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeroSection;