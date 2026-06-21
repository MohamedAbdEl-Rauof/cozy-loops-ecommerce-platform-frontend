'use client';

import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useMakerProducts } from '@/hooks/useMakers';

const FALLBACK_MAKER = '/images/shared/makers/defaultMaker.png';
const FALLBACK_PRODUCT = '/images/categories.png';

export default function MakerProfilePage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const { data, isLoading, isError, error } = useMakerProducts(slug);

  // A "not found" maker (404 from the API) should render the 404 boundary.
  const isNotFound = isError && /not found/i.test(String((error as Error)?.message ?? ''));
  useEffect(() => {
    if (isNotFound) notFound();
  }, [isNotFound]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2, bgcolor: 'white', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#FF7043' }} />
        <Typography color="text.secondary">Loading artisan…</Typography>
      </Box>
    );
  }

  if (isError || !data) {
    // notFound() handles the 404 case; this covers transient errors.
    return (
      <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'white', minHeight: '60vh' }}>
        <Typography variant="h6" color="text.secondary">
          We couldn&apos;t load this artisan. Please try again.
        </Typography>
      </Box>
    );
  }

  const { maker, products } = data;

  return (
    <Box component="section" sx={{ bgcolor: 'white', minHeight: '60vh' }}>
      {/* Profile header */}
      <Box sx={{ background: 'linear-gradient(135deg, #FFF1EA 0%, #FFE0B2 100%)', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Avatar
              src={maker.image || FALLBACK_MAKER}
              alt={maker.name}
              sx={{ width: 120, height: 120, boxShadow: 3, border: '4px solid #fff' }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight={700} sx={{ color: '#2c3e50' }}>
                {maker.name}
              </Typography>
              {maker.location && (
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: '#FF7043' }} />
                  <Typography variant="body1" color="text.secondary">{maker.location}</Typography>
                </Stack>
              )}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }} flexWrap="wrap">
                {maker.rating > 0 && (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Rating value={maker.rating} precision={0.1} readOnly size="small"
                      emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />} />
                    <Typography variant="body2" color="text.secondary">{maker.rating.toFixed(1)}</Typography>
                  </Stack>
                )}
                <Typography variant="body2" color="text.secondary">
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </Typography>
                {maker.website && (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LanguageIcon sx={{ fontSize: 18, color: '#FF7043' }} />
                    <MuiLink href={maker.website} target="_blank" rel="noopener noreferrer" underline="hover"
                      sx={{ color: '#FF5722', fontWeight: 500 }}>
                      Website
                    </MuiLink>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>

          {maker.aboutMe && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 3, maxWidth: 820, lineHeight: 1.7 }}>
              {maker.aboutMe}
            </Typography>
          )}

          {maker.specialties?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {maker.specialties.map((s) => (
                <Chip key={s} label={s} sx={{ bgcolor: '#fff', color: '#FF5722', fontWeight: 500 }} />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Products */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: '#2c3e50', mb: 1 }}>
          Crafted by {maker.name}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {products.length === 0 ? (
          <Typography color="text.secondary">This artisan has no products listed yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  component={Link}
                  href={`/categories/${product.category?.slug}/products/${product.slug}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    textDecoration: 'none',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.mainImage || product.images?.[0] || FALLBACK_PRODUCT}
                    alt={product.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT;
                    }}
                    sx={{ height: 220, width: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#2c3e50' }} noWrap>
                      {product.name}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 0.5 }}>
                      <Typography variant="h6" sx={{ color: '#FF5722', fontWeight: 700 }}>
                        ${product.price}
                      </Typography>
                      {product.priceBeforeDiscount && product.priceBeforeDiscount > product.price && (
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          ${product.priceBeforeDiscount}
                        </Typography>
                      )}
                    </Stack>
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
