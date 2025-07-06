'use client';

import { Box, Typography, Button, Grid, IconButton, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CallMadeIcon from '@mui/icons-material/CallMade';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  isMaker?: boolean;
  buttonText: string;
  buttonLink: string;
}

interface CategoriesData {
  title: string;
  description: string;
  categories: Category[];
}

interface CategoriesGridProps {
  categoriesData: CategoriesData;
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ categoriesData }) => {
  const { title, description, categories } = categoriesData;
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (link: string) => {
    router.push(link);
  };

  const handleArrowClick = (link: string) => {
    router.push(link);
  };

   const handleImageLoad = (categoryId: string) => {
    setImageLoaded(prev => {
      const newSet = new Set(prev);
      newSet.add(categoryId);
      return newSet;
    });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 4, sm: 6, md: 8 },
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '0.2s',
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 800,
            mb: { xs: 2, sm: 3 },
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.75rem',
              lg: '3.25rem'
            },
            background: 'linear-gradient(135deg, var(--text-primary), var(--primary-color))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, var(--primary-color), var(--primary-overlay))',
              borderRadius: '2px',
            }
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: '1rem',
              sm: '1.125rem',
              md: '1.25rem'
            },
            color: 'var(--text-secondary)',
            mx: 'auto',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}
        >
          {description}
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}>
        {categories.map((category, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={category.id}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                width: '100%',
                maxWidth: {
                  xs: '320px',
                  sm: '340px',
                  md: '360px',
                  lg: '400px'
                },
                mx: 'auto',
                flexDirection: 'column',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: `${0.3 + index * 0.1}s`,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
              onClick={() => handleCategoryClick(category.buttonLink)}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: {
                    xs: 320,
                    sm: 360,
                    md: 380,
                    lg: 420
                  },
                  mb: { xs: 2.5, sm: 3, md: 3.5 },
                  borderRadius: '24px !important',
                  overflow: 'hidden',
                  boxShadow: hoveredCard === category.id
                    ? '0 20px 60px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.1)'
                    : '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: hoveredCard === category.id
                      ? 'linear-gradient(135deg, rgba(0,0,0,0.1), transparent)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }
                }}
              >
                {!imageLoaded.has(category.id) && (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      borderRadius: '24px',
                    }}
                  />
                )}

                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: hoveredCard === category.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onLoad={() => handleImageLoad(category.id)}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    zIndex: 2,
                  }}
                >

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArrowClick(category.buttonLink);
                    }}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      color: 'var(--text-primary)',
                      width: 40,
                      height: 40,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1) rotate(45deg)',
                        color: 'var(--primary-color)',
                      },
                    }}
                  >
                    <CallMadeIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: hoveredCard === category.id
                      ? 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                  }}
                />
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  px: { xs: 1, sm: 1.5 },
                  transform: hoveredCard === category.id ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 1.5, sm: 2 },
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.25rem',
                      md: '1.35rem'
                    },
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'var(--primary-color)',
                    }
                  }}
                >
                  {category.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-secondary)',
                    mb: { xs: 2.5, sm: 3, md: 3.5 },
                    flexGrow: 1,
                    lineHeight: 1.6,
                    fontSize: {
                      xs: '0.9rem',
                      sm: '0.95rem',
                      md: '1rem'
                    },
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {category.description}
                </Typography>

                <Button
                  variant={category.isMaker ? "text" : "contained"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.buttonLink);
                  }}
                  sx={{
                    ...(category.isMaker ? {
                      color: 'var(--primary-color)',
                      backgroundColor: 'transparent',
                      py: { xs: 1, sm: 1.25 },
                      px: 0,
                      textDecoration: 'underline',
                      textUnderlineOffset: '6px',
                      textDecorationThickness: '2px',
                      borderRadius: '0 !important',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem'
                      },
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      alignSelf: 'flex-start',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'var(--primary-hover)',
                        textDecorationThickness: '3px',
                        textUnderlineOffset: '8px',
                        transform: 'translateX(8px)',
                        '&::before': {
                          left: '100%',
                        }
                      },
                    } : {
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      py: { xs: 1.5, sm: 1.75 },
                      px: { xs: 3, sm: 3.5 },
                      borderRadius: '50px !important',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem'
                      },
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'var(--primary-hover)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                        '&::before': {
                          transform: 'translateX(100%)',
                        }
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }
                    })
                  }}
                >
                  {category.buttonText}
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {categories.length === 0 && (
        <Grid container spacing={{ xs: 2, sm: 3, md: 3.5, lg: 4 }}>
          {[1, 2, 3].map((index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
              <Box
                sx={{
                  maxWidth: {
                    xs: '320px',
                    sm: '340px',
                    md: '360px',
                    lg: '400px'
                  },
                  mx: 'auto',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={420}
                  sx={{
                    borderRadius: '24px',
                    mb: 3,
                  }}
                />
                <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: '50px' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </Box>
  );
};

export default CategoriesGrid;