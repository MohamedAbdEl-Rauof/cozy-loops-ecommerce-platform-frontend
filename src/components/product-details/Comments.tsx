"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Rating,
    Paper,
    Container,
    Fade,
    Alert,
    CircularProgress,
    Chip,
    useTheme,
} from '@mui/material';
import {
    Send as SendIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Styled Components with Cozy Loops Branding
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '20px',
    // background: 'linear-gradient(135deg, rgba(255,248,235,0.95) 0%, rgba(254,243,224,0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(217, 119, 6, 0.1)',
    boxShadow: '0 8px 32px rgba(217, 119, 6, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        boxShadow: '0 12px 40px rgba(217, 119, 6, 0.12)',
        transform: 'translateY(-2px)',
        border: '1px solid rgba(217, 119, 6, 0.15)',
    }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    borderRadius: '25px',
    padding: '12px 32px',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    boxShadow: '0 8px 25px rgba(217, 119, 6, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'white',
    '&:hover': {
        background: 'linear-gradient(135deg, #B45309 0%, #92400E 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(217, 119, 6, 0.4)',
    },
    '&:disabled': {
        background: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
        color: '#92400E',
        transform: 'none',
        boxShadow: 'none',
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        // backgroundColor: 'rgba(255, 248, 235, 0.8)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '& fieldset': {
            borderColor: 'rgba(217, 119, 6, 0.2)',
            borderWidth: '2px',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(217, 119, 6, 0.4)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D97706',
            boxShadow: '0 0 0 3px rgba(217, 119, 6, 0.1)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(255, 248, 235, 0.95)',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#92400E',
        fontWeight: 500,
        '&.Mui-focused': {
            color: '#D97706',
        }
    },
    '& .MuiFormHelperText-root': {
        color: '#B45309',
    }
}));

const RatingContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '12px',
    // background: 'rgba(255, 248, 235, 0.6)',
    border: '1px solid rgba(217, 119, 6, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 248, 235, 0.8)',
        borderColor: 'rgba(217, 119, 6, 0.2)',
    }
}));

interface CommentFormData {
    comment: string;
    rating: number | null;
}

const Comments = () => {
    const theme = useTheme();

    const [formData, setFormData] = useState<CommentFormData>({
        comment: '',
        rating: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            comment: event.target.value
        }));
    };

    const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
        setFormData(prev => ({
            ...prev,
            rating: newValue
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formData.comment.trim() || !formData.rating) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            setShowSuccess(true);
            setFormData({ comment: '', rating: null });

            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.comment.trim().length > 0 && formData.rating !== null;

    const getRatingLabel = (value: number) => {
        const labels = {
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        return labels[value as keyof typeof labels];
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                maxWidth: {
                    xs: '100%',
                    sm: '100%',
                    md: '1200px',
                    lg: '1400px',
                    xl: '1600px'
                },
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 4, md: 6 },
            }}
        >
            <Box
                sx={{
                    background: 'white',
                    borderRadius: '24px',
                    p: { xs: 3, md: 4 },
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(217, 119, 6, 0.1)',
                }}
            >
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            animation: `${slideInUp} 0.8s ease-out`,
                        }}
                    >
                        Share Your Review
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#92400E',
                            fontWeight: 500,
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            animation: `${slideInUp} 0.8s ease-out 0.2s both`,
                        }}
                    >
                        Help others make informed decisions with your experience
                    </Typography>
                </Box>

                {/* Success Alert */}
                <Fade in={showSuccess}>
                    <Alert
                        severity="success"
                        sx={{
                            mb: 4,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            color: '#15803d',
                            '& .MuiAlert-icon': {
                                color: '#22c55e',
                            },
                            animation: `${pulse} 0.6s ease-in-out`,
                        }}
                    >
                        Thank you for your review! Your comment has been submitted successfully.
                    </Alert>
                </Fade>

                {/* Comment Form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        animation: `${slideInUp} 0.8s ease-out 0.4s both`,
                    }}
                >
                    <StyledPaper>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: '#92400E',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <StarIcon sx={{ color: '#F59E0B' }} />
                            Write a Review
                        </Typography>

                        {/* Rating Section */}
                        <RatingContainer sx={{ mb: 3 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    color: '#92400E',
                                }}
                            >
                                Rate this product *
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <Rating
                                    name="product-rating"
                                    value={formData.rating}
                                    onChangeActive={(event, newHover) => {
                                        setHoveredRating(newHover);
                                    }}
                                    size="large"
                                    sx={{
                                        fontSize: '2rem',
                                        '& .MuiRating-iconFilled': {
                                            color: '#F59E0B',
                                        },
                                        '& .MuiRating-iconHover': {
                                            color: '#D97706',
                                        },
                                        '& .MuiRating-iconEmpty': {
                                            color: 'rgba(217, 119, 6, 0.2)',
                                        }
                                    }}
                                />
                                {(hoveredRating !== null || formData.rating !== null) && (
                                    <Chip
                                        label={getRatingLabel(hoveredRating || formData.rating || 0)}
                                        sx={{
                                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                            color: 'white',
                                            fontWeight: 600,
                                            animation: `${pulse} 0.3s ease-in-out`,
                                        }}
                                    />
                                )}
                            </Box>
                        </RatingContainer>

                        {/* Comment Text Area */}
                        <StyledTextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Share your thoughts about this product"
                            placeholder="Tell us about your experience with this product. What did you like? What could be improved?"
                            value={formData.comment}
                            onChange={handleCommentChange}
                            required
                            sx={{ mb: 3 }}
                            inputProps={{
                                maxLength: 1000,
                            }}
                            helperText={`${formData.comment.length}/1000 characters`}
                        />

                        {/* Submit Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <SubmitButton
                                type="submit"
                                variant="contained"
                                disabled={!isFormValid || isSubmitting}
                                startIcon={
                                    isSubmitting ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        <SendIcon />
                                    )
                                }
                                sx={{
                                    minWidth: '160px',
                                    ...(isSubmitting && {
                                        animation: `${shimmer} 1.5s infinite linear`,
                                        background: 'linear-gradient(90deg, #FED7AA 0%, #FDBA74 50%, #FED7AA 100%)',
                                        backgroundSize: '200px 100%',
                                    })
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </SubmitButton>
                        </Box>
                    </StyledPaper>
                </Box>
            </Box>
        </Container>
    );
};

export default Comments;