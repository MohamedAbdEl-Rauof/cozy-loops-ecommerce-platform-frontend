"use client"

import type React from "react"
import { Box, Typography, Button, Container, Grid, Card, CardMedia, useTheme, useMediaQuery } from "@mui/material"

const HeroSection: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  const craftImages = [
    {
      src: "/placeholder.svg?height=200&width=200",
      alt: "Knitting crafts",
    },
    {
      src: "/placeholder.svg?height=200&width=200",
      alt: "Pottery and ceramics",
    },
    {
      src: "/placeholder.svg?height=200&width=200",
      alt: "Woven baskets",
    },
    {
      src: "/placeholder.svg?height=200&width=200",
      alt: "Colorful textiles",
    },
    {
      src: "/placeholder.svg?height=200&width=200",
      alt: "Wooden crafts",
    },
    {
      src: "/placeholder.svg?height=200&width=200",
      alt: "Clay pottery",
    },
  ]

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)",
        minHeight: { xs: "70vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3.5rem",
                lg: "4rem",
              },
              fontWeight: "bold",
              color: "#2c3e50",
              mb: 3,
              lineHeight: 1.2,
              maxWidth: "900px",
              mx: "auto",
            }}
          >
            Discover Handmade Treasures That Tell a Story
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
              color: "#5d6d7e",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Support local artisans. Shop one-of-a-kind creations made with heart.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              mb: { xs: 4, md: 6 },
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#e67e22",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "25px",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(230, 126, 34, 0.3)",
                "&:hover": {
                  backgroundColor: "#d35400",
                  boxShadow: "0 6px 20px rgba(230, 126, 34, 0.4)",
                },
                minWidth: { xs: "200px", sm: "auto" },
              }}
            >
              Shop the Collection
            </Button>
            <Button
              variant="text"
              size="large"
              sx={{
                color: "#2c3e50",
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 500,
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#e67e22",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Product Images Gallery */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            overflow: "hidden",
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            justifyContent="center"
            sx={{
              transform: { md: "perspective(1000px) rotateX(5deg)" },
            }}
          >
            {craftImages.slice(0, isMobile ? 4 : isTablet ? 5 : 6).map((image, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={2}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                    },
                    width: "100%",
                    maxWidth: { xs: "140px", sm: "160px", md: "180px" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image.src}
                    alt={image.alt}
                    sx={{
                      height: { xs: "120px", sm: "140px", md: "160px" },
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
