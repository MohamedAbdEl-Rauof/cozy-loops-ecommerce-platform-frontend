'use client';

import { Box, Typography, Card, CardMedia, CardContent, Button, Grid, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

interface CategoriesGridProps {
  title: string;
  description: string;
  categories: Category[];
}

const CategoriesGrid = ({ title, description, categories }: CategoriesGridProps) => {
  const handleCategoryClick = (link: string) => {
    window.location.href = link;
  };

  const handleArrowClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      {/* Title and Description Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.75rem',
              lg: '3.25rem'
            },
            color: 'text.primary',
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
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                },
              }}
              onClick={() => handleCategoryClick(category.buttonLink)}
            >
              {/* Image Section with Arrow */}
              <Box sx={{ position: 'relative', height: 250 }}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArrowClick(category.buttonLink);
                  }}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'text.primary',
                    width: 40,
                    height: 40,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Content Section */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2, sm: 3 },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    fontSize: {
                      xs: '1.125rem',
                      sm: '1.25rem'
                    },
                    color: 'text.primary',
                  }}
                >
                  {category.title}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    flexGrow: 1,
                    lineHeight: 1.6,
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem'
                    }
                  }}
                >
                  {category.description}
                </Typography>

                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.buttonLink);
                  }}
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    py: 1.5,
                    px: 3,
                    borderRadius: '9999px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    alignSelf: 'flex-start',
                    '&:hover': {
                      backgroundColor: 'var(--primary-hover)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {category.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesGrid;