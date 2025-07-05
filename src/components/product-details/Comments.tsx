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

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        transform: 'translateY(-2px)',
    }
}));

const CommentCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.95)',
        transform: 'translateX(4px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    borderRadius: '25px',
    padding: '12px 32px',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        background: 'linear-gradient(135deg, #5a67d8 0%, #667eea 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
    },
    '&:disabled': {
        background: 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
        color: '#9e9e9e',
        transform: 'none',
        boxShadow: 'none',
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '& fieldset': {
            borderColor: 'rgba(102, 126, 234, 0.2)',
            borderWidth: '2px',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(102, 126, 234, 0.4)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#6c757d',
        fontWeight: 500,
        '&.Mui-focused': {
            color: '#667eea',
        }
    }
}));

const RatingContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(102, 126, 234, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(102, 126, 234, 0.2)',
    }
}));

// Mock data for existing comments
const mockComments = [
    {
        id: 1,
        user: {
            name: "Sarah Johnson",
            avatar: "/api/placeholder/40/40",
            verified: true
        },
        rating: 5,
        comment: "Absolutely love this product! The quality exceeded my expectations and the delivery was super fast. Highly recommend to anyone looking for premium quality.",
        date: "2024-01-15",
        likes: 12,
        dislikes: 0,
        replies: 2
    },
    {
        id: 2,
        user: {
            name: "Mike Chen",
            avatar: "/api/placeholder/40/40",
            verified: false
        },
        rating: 4,
        comment: "Great product overall. The design is sleek and modern. Only minor issue was the packaging could be better, but the product itself is fantastic.",
        date: "2024-01-10",
        likes: 8,
        dislikes: 1,
        replies: 0
    },
    {
        id: 3,
        user: {
            name: "Emma Wilson",
            avatar: "/api/placeholder/40/40",
            verified: true
        },
        rating: 5,
        comment: "Perfect! Exactly what I was looking for. The customer service was also excellent when I had questions before purchasing.",
        date: "2024-01-08",
        likes: 15,
        dislikes: 0,
        replies: 1
    }
];

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
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: '24px',
                    p: { xs: 3, md: 4 },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.3,
                    }
                }}
            >
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 2 }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            animation: `${slideInUp} 0.8s ease-out`,
                        }}
                    >
                        Customer Reviews & Comments
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#6c757d',
                            fontWeight: 500,
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            animation: `${slideInUp} 0.8s ease-out 0.2s both`,
                        }}
                    >
                        Share your experience and help others make informed decisions
                    </Typography>
                </Box>

                {/* Success Alert */}
                <Fade in={showSuccess}>
                    <Alert
                        severity="success"
                        sx={{
                            mb: 4,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            border: '1px solid rgba(76, 175, 80, 0.2)',
                            '& .MuiAlert-icon': {
                                color: '#4caf50',
                            },
                            animation: `${pulse} 0.6s ease-in-out`,
                        }}
                    >
                        Thank you for your review! Your comment has been submitted successfully.
                    </Alert>
                </Fade>

                {/* Comment Form */}
                <StyledPaper
                    onSubmit={handleSubmit}
                    sx={{
                        mb: 6,
                        animation: `${slideInUp} 0.8s ease-out 0.4s both`,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            color: '#2c3e50',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <StarIcon sx={{ color: '#ffc107' }} />
                        Write a Review
                    </Typography>

                    {/* Rating Section */}
                    <RatingContainer sx={{ mb: 3 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: '#495057',
                            }}
                        >
                            Rate this product *
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Rating
                                name="product-rating"
                                value={formData.rating}
                                onChange={handleRatingChange}
                                onChangeActive={(event, newHover) => {
                                    setHoveredRating(newHover);
                                }}
                                size="large"
                                sx={{
                                    fontSize: '2rem',
                                    '& .MuiRating-iconFilled': {
                                        color: '#ffc107',
                                    },
                                    '& .MuiRating-iconHover': {
                                        color: '#ffb300',
                                    },
                                    '& .MuiRating-iconEmpty': {
                                        color: 'rgba(0,0,0,0.1)',
                                    }
                                }}
                            />
                            {(hoveredRating !== null || formData.rating !== null) && (
                                <Chip
                                    label={getRatingLabel(hoveredRating || formData.rating || 0)}
                                    sx={{
                                        background: 'linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)',
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
                                    background: 'linear-gradient(90deg, #e0e0e0 0%, #f0f0f0 50%, #e0e0e0 100%)',
                                    backgroundSize: '200px 100%',
                                })
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </SubmitButton>
                    </Box>
                </StyledPaper>
            </Box>
        </Container>
    );
};

export default Comments;