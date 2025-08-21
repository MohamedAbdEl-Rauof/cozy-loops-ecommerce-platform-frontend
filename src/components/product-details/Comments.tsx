"use client"
import {
    Send as SendIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import {
    Box,
    Typography,
    TextField,
    Button,
    Rating,
    Paper,
    Container,
    Alert,
    CircularProgress,
    Chip,
    Snackbar,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { testimonialsService } from '@/services/testimonialsService';
import { CreateTestimonialData } from '@/types/Testimonial';

import AuthDialog from '../dialogs/AuthDialog';


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

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '20px',
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

const SubmitButton = styled(Button)(() => ({
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

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
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

interface CommentsProps {
    onCommentSubmitted?: () => void;
}

const Comments = ({ onCommentSubmitted }: CommentsProps) => {
    const [formData, setFormData] = useState<CommentFormData>({
        comment: '',
        rating: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const params = useParams();
    const productSlug = params.productSlug as string;
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const { user } = useAuth();

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            comment: event.target.value
        }));
        if (error) setError(null);
    };

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        setFormData(prev => ({
            ...prev,
            rating: newValue
        }));
        if (error) setError(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!user) {
            setAuthDialogOpen(true);
            return;
        }

        if (!formData.comment.trim() || !formData.rating) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const testimonialData: CreateTestimonialData = {
            productSlug,
            comment: formData.comment,
            rating: formData.rating,
        };

        try {
            await testimonialsService.createTestimonial(testimonialData);

            setShowSuccess(true);
            setFormData({ comment: '', rating: null });
            setHoveredRating(null);

            if (onCommentSubmitted) {
                onCommentSubmitted();
            }

            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);


        } catch (error) {
            console.error('Error submitting comment:', error);

            let errorMessage = 'Failed to submit review. Please try again.';

            if (error && typeof error === 'object') {
                const err = error as {
                    response?: {
                        data?: { message?: string };
                        message?: string;
                    };
                    message?: string;
                };

                if (err.response?.data?.message) {
                    errorMessage = err.response.data.message;
                } else if (err.response?.message) {
                    errorMessage = err.response.message;
                } else if (err.message) {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
        setError(null);
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

    const getDisplayRating = () => {
        if (hoveredRating !== null && hoveredRating > 0) {
            return hoveredRating;
        }
        if (formData.rating !== null && formData.rating > 0) {
            return formData.rating;
        }
        return null;
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
                py: { xs: 2, md: 4 }
            }}
        >
            <Box
                sx={{
                    borderRadius: '32px',
                    p: { xs: 3, sm: 4, md: 6 },
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(217, 119, 6, 0.05)',
                    border: '1px solid rgba(217, 119, 6, 0.08)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #D97706 0%, #F59E0B 50%, #D97706 100%)',
                        borderRadius: '32px 32px 0 0',
                    }
                }}
            >
                <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 3,
                            p: 2,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                            border: '1px solid rgba(217, 119, 6, 0.1)',
                        }}
                    >
                        <StarIcon sx={{ color: '#F59E0B', fontSize: '2rem' }} />
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: `${slideInUp} 0.8s ease-out`,
                            }}
                        >
                            Share Your Review
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6B7280',
                            fontWeight: 500,
                            maxWidth: '500px',
                            mx: 'auto',
                            lineHeight: 1.6,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            animation: `${slideInUp} 0.8s ease-out 0.2s both`,
                        }}
                    >
                        Help others make informed decisions with your honest experience
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        animation: `${slideInUp} 0.8s ease-out 0.4s both`,
                    }}
                >
                    <StyledPaper
                        sx={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(217, 119, 6, 0.08)',
                            borderRadius: '24px',
                            p: { xs: 3, md: 4 },
                        }}
                    >
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    color: '#374151',
                                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                                }}
                            >
                                How would you rate this product? *
                            </Typography>
                            <RatingContainer
                                sx={{
                                    mb: 0,
                                    border: '1px solid rgba(217, 119, 6, 0.1)',
                                    borderRadius: '16px',
                                    p: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: 'rgba(255, 248, 235, 0.9)',
                                        borderColor: 'rgba(217, 119, 6, 0.2)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(217, 119, 6, 0.1)',
                                    }
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                    gap: { xs: 2, sm: 3 },
                                }}>
                                    <Rating
                                        name="product-rating"
                                        value={formData.rating}
                                        onChange={handleRatingChange}
                                        onChangeActive={(_event, newHover) => {
                                            setHoveredRating(newHover);
                                        }}
                                        size="large"
                                        sx={{
                                            fontSize: { xs: '2rem', md: '2.5rem' },
                                            '& .MuiRating-iconFilled': {
                                                color: '#F59E0B',
                                                filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))',
                                            },
                                            '& .MuiRating-iconHover': {
                                                color: '#D97706',
                                                transform: 'scale(1.1)',
                                                transition: 'all 0.2s ease',
                                            },
                                            '& .MuiRating-iconEmpty': {
                                                color: 'rgba(217, 119, 6, 0.2)',
                                            }
                                        }}
                                    />
                                    {getDisplayRating() && (
                                        <Chip
                                            label={getRatingLabel(getDisplayRating()!)}
                                            sx={{
                                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                                color: 'white',
                                                fontWeight: 700,
                                                fontSize: '0.9rem',
                                                px: 2,
                                                py: 1,
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 15px rgba(217, 119, 6, 0.3)',
                                                animation: `${pulse} 0.3s ease-in-out`,
                                            }}
                                        />
                                    )}
                                </Box>
                            </RatingContainer>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    color: '#374151',
                                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                                }}
                            >
                                Share your detailed experience *
                            </Typography>
                            <StyledTextField
                                fullWidth
                                rows={5}
                                placeholder="Write your review here..."
                                value={formData.comment}
                                onChange={handleCommentChange}
                                required
                                inputProps={{
                                    maxLength: 1000,
                                }}
                                helperText={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                            Share your honest thoughts and experiences
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: formData.comment.length > 900 ? '#EF4444' : '#6B7280',
                                                fontWeight: 600
                                            }}
                                        >
                                            {formData.comment.length}/1000
                                        </Typography>
                                    </Box>
                                }
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(10px)',
                                        '& textarea': {
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: { xs: 'stretch', sm: 'flex-end' },
                            gap: 2
                        }}>
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
                                    minWidth: { xs: '100%', sm: '200px' },
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: '16px',
                                    textTransform: 'none',
                                    boxShadow: '0 8px 25px rgba(217, 119, 6, 0.25)',
                                    ...(isSubmitting && {
                                        animation: `${shimmer} 1.5s infinite linear`,
                                        background: 'linear-gradient(90deg, #FED7AA 0%, #FDBA74 50%, #FED7AA 100%)',
                                        backgroundSize: '200px 100%',
                                    }),
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 35px rgba(217, 119, 6, 0.35)',
                                    }
                                }}
                            >
                                {isSubmitting ? 'Publishing Review...' : 'Publish Review'}
                            </SubmitButton>
                        </Box>

                    </StyledPaper>
                </Box>
            </Box>

            <AuthDialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                title="Sign in to Leave a Review"
                message="Join our community to share your experience and help other customers make informed decisions."
            />

            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    sx={{
                        width: '100%',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                        color: '#dc2626',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1)',
                        '& .MuiAlert-icon': {
                            color: '#ef4444',
                        },
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    sx={{
                        mb: 4,
                        borderRadius: '20px',
                        backgroundColor: 'rgba(34, 197, 94, 0.05)',
                        border: '1px solid rgba(34, 197, 94, 0.15)',
                        color: '#15803d',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
                        '& .MuiAlert-icon': {
                            color: '#22c55e',
                        },
                        animation: `${pulse} 0.6s ease-in-out`,
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Thank you for your review! Your feedback has been submitted successfully.
                    </Typography>
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Comments;