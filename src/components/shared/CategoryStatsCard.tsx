'use client';

import { Container, Card, CardContent, Chip, Typography, Grid } from '@mui/material';

import { CategoryStatsCardProps } from '@/types/category';

export default function CategoryStatsCard({
  categoryName,
  description,
  totalProducts,
  totalArtisans,
  rating = 4.8
}: CategoryStatsCardProps) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Card
        sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <Chip
            label={categoryName}
            sx={{
              bgcolor: 'var(--primary-color)',
              color: 'white',
              fontWeight: 600,
              mb: 2,
              px: 2,
              borderRadius: '12px',
              fontSize: '0.875rem'
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'var(--text-primary)',
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            {categoryName} Collection
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              mb: 3
            }}
          >
            {description}
          </Typography>

          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            <Grid size={{ xs:4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                {totalProducts}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                Products
              </Typography>
            </Grid>
            <Grid size={{ xs:4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                {totalArtisans}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                Artisans
              </Typography>
            </Grid>
            <Grid size={{ xs:4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                ⭐ {rating}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                Rating
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}