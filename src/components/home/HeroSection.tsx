import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const productImages = [
  {
    src: "/images/home/heroSec/rethaferguson.png",
    alt: "Knitting craft with colorful yarn",
    category: "Fiber Arts"
  },
  {
    src: "/images/home/heroSec/karolina.png",
    alt: "White ceramic sculpture",
    category: "Ceramics"
  },
  {
    src: "/images/home/heroSec/hiteshchoudhary.png",
    alt: "Handwoven fabric pattern",
    category: "Textiles"
  },
  {
    src: "/images/home/heroSec/enginakyurt.png",
    alt: "Colorful embroidery work",
    category: "Embroidery"
  },
  {
    src: "/images/home/heroSec/unsplash.png",
    alt: "Wooden loom weaving",
    category: "Weaving"
  },
  {
    src: "/images/home/heroSec/toochinda.png",
    alt: "Hands making pottery",
    category: "Pottery"
  }
];

const HeroSection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
        minHeight: '50vh',
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
          top: { xs: '5%', md: '10%' },
          left: { xs: '3%', md: '5%' },
          width: { xs: '100px', sm: '120px', md: '150px' },
          height: { xs: '100px', sm: '120px', md: '150px' },
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
          filter: 'blur(20px)',
          animation: 'float 20s infinite ease-in-out',
          display: { xs: 'block', sm: 'block' }, 
          zIndex: 1,
          opacity: { xs: 0.5, md: 0.7 }, 
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '10%', md: '15%' },
          right: { xs: '5%', md: '8%' },
          width: { xs: '70px', sm: '85px', md: '100px' },
          height: { xs: '70px', sm: '85px', md: '100px' },
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.05) 100%)',
          filter: 'blur(15px)',
          animation: 'float2 15s infinite ease-in-out',
          display: { xs: 'block', sm: 'block' }, 
          zIndex: 1,
          opacity: { xs: 0.5, md: 0.7 }, 
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

      <Box
        sx={{
          position: 'absolute',
          top: { xs: '40%', md: '30%' },
          right: { xs: '8%', md: '15%' },
          width: { xs: '60px', sm: '80px', md: '120px' },
          height: { xs: '60px', sm: '80px', md: '120px' },
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,183,77,0.2) 0%, rgba(255,183,77,0.05) 100%)',
          filter: 'blur(25px)',
          animation: 'float3 18s infinite ease-in-out',
          display: { xs: 'block', sm: 'block' },
          zIndex: 1,
          opacity: { xs: 0.4, md: 0.6 },
          '@keyframes float3': {
            '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
            '50%': { transform: 'translateY(-15px) translateX(-15px) scale(1.1)' },
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
          gap: { xs: 4, sm: 6, lg: 4 },
          pt: { xs: 8, sm: 6, md: 0 }, 
          pb: { xs: 12, sm: 10, md: 0 },
          height: { md: '85vh' },
          maxHeight: { md: '900px' },
        }}
      >

        <Box
          sx={{
            width: { xs: '100%', lg: '90%' }, 
            mb: { xs: 2, sm: 0 }, 
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', lg: 'left' },
              maxWidth: { xs: '100%', lg: '100%' }, 
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
                opacity: 0,
                animation: 'fadeInUp 0.8s forwards',
                animationDelay: '0.2s',
                '@keyframes fadeInUp': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                },
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
                lineHeight: { xs: 1.2, md: 1.1 }, 
                letterSpacing: '-0.1rem',
                color: '#1A2E35',
                mb: 3,
                maxWidth: '100%',
                position: 'relative',
                textShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                opacity: 0,
                animation: 'fadeInUp 0.8s forwards',
                animationDelay: '0.4s',
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
                opacity: 0,
                animation: 'fadeInUp 0.8s forwards',
                animationDelay: '0.6s',
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
              sx={{
                mt: 3,
                opacity: 0,
                animation: 'fadeInUp 0.8s forwards',
                animationDelay: '0.8s',
              }}
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
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', lg: '55%' },
            height: { xs: '400px', sm: '450px', md: '500px', lg: '600px' },
            order: { xs: 2, lg: 2 },
            mt: { xs: 4, lg: 0 },
            opacity: 0,
            animation: 'fadeIn 1s forwards',
            animationDelay: '1s',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
        >
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
              const isActive = index === activeImageIndex;
              const distance = Math.abs(index - activeImageIndex);
              const distanceFromActive = distance > productImages.length / 2
                ? productImages.length - distance
                : distance;

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
                    width: { xs: '280px', sm: '320px', md: '360px', lg: '400px' },
                    height: { xs: '320px', sm: '360px', md: '400px', lg: '440px' },
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
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 400px"
                      style={{
                        objectFit: 'cover',
                        borderRadius: '15px',
                      }}
                      priority={index < 3}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
                        borderRadius: '0 0 15px 15px',
                      }}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: { xs: '16px', sm: '20px' },
                        color: 'white',
                        textAlign: 'left',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'inline-block',
                          backgroundColor: 'rgba(249, 115, 22, 0.85)',
                          color: 'white',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '4px',
                          fontSize: { xs: '0.65rem', sm: '0.7rem' },
                          fontWeight: 600,
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        }}
                      >
                        {image.category}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                          fontWeight: 600,
                          mb: 0.5,
                          textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                        }}
                      >
                        {`${image.category} Collection`}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          opacity: 0.9,
                          display: { xs: 'none', sm: 'block' },
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
                      >
                        Handcrafted with care by local artisans
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            sx={{
              position: 'absolute',
              bottom: { xs: '-40px', sm: '-30px' },
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
            }}
          >
            {productImages.map((_, index) => (
              <Box
                key={`dot-${index}`}
                onClick={() => setActiveImageIndex(index)}
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: index === activeImageIndex ? 'var(--primary-color)' : 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: index === activeImageIndex ? 'var(--primary-color)' : 'rgba(0,0,0,0.4)',
                    transform: 'scale(1.2)',
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '5px', md: '10px' },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          opacity: 0,
          animation: 'fadeInUp 0.8s forwards',
          animationDelay: '1.5s',
        }}
      >
        <IconButton
          onClick={scrollToNextSection}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#1A2E35',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
              '40%': { transform: 'translateY(-10px)' },
              '60%': { transform: 'translateY(-5px)' },
            }
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeroSection;  
