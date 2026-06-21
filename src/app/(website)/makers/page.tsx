'use client';

import { Refresh } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { useAllMakers } from '@/hooks/useMakers';

const FALLBACK_IMAGE = '/images/shared/makers/defaultMaker.png';

export default function MakersPage() {
  const { data: makers, isLoading, isError, refetch } = useAllMakers();

  return (
    <Box component="section" sx={{ bgcolor: 'white', minHeight: '60vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography variant="h3" fontWeight={700} sx={{ color: '#2c3e50', mb: 1.5 }}>
            Meet Our Artisans
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680, mx: 'auto' }}>
            The independent makers behind every handcrafted piece — each with their own story,
            craft, and corner of the world.
          </Typography>
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
            <CircularProgress sx={{ color: '#FF7043' }} />
            <Typography color="text.secondary">Loading artisans…</Typography>
          </Box>
        )}

        {isError && (
          <Alert
            severity="error"
            sx={{ maxWidth: 520, mx: 'auto' }}
            action={
              <Button color="inherit" size="small" startIcon={<Refresh />} onClick={() => refetch()}>
                Retry
              </Button>
            }
          >
            We couldn&apos;t load the artisans right now. Please try again.
          </Alert>
        )}

        {!isLoading && !isError && (
          <Grid container spacing={3}>
            {makers?.map((maker) => (
              <Grid key={maker._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={maker.image || FALLBACK_IMAGE}
                    alt={maker.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    sx={{ height: 200, width: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#2c3e50' }}>
                      {maker.name}
                    </Typography>
                    {maker.location && (
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5, mb: 1 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: '#FF7043' }} />
                        <Typography variant="body2" color="text.secondary">
                          {maker.location}
                        </Typography>
                      </Stack>
                    )}

                    {maker.rating > 0 && (
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                        <Rating
                          value={maker.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                          emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {maker.rating.toFixed(1)}
                        </Typography>
                      </Stack>
                    )}

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {maker.message || maker.aboutMe}
                    </Typography>

                    {maker.specialties?.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                        {maker.specialties.slice(0, 3).map((s) => (
                          <Chip key={s} label={s} size="small" sx={{ bgcolor: '#FFF1EA', color: '#FF5722' }} />
                        ))}
                      </Box>
                    )}

                    <Button
                      component={Link}
                      href={`/makers/${maker.slug}`}
                      variant="contained"
                      fullWidth
                      sx={{ mt: 'auto', bgcolor: '#FF7043', '&:hover': { bgcolor: '#FF5722' } }}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
