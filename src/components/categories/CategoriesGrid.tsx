'use client';

import { Box, Typography, Card, Button, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import CallMadeIcon from '@mui/icons-material/CallMade';


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
    <Box >
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
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={category.id}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                width: '100%',
                maxWidth: {
                  xs: '280px',
                  sm: '300px',
                  md: '320px',
                  lg: '380px'
                },
                mx: 'auto',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
              onClick={() => handleCategoryClick(category.buttonLink)}
            >
              {/* Image Card */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: {
                    xs: 300,
                    sm: 340,
                    md: 370,
                    lg: 400
                  },
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: '20px !important',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                 
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArrowClick(category.buttonLink);
                  }}
                  sx={{
                    position: 'absolute',
                    top: { xs: 12, sm: 16 },
                    right: { xs: 12, sm: 16 },
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'text.primary',
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <CallMadeIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Content Section - Outside the image card */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  px: { xs: 0.5, sm: 1 },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: { xs: 1, sm: 1.5 },
                    fontSize: {
                      xs: '1rem',
                      sm: '1.125rem',
                      md: '1.25rem'
                    },
                    color: 'text.primary',
                    lineHeight: 1.3,
                  }}
                >
                  {category.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: { xs: 2, sm: 2.5, md: 3 },
                    flexGrow: 1,
                    lineHeight: 1.6,
                    fontSize: {
                      xs: '0.875rem',
                      sm: '0.9rem',
                      md: '1rem'
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
                    py: { xs: 1.2, sm: 1.5 },
                    px: { xs: 2.5, sm: 3 },
                    borderRadius: '9999px !important',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: {
                      xs: '0.8rem',
                      sm: '0.875rem'
                    },
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
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesGrid;