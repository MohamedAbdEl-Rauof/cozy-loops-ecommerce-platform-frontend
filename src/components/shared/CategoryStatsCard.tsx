'use client';

import { Star, People, Inventory } from '@mui/icons-material';
import { Card, CardContent, Chip, Typography, Grid, Box } from '@mui/material';

import { CategoryStatsCardProps } from '@/types/category';

export default function CategoryStatsCard({
  categoryName,
  description,
  totalProducts,
  totalArtisans,
  rating = 4.8
}: CategoryStatsCardProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        borderRadius: { xs: '16px', sm: '18px', md: '20px', lg: '24px' },
        boxShadow: {
          xs: '0 4px 16px rgba(0,0,0,0.06)',
          sm: '0 6px 24px rgba(0,0,0,0.07)',
          md: '0 8px 32px rgba(0,0,0,0.08)',
          lg: '0 12px 40px rgba(0,0,0,0.1)'
        },
        border: '1px solid rgba(255,255,255,0.2)',
        overflow: 'visible',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: { xs: 'translateY(-2px)', md: 'translateY(-4px)' },
          boxShadow: {
            xs: '0 8px 24px rgba(0,0,0,0.12)',
            md: '0 16px 48px rgba(0,0,0,0.15)'
          }
        },
        mx: { xs: 1, sm: 2, md: 0 },
        my: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: { xs: '3px', sm: '4px', md: '5px' },
          background: 'linear-gradient(90deg, var(--primary-color), var(--primary-hover), var(--warm-color))',
          borderRadius: { xs: '16px 16px 0 0', sm: '18px 18px 0 0', md: '20px 20px 0 0', lg: '24px 24px 0 0' }
        }}
      />

      <CardContent
        sx={{
          p: {
            xs: 2.5,
            sm: 3.5,
            md: 4,
            lg: 5
          },
          textAlign: 'center',
          pt: { xs: 3, sm: 4, md: 5 }
        }}
      >
        <Chip
          label={categoryName}
          sx={{
            bgcolor: 'var(--primary-color)',
            color: 'white',
            fontWeight: 600,
            mb: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 2, md: 2.5 },
            py: { xs: 0.5, sm: 0.75, md: 1 },
            borderRadius: { xs: '10px', sm: '12px', md: '14px' },
            fontSize: {
              xs: '0.75rem',
              sm: '0.8rem',
              md: '0.875rem',
              lg: '0.9rem'
            },
            height: { xs: '28px', sm: '32px', md: '36px' },
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 12px rgba(255, 112, 67, 0.3)'
            }
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontWeight: { xs: 600, sm: 650, md: 700 },
            color: 'var(--text-primary)',
            mb: { xs: 1.5, sm: 2, md: 2.5 },
            fontSize: {
              xs: '1.4rem',
              sm: '1.6rem',
              md: '2rem',
              lg: '2.5rem',
              xl: '2.8rem'
            },
            lineHeight: { xs: 1.3, sm: 1.25, md: 1.2 },
            letterSpacing: { xs: '-0.01em', md: '-0.02em' }
          }}
        >
          {categoryName} Collection
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--text-secondary)',
            maxWidth: { xs: '100%', sm: '500px', md: '600px', lg: '700px' },
            mx: 'auto',
            lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
            mb: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
            fontSize: {
              xs: '0.875rem',
              sm: '0.95rem',
              md: '1rem',
              lg: '1.1rem'
            },
            px: { xs: 1, sm: 2, md: 0 }
          }}
        >
          {description}
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column' },
                alignItems: 'center',
                justifyContent: { xs: 'space-between', sm: 'center' },
                gap: { xs: 1, sm: 0.5 },
                p: { xs: 1.5, sm: 1, md: 1.5 },
                borderRadius: { xs: '12px', md: '16px' },
                bgcolor: { xs: 'rgba(255, 112, 67, 0.05)', sm: 'transparent' },
                border: { xs: '1px solid rgba(255, 112, 67, 0.1)', sm: 'none' },
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: { xs: 'rgba(255, 112, 67, 0.08)', sm: 'rgba(255, 112, 67, 0.05)' },
                  transform: { sm: 'translateY(-2px)' }
                }
              }}
            >
              <Box sx={{ display: { xs: 'flex' }, alignItems: 'center', gap: 1 }}>
                <Inventory
                  sx={{
                    color: 'var(--primary-color)',
                    fontSize: {
                      xs: '1.2rem',
                      sm: '1.3rem',
                      md: '1.4rem',
                      lg: '1.6rem'
                    },
                    mb: { xs: 0, sm: 0.5 }
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: { xs: 600, sm: 700 },
                    color: 'var(--primary-color)',
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.3rem',
                      md: '1.5rem',
                      lg: '1.7rem'
                    }
                  }}
                >
                  {totalProducts}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--text-secondary)',
                  fontWeight: { xs: 500, sm: 600 },
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.85rem',
                    md: '0.9rem'
                  }
                }}
              >
                Products
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column' },
                alignItems: 'center',
                justifyContent: { xs: 'space-between', sm: 'center' },
                gap: { xs: 1, sm: 0.5 },
                p: { xs: 1.5, sm: 1, md: 1.5 },
                borderRadius: { xs: '12px', md: '16px' },
                bgcolor: { xs: 'rgba(255, 112, 67, 0.05)', sm: 'transparent' },
                border: { xs: '1px solid rgba(255, 112, 67, 0.1)', sm: 'none' },
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: { xs: 'rgba(255, 112, 67, 0.08)', sm: 'rgba(255, 112, 67, 0.05)' },
                  transform: { sm: 'translateY(-2px)' }
                }
              }}
            >
              <Box sx={{ display: { xs: 'flex' }, alignItems: 'center', gap: 1 }}>
                <People
                  sx={{
                    color: 'var(--primary-color)',
                    fontSize: {
                      xs: '1.2rem',
                      sm: '1.3rem',
                      md: '1.4rem',
                      lg: '1.6rem'
                    },
                    mb: { xs: 0, sm: 0.5 }
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: { xs: 600, sm: 700 },
                    color: 'var(--primary-color)',
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.3rem',
                      md: '1.5rem',
                      lg: '1.7rem'
                    }
                  }}
                >
                  {totalArtisans}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--text-secondary)',
                  fontWeight: { xs: 500, sm: 600 },
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.85rem',
                    md: '0.9rem'
                  }
                }}
              >
                Artisans
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column' },
                alignItems: 'center',
                justifyContent: { xs: 'space-between', sm: 'center' },
                gap: { xs: 1, sm: 0.5 },
                p: { xs: 1.5, sm: 1, md: 1.5 },
                borderRadius: { xs: '12px', md: '16px' },
                bgcolor: { xs: 'rgba(255, 112, 67, 0.05)', sm: 'transparent' },
                border: { xs: '1px solid rgba(255, 112, 67, 0.1)', sm: 'none' },
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: { xs: 'rgba(255, 112, 67, 0.08)', sm: 'rgba(255, 112, 67, 0.05)' },
                  transform: { sm: 'translateY(-2px)' }
                }
              }}
            >
              <Box sx={{ display: { xs: 'flex', sm: 'block' }, alignItems: 'center', gap: 1 }}>
                <Star
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    color: '#FFD700',
                    fontSize: '1.2rem'
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: { xs: 600, sm: 700 },
                    color: 'var(--primary-color)',
                    fontSize: {
                      xs: '1.1rem',
                      sm: '1.3rem',
                      md: '1.5rem',
                      lg: '1.7rem'
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <Star
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      color: '#FFD700',
                      fontSize: {
                        sm: '1.2rem',
                        md: '1.4rem',
                        lg: '1.6rem'
                      }
                    }}
                  />
                  {rating}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--text-secondary)',
                  fontWeight: { xs: 500, sm: 600 },
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.85rem',
                    md: '0.9rem'
                  }
                }}
              >
                Rating
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            top: { md: 20, lg: 24 },
            right: { md: 20, lg: 24 },
            width: { md: 60, lg: 80 },
            height: { md: 60, lg: 80 },
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 112, 67, 0.1), rgba(255, 229, 184, 0.2))',
            opacity: 0.6,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />

        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'absolute',
            bottom: 20,
            left: 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 229, 184, 0.3), rgba(255, 112, 67, 0.1))',
            opacity: 0.4,
            animation: 'pulse 4s ease-in-out infinite reverse'
          }}
        />
      </CardContent>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </Card>
  );
}