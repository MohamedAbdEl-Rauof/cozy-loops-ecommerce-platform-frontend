'use client';

import { FeatureCardsSectionProps } from '@/types/product';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  border: '1px solid #e0e0e0',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const ImageContainer = styled(Box)({
  width: '96px',
  height: '96px',
  position: 'relative',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const AnimatedSection = styled(Box)(() => ({
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.animate-in': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const AnimatedCard = styled(StyledCard)(() => ({
  opacity: 0,
  transform: 'translateY(30px) scale(0.95)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.animate-in': {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
}));

const FeatureCardsSection: React.FC<FeatureCardsSectionProps> = ({
  sectionTitle,
  sectionDescription,
  cards
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const getGridSize = (cardCount: number) => {
    switch (cardCount) {
      case 1:
        return { xs: 12, sm: 8, md: 6, lg: 4 };
      case 2:
        return { xs: 12, sm: 6, md: 6, lg: 4 };
      case 3:
        return { xs: 12, sm: 6, md: 4, lg: 4 };
      default:
        return { xs: 12, sm: 6, md: 4, lg: 3 };
    }
  };

  const getJustifyContent = (cardCount: number) => {
    if (cardCount < 4) {
      return 'center';
    }
    return 'flex-start';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          cards.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 150);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [cards.length]);

  const gridSize = getGridSize(cards.length);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        backgroundColor: '#fafafa',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '1400px',
            lg: '1600px',
            xl: '1850px'
          },
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          mx: 'auto',
        }}
      >
        <AnimatedSection
          className={isVisible ? 'animate-in' : ''}
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 10 },
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
              color: '#1a1a1a',
            }}
          >
            {sectionTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            {sectionDescription}
          </Typography>
        </AnimatedSection>

        <Box
          sx={{
            display: 'flex',
            justifyContent: getJustifyContent(cards.length),
            width: '100%',
          }}
        >
          <Grid
            container
            spacing={{ xs: 3, sm: 4, md: 6 }}
            sx={{
              justifyContent: cards.length < 4 ? 'center' : 'flex-start',
              maxWidth: cards.length === 1 ? '400px' :
                cards.length === 2 ? '800px' :
                  cards.length === 3 ? '1200px' : '100%',
            }}
          >
            {cards.map((card, index) => (
              <Grid key={index} size={gridSize}>
                <AnimatedCard
                  className={visibleCards[index] ? 'animate-in' : ''}
                  sx={{
                    transitionDelay: `${index * 0.1}s`,
                    maxWidth: cards.length === 1 ? '350px' : 'none',
                    mx: cards.length === 1 ? 'auto' : 'initial',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 0,
                      '&:last-child': { pb: 0 },
                    }}
                  >
                    <ImageContainer>
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        fill
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </ImageContainer>

                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        color: '#1a1a1a',
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        lineHeight: 1.5,
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureCardsSection;