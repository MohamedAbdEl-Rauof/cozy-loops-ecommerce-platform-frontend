import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';

const HeroSection: React.FC = () => {

  const productImages = [
    {
      src: "/images/home/sec-1/rethaferguson.png",
      alt: "Knitting craft with colorful yarn"
    },
    {
      src: "/images/home/sec-1/karolina.png",
      alt: "White ceramic sculpture"
    },
    {
      src: "/images/home/sec-1/hiteshchoudhary.png",
      alt: "Handwoven fabric pattern"
    },
    {
      src: "/images/home/sec-1/enginakyurt.png",
      alt: "Colorful embroidery work"
    },
    {
      src: "/images/home/sec-1/unsplash.png",
      alt: "Wooden loom weaving"
    },
    {
      src: "/images/home/sec-1/toochinda.png",
      alt: "Hands making pottery"
    }
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        bgcolor: '#FBE8CC'
      }}
    >
      <Container
        sx={{
          position: 'relative',
          zIndex: 10,
          pt: 8,
          pb: 12
        }}
      >
        {/* Text content */}
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '1000px',
            mx: 'auto',
            mb: 8
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: { xs: '2.75rem', md: '3.5rem', lg: '4.5rem' },
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.1875rem',
              color: '#1A2E35',
              mb: 3,
              maxWidth: '100%',
              mx: 'auto',
              position: 'relative',
            }}
          >
            Discover Handmade Treasures That Tell a Story
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: '#1A2E35',
              mb: 4
            }}
          >
            Support local artisans. Shop one-of-a-kind creations made with heart.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 4 }}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <MuiLink
              component={Link}
              href="/collection"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'var(--primary-color)', // orange-400
                color: 'white',
                borderRadius: '30px',
                py: { xs: 1.5, sm: 2 },
                px: { xs: 5, sm: 6 },
                minWidth: { xs: '200px', sm: '220px' },
                height: { xs: '48px', sm: '54px' },
                fontSize: { xs: '0.95rem', sm: '1rem' },
                fontWeight: 600,
                letterSpacing: '0.5px',
                boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.25), 0 4px 6px -2px rgba(249, 115, 22, 0.1)',
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
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                  opacity: 0,
                  transition: 'opacity 300ms ease',
                },
                '&:hover': {
                  bgcolor: 'var(--primary-hover)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.2)',
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
            </MuiLink>
            <MuiLink
              component={Link}
              href="/about"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'transparent',
                color: '#334155',
                borderRadius: '30px',
                py: { xs: 1.5, sm: 2 },
                px: { xs: 5, sm: 6 },
                minWidth: { xs: '200px', sm: '220px' },
                height: { xs: '48px', sm: '54px' },
                fontSize: { xs: '0.95rem', sm: '1rem' },
                fontWeight: 600,
                letterSpacing: '0.5px',
                textDecoration: 'none',
                textTransform: 'none',
                position: 'relative',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  width: '0',
                  height: '2px',
                  backgroundColor: '#334155',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'translateX(-50%)',
                },
                '&:hover': {
                  color: '#1E293B', // slate-800
                  borderColor: '#94A3B8', // slate-400
                  bgcolor: 'rgba(203, 213, 225, 0.1)', // very light slate background
                  '&::after': {
                    width: '60%',
                  }
                },
                '&:active': {
                  transform: 'translateY(1px)',
                }
              }}
            >
              Learn More
            </MuiLink>
          </Stack>
        </Box>
      </Container>

      {/* Wave transition to white */}
      <Box sx={{ position: 'relative' }}>
        {/* Wave SVG */}
        <Box sx={{ width: '100%' }}>
          <svg
            style={{ width: '100%', height: 'auto' }}
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C480,150 960,150 1440,0 L1440,200 L0,200 Z"
              fill="white"
            />
          </svg>
        </Box>

        {/* Product images */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            width: '100%',
            overflow: 'hidden',
            mt: 3
          }}
        >
          <Box sx={{ width: '100%', px: { xs: 2, md: 0 } }}>
            {/* Desktop U-shaped arrangement */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                gap: 5,
                alignItems: 'center',
                maxWidth: '100vw',
                transform: 'translateX(-5%)',
                ml: '-5%',
                mr: '-5%',
                flexDirection: 'row-reverse', // Make items start from right
                justifyContent: 'flex-start' // Align to the right
              }}
            >
              {productImages.map((image, index, arr) => {
                // Calculate position along the U-shaped curve
                const totalImages = arr.length;

                // Since we're starting from right, we don't need to reverse the position calculation
                const position = index / (totalImages - 1); // 0 to 1 (right to left)

                // Create U-shaped curve using a parabola: y = a(x-h)² + k
                // Where (h,k) is the vertex of the parabola (0.5, -60)
                const verticalOffset = 60 * Math.pow(position - 0.5, 2) - 60;

                return (
                  <Box
                    key={`desktop-${index}`}
                    sx={{
                      position: 'relative',
                      minWidth: { md: '180px', lg: '200px' },
                      height: { md: '200px', lg: '250px' },
                      overflow: 'hidden',
                      border: '4px solid white',
                      borderRadius: '16px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transform: `translateY(${verticalOffset}px)`,
                      zIndex: Math.abs(index - Math.floor(totalImages / 2)),
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: `translateY(${verticalOffset}px) scale(1.05)`,
                      }
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 130px, (max-width: 1200px) 180px, 200px"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px' // Slightly smaller than container to avoid edge issues
                      }}
                      priority={index < 3} // Load first 3 images with priority
                    />
                  </Box>
                );
              })}
            </Box>

            {/* Mobile centered arrangement */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexWrap: 'nowrap',
                gap: 1.5,
                overflowX: 'auto',
                pb: 2,
                flexDirection: 'row-reverse', // Make items start from right
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              {productImages.map((image, index) => (
                <Box
                  key={`mobile-${index}`}
                  sx={{
                    position: 'relative',
                    minWidth: { xs: '130px', sm: '150px' },
                    height: { xs: '130px', sm: '150px' },
                    overflow: 'hidden',
                    border: '4px solid white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;