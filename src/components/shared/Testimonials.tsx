"use client"
import { Box, Typography, Card, CardContent, Avatar, Rating, Container } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
    },
}))

const TestimonialText = styled(Typography)(({ theme }) => ({
    fontStyle: "italic",
    lineHeight: 1.6,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
}))

const CustomerInfo = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    gap: theme.spacing(1.5),
}))

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6b35",
    },
})

interface Testimonial {
    id: number
    name: string
    avatar: string
    text: string
    rating: number
}

interface TestimonialsProps {
    testimonialsData: {
        title: string
        description: string
        items: Testimonial[]
    }
}

const TestimonialsSection = ({ testimonialsData }: TestimonialsProps) => {
    const { title, description, items } = testimonialsData;
    
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 10 },
                backgroundColor: "#fafafa",
            }}
        >
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box
                    sx={{
                        textAlign: "center",
                        mb: { xs: 4, md: 6 },
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                            fontWeight: 700,
                            color: "#2c3e50",
                            mb: 2,
                            lineHeight: 1.2,
                        }}
                    >
                       {title} 
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "1rem", md: "1.125rem" },
                            maxWidth: "600px",
                            mx: "auto",
                        }}
                    >
                        {description}
                    </Typography>
                </Box>

                {/* Testimonials Container */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 3, sm: 2, md: 4 },
                        maxHeight: { sm: '300px', md: '220px' }
                    }}
                >
                    {items.map((testimonial) => (
                        <Box
                            key={testimonial.id}
                            sx={{
                                flex: 1,
                                width: '100%'
                            }}
                        >
                            <StyledCard>
                                <CardContent sx={{ p: 0 }}>
                                    <CustomerInfo>
                                        <Avatar
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            sx={{
                                                width: { xs: 50, md: 60 },
                                                height: { xs: 50, md: 60 },
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{
                                                fontWeight: 600,
                                                color: "#2c3e50",
                                                fontSize: { xs: "1rem", md: "1.125rem" },
                                            }}
                                        >
                                            {testimonial.name}
                                        </Typography>
                                    </CustomerInfo>

                                    <TestimonialText
                                        variant="body1"
                                        sx={{
                                            fontSize: { xs: "0.95rem", md: "1rem" },
                                        }}
                                    >
                                        "{testimonial.text}"
                                    </TestimonialText>

                                    <StyledRating value={testimonial.rating} readOnly size="small" />
                                </CardContent>
                            </StyledCard>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    )
}

export default TestimonialsSection