"use client"
import { Box, Typography, Card, CardContent, Avatar, Rating, Container, Chip } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"
import { useState, useEffect } from "react"
import { FormatQuote, Star } from "@mui/icons-material"
import { TestimonialsData } from '@/types/Testimonial'

const float = keyframes`
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    33% {
        transform: translateY(-12px) rotate(1deg);
    }
    66% {
        transform: translateY(-6px) rotate(-1deg);
    }
`

const shimmer = keyframes`
    0% {
        background-position: -200px 0;
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        background-position: calc(200px + 100%) 0;
        opacity: 0;
    }
`

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
`

const glow = keyframes`
    0%, 100% {
        box-shadow: 0 0 20px rgba(255, 112, 67, 0.2);
    }
    50% {
        box-shadow: 0 0 40px rgba(255, 112, 67, 0.4);
    }
`

const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
    background: "linear-gradient(145deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)",
    border: "1px solid rgba(255, 229, 184, 0.2)",
    boxShadow: `
        0 20px 40px rgba(255, 112, 67, 0.08),
        0 8px 24px rgba(255, 229, 184, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.8)
    `,
    transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, transparent, #FF7043, #FFE5B8, #FF7043, transparent)",
        backgroundSize: "200% 100%",
        animation: `${shimmer} 4s ease-in-out infinite`,
    },
    "&::after": {
        content: '""',
        position: "absolute",
        top: -50,
        left: -50,
        width: 100,
        height: 100,
        background: "radial-gradient(circle, rgba(255, 229, 184, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        opacity: 0,
        transition: "all 0.4s ease",
        animation: `${float} 8s ease-in-out infinite`,
    },
    "&:hover": {
        transform: "translateY(-12px) scale(1.03)",
        boxShadow: `
            0 30px 60px rgba(255, 112, 67, 0.15),
            0 12px 40px rgba(255, 229, 184, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.9)
        `,
        "&::after": {
            opacity: 1,
            transform: "scale(1.2)",
        }
    },
}))

const TestimonialText = styled(Typography)(({ theme }) => ({
    fontStyle: "italic",
    lineHeight: 1.8,
    marginBottom: theme.spacing(3),
    color: "#4A4A4A",
    fontSize: "1.125rem",
    position: "relative",
    paddingLeft: theme.spacing(2),
    fontWeight: 400,
    "&::before": {
        content: '"',
        position: "absolute",
        left: -8,
        top: -12,
        fontSize: "4rem",
        color: "rgba(255, 229, 184, 0.3)",
        fontFamily: '"Playfair Display", serif',
        lineHeight: 1,
        fontWeight: 700,
    },
    "&::after": {
        content: '"',
        fontSize: "2rem",
        color: "rgba(255, 229, 184, 0.3)",
        fontFamily: '"Playfair Display", serif',
        marginLeft: theme.spacing(0.5),
    }
}))

const CustomerInfo = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    gap: theme.spacing(2),
    position: "relative",
}))

const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconFilled": {
        color: "#FF7043",
        filter: "drop-shadow(0 2px 6px rgba(255, 112, 67, 0.4))",
    },
    "& .MuiRating-iconEmpty": {
        color: "rgba(255, 229, 184, 0.4)",
    },
    "& .MuiRating-icon": {
        fontSize: "1.5rem",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
            transform: "scale(1.3) rotate(10deg)",
        }
    }
}))

const QuoteIcon = styled(FormatQuote)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    fontSize: "2.5rem",
    color: "rgba(255, 229, 184, 0.2)",
    opacity: 0.8,
    animation: `${float} 6s ease-in-out infinite`,
    transition: "all 0.3s ease",
}))

const SectionContainer = styled(Box)(({ theme }) => ({
    background: `
        linear-gradient(135deg, #FFFBF7 0%, #FFF8F0 25%, #FFFBF7 50%, #FFF5E6 75%, #FFFBF7 100%),
        radial-gradient(circle at 30% 20%, rgba(255, 229, 184, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(255, 112, 67, 0.03) 0%, transparent 50%)
    `,
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFE5B8' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        pointerEvents: "none",
    }
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
    textAlign: "center",
    marginBottom: theme.spacing(10),
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: -theme.spacing(5),
        left: "50%",
        transform: "translateX(-50%)",
        width: "120px",
        height: "4px",
        background: "linear-gradient(90deg, transparent, #FF7043, #FFE5B8, #FF7043, transparent)",
        borderRadius: "2px",
        animation: `${shimmer} 3s ease-in-out infinite`,
    }
}))

interface TestimonialsProps {
    testimonialsData: TestimonialsData
}

const TestimonialsSection = ({ testimonialsData }: TestimonialsProps) => {
    const { title, description, items } = testimonialsData;
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const displayedItems = showAll ? items : items.slice(0, 3);

    return (
        <SectionContainer
            sx={{
                py: { xs: 10, md: 15 },
                position: "relative",
            }}
        >
            <Container maxWidth="xl">
                <HeaderContainer
                    sx={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(40px)",
                        transition: "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4rem" },
                            fontWeight: 900,
                            background: "linear-gradient(135deg, #2C1810 0%, #5D4037 50%, #8D6E63 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 4,
                            lineHeight: 1.1,
                            fontFamily: '"Playfair Display", serif',
                            letterSpacing: "-0.03em",
                            textShadow: "0 4px 8px rgba(44, 24, 16, 0.1)",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            color: "#6D4C41",
                            fontSize: { xs: "1.25rem", md: "1.375rem" },
                            maxWidth: "800px",
                            mx: "auto",
                            lineHeight: 1.7,
                            fontWeight: 400,
                            opacity: 0.9,
                        }}
                    >
                        {description}
                    </Typography>
                </HeaderContainer>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                        },
                        gap: { xs: 5, sm: 4, md: 5 },
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(50px)",
                        transition: "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transitionDelay: "0.4s",
                    }}
                >
                    {displayedItems.map((testimonial, index) => (
                        <Box
                            key={testimonial.id}
                            sx={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                                transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                transitionDelay: `${0.5 + index * 0.15}s`,
                            }}
                            onMouseEnter={() => setHoveredCard(testimonial.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <StyledCard
                                sx={{
                                    transform: hoveredCard === testimonial.id
                                        ? "translateY(-12px) scale(1.03)"
                                        : "translateY(0) scale(1)",
                                    animation: hoveredCard === testimonial.id
                                        ? `${glow} 2s ease-in-out infinite`
                                        : "none",
                                }}
                            >
                                <QuoteIcon
                                    sx={{
                                        transform: hoveredCard === testimonial.id
                                            ? "scale(1.2) rotate(15deg)"
                                            : "scale(1) rotate(0deg)",
                                        color: hoveredCard === testimonial.id
                                            ? "rgba(255, 112, 67, 0.3)"
                                            : "rgba(255, 229, 184, 0.2)",
                                    }}
                                />

                                <CardContent sx={{ p: 0, position: "relative", zIndex: 2 }}>
                                    <CustomerInfo>
                                        <Box sx={{ position: "relative" }}>
                                            <Avatar
                                                src={testimonial.user?.avatar || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                                                alt={testimonial.user?.name || "Anonymous User"}
                                                sx={{
                                                    width: { xs: 70, md: 80 },
                                                    height: { xs: 70, md: 80 },
                                                    border: "4px solid #FFE5B8",
                                                    boxShadow: "0 8px 24px rgba(255, 112, 67, 0.2)",
                                                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                                    "&:hover": {
                                                        transform: "scale(1.15) rotate(5deg)",
                                                        boxShadow: "0 12px 32px rgba(255, 112, 67, 0.3)",
                                                        borderColor: "#FF7043",
                                                    }
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "#2C1810",
                                                    fontSize: { xs: "1.2rem", md: "1.3rem" },
                                                    mb: 0.5,
                                                    fontFamily: '"Playfair Display", serif',
                                                    transition: "color 0.3s ease",
                                                    "&:hover": {
                                                        color: "#FF7043",
                                                    }
                                                }}
                                            >
                                                {testimonial.user?.name || "Anonymous User"}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 400,
                                                    color: "gray",
                                                    fontSize: { xs: "0.875rem", md: "0.9rem" },
                                                    mb: 0.5,
                                                    fontFamily: '"Roboto", sans-serif',
                                                    transition: "color 0.3s ease",
                                                }}
                                            >
                                                {testimonial.date ? new Date(testimonial.date).toLocaleDateString() : ''}
                                            </Typography>
                                        </Box>
                                    </CustomerInfo>

                                    <TestimonialText
                                        variant="body1"
                                        sx={{
                                            fontSize: { xs: "1.1rem", md: "1.125rem" },
                                            fontWeight: 400,
                                            lineHeight: 1.8,
                                            transform: hoveredCard === testimonial.id
                                                ? "translateX(4px)"
                                                : "translateX(0)",
                                            transition: "transform 0.3s ease",
                                        }}
                                    >
                                        {testimonial.comment}
                                    </TestimonialText>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            mt: 3,
                                            p: 2,
                                            borderRadius: 2,
                                            background: "linear-gradient(135deg, rgba(255, 229, 184, 0.1), rgba(255, 112, 67, 0.05))",
                                            border: "1px solid rgba(255, 229, 184, 0.2)",
                                        }}
                                    >
                                        <StyledRating
                                            value={testimonial.rating}
                                            readOnly
                                            size="medium"
                                            sx={{
                                                animation: hoveredCard === testimonial.id
                                                    ? `${pulse} 2s ease-in-out infinite`
                                                    : "none",
                                            }}
                                        />
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#FF7043",
                                                    fontSize: "1rem",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {testimonial.rating}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#8D6E63",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                /5
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>

                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 20,
                                        right: 20,
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, rgba(255, 229, 184, 0.4), rgba(255, 112, 67, 0.2))",
                                        opacity: hoveredCard === testimonial.id ? 0.9 : 0.3,
                                        transition: "all 0.4s ease",
                                        animation: `${float} 8s ease-in-out infinite`,
                                        animationDelay: `${index * 0.8}s`,
                                        filter: "blur(1px)",
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 30,
                                        left: 20,
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        background: "linear-gradient(45deg, rgba(255, 112, 67, 0.2), rgba(255, 229, 184, 0.3))",
                                        opacity: hoveredCard === testimonial.id ? 0.7 : 0.2,
                                        transition: "all 0.4s ease",
                                        animation: `${float} 6s ease-in-out infinite`,
                                        animationDelay: `${index * 0.5}s`,
                                        filter: "blur(0.5px)",
                                    }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: "linear-gradient(135deg, rgba(255, 112, 67, 0.02), rgba(255, 229, 184, 0.02))",
                                        opacity: hoveredCard === testimonial.id ? 1 : 0,
                                        transition: "opacity 0.4s ease",
                                        borderRadius: "inherit",
                                        pointerEvents: "none",
                                    }}
                                />
                            </StyledCard>
                        </Box>
                    ))}
                </Box>

                {items.length > 3 && (
                    <Box
                        sx={{
                            mt: 6,
                            display: "flex",
                            justifyContent: "center",
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(30px)",
                            transition: "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            transitionDelay: "0.8s",
                        }}
                    >
                        <Box
                            component="button"
                            onClick={() => setShowAll(!showAll)}
                            sx={{
                                px: 4,
                                py: 2,
                                borderRadius: 3,
                                border: "2px solid #FF7043",
                                background: showAll
                                    ? "linear-gradient(135deg, #FF7043, #FFE5B8)"
                                    : "transparent",
                                color: showAll ? "#fff" : "#FF7043",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background: "linear-gradient(135deg, #FF7043, #FFE5B8)",
                                    color: "#fff",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 20px rgba(255, 112, 67, 0.3)",
                                }
                            }}
                        >
                            {showAll ? `Show Less` : `Show More (${items.length - 3} more)`}
                        </Box>
                    </Box>
                )}

                <Box
                    sx={{
                        mt: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(30px)",
                        transition: "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transitionDelay: "1s",
                    }}
                >
                    {[...Array(5)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: index === 2 ? 12 : 8,
                                height: index === 2 ? 12 : 8,
                                borderRadius: "50%",
                                background: index === 2
                                    ? "linear-gradient(135deg, #FF7043, #FFE5B8)"
                                    : "linear-gradient(135deg, rgba(255, 112, 67, 0.6), rgba(255, 229, 184, 0.6))",
                                animation: `${pulse} ${2 + index * 0.3}s ease-in-out infinite`,
                                animationDelay: `${index * 0.2}s`,
                                boxShadow: index === 2
                                    ? "0 4px 12px rgba(255, 112, 67, 0.4)"
                                    : "0 2px 8px rgba(255, 112, 67, 0.2)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.3)",
                                    boxShadow: "0 6px 20px rgba(255, 112, 67, 0.5)",
                                }
                            }}
                        />
                    ))}
                </Box>

                <Box
                    sx={{
                        mt: 12,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: { xs: 4, md: 8 },
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(40px)",
                        transition: "all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transitionDelay: "1.2s",
                    }}
                >
                    {[
                        { number: "10,000+", label: "Happy Customers" },
                        { number: "4.9", label: "Average Rating" },
                        { number: "99%", label: "Satisfaction Rate" },
                        { number: "24/7", label: "Customer Support" }
                    ].map((stat, index) => (
                        <Box
                            key={index}
                            sx={{
                                textAlign: "center",
                                p: 3,
                                borderRadius: 3,
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 229, 184, 0.1))",
                                border: "1px solid rgba(255, 229, 184, 0.3)",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                "&:hover": {
                                    transform: "translateY(-8px) scale(1.05)",
                                    boxShadow: "0 20px 40px rgba(255, 112, 67, 0.15)",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 229, 184, 0.2))",
                                }
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 900,
                                    background: "linear-gradient(135deg, #FF7043, #FFE5B8)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: { xs: "2rem", md: "2.5rem" },
                                    fontFamily: '"Playfair Display", serif',
                                    mb: 1,
                                }}
                            >
                                {stat.number}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#6D4C41",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.9rem", md: "1rem" },
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "5%",
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255, 229, 184, 0.1) 0%, transparent 70%)",
                        animation: `${float} 12s ease-in-out infinite`,
                        filter: "blur(2px)",
                        pointerEvents: "none",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        bottom: "15%",
                        right: "8%",
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255, 112, 67, 0.08) 0%, transparent 70%)",
                        animation: `${float} 10s ease-in-out infinite`,
                        animationDelay: "2s",
                        filter: "blur(1.5px)",
                        pointerEvents: "none",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        top: "60%",
                        left: "2%",
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255, 229, 184, 0.12) 0%, transparent 70%)",
                        animation: `${float} 8s ease-in-out infinite`,
                        animationDelay: "4s",
                        filter: "blur(1px)",
                        pointerEvents: "none",
                    }}
                />

                {[...Array(6)].map((_, index) => (
                    <Star
                        key={index}
                        sx={{
                            position: "absolute",
                            top: `${20 + index * 15}%`,
                            left: `${10 + index * 12}%`,
                            fontSize: "1.5rem",
                            color: "rgba(255, 229, 184, 0.3)",
                            animation: `${float} ${6 + index}s ease-in-out infinite`,
                            animationDelay: `${index * 0.8}s`,
                            transform: `rotate(${index * 45}deg)`,
                            pointerEvents: "none",
                            filter: "blur(0.5px)",
                        }}
                    />
                ))}
            </Container>
        </SectionContainer>
    )
}

export default TestimonialsSection