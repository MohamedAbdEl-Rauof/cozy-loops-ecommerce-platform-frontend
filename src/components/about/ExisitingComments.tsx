'use client'

import {
    Star as StarIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    Rating,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

import DeleteReviewDialog from '@/components/dialogs/DeleteReviewDialog';
import EditReviewDialog from '@/components/dialogs/EditReviewDialog';
import { useAuth } from '@/context/AuthContext';
import { testimonialsService } from '@/services/testimonialsService';
import { ExisitingCommentsProps } from '@/types/Testimonial';

const CommentCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(217, 119, 6, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateX(4px)',
        boxShadow: '0 8px 25px rgba(217, 119, 6, 0.1)',
        border: '1px solid rgba(217, 119, 6, 0.2)',
    }
}));

const ExisitingComments = ({ commentsData, onRefresh }: ExisitingCommentsProps) => {
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'warning' | 'info'
    });
    const [likingReviewId, setLikingReviewId] = useState<string | null>(null);

    const handleEditSave = async () => {
        if (!selectedReviewId || !editComment.trim() || !editRating) {
            setSnackbar({
                open: true,
                message: 'Please provide both comment and rating',
                severity: 'warning'
            });
            return;
        }

        setIsLoading(true);

        try {
            await testimonialsService.updateTestimonial(
                selectedReviewId,
                editComment,
                editRating
            );

            setSnackbar({
                open: true,
                message: 'Review updated successfully!',
                severity: 'success'
            });

            setEditDialogOpen(false);
            setSelectedReviewId(null);
            setEditComment('');
            setEditRating(null);

            onRefresh();

        } catch (error) {
            console.error('Error updating review:', error);

            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'Failed to update review',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };


    const reviewsWithOwnership = commentsData.map(review => ({
        ...review,
        isOwner: user?.id === review.user._id
    }));

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, reviewId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedReviewId(reviewId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        const review = commentsData.find(r => r._id === selectedReviewId);
        if (review) {
            setEditComment(review.comment);
            setEditRating(review.rating);
            setEditDialogOpen(true);
        }
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        setAnchorEl(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedReviewId) {
            setSnackbar({
                open: true,
                message: 'No review selected for deletion',
                severity: 'warning'
            });
            return;
        }

        setIsLoading(true);

        try {
            await testimonialsService.deleteTestimonial(selectedReviewId);

            setSnackbar({
                open: true,
                message: 'Review deleted successfully!',
                severity: 'success'
            });

            setDeleteDialogOpen(false);
            setSelectedReviewId(null);

            onRefresh();

        } catch (error) {
            console.error('Error deleting review:', error);

            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : 'Failed to delete review',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedReviewId(null);
        setEditComment('');
        setEditRating(null);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedReviewId(null);
    };

    const handleCommentChange = (comment: string) => {
        setEditComment(comment);
    };

    const handleRatingChange = (rating: number | null) => {
        setEditRating(rating);
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleLikeDislike = async (reviewId: string, type: 'like' | 'dislike') => {
        if (!user) {
            setSnackbar({
                open: true,
                message: 'Please login to react to reviews',
                severity: 'warning'
            });
            return;
        }

        setLikingReviewId(reviewId);

        try {
            await testimonialsService.likeDislikeReview(reviewId, type);
            onRefresh();
        } catch (error) {
            console.error(`Error ${type}ing review:`, error);
            setSnackbar({
                open: true,
                message: error instanceof Error ? error.message : `Failed to ${type} review`,
                severity: 'error'
            });
        } finally {
            setLikingReviewId(null);
        }
    };

    return (
        <Box sx={{ position: 'relative', zIndex: 2 }}>

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
                open={isLoading}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress color="inherit" />
                    <Typography variant="body1">Processing...</Typography>
                </Box>
            </Backdrop>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: '#92400E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <StarIcon sx={{ color: '#F59E0B' }} />
                Customer Reviews ({commentsData.length})
            </Typography>

            {reviewsWithOwnership.map((comment) => (
                <CommentCard key={comment._id}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                backgroundImage: comment.user.Avatar ? `url(${comment.user.Avatar})` : 'none',
                                backgroundColor: !comment.user.Avatar ? '#D97706' : 'transparent',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1.2rem',
                            }}
                        >
                            {!comment.user.Avatar && comment.user.firstName && comment.user.lastName &&
                                `${comment.user.firstName.charAt(0).toUpperCase()}${comment.user.lastName.charAt(0).toUpperCase()}`
                            }
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#92400E',
                                        }}
                                    >
                                        {comment.user.firstName && comment.user.lastName
                                            ? `${comment.user.firstName} ${comment.user.lastName}`
                                            : 'Anonymous User'
                                        }
                                    </Typography>
                                </Box>
                                {comment.isOwner && (
                                    <IconButton onClick={(e) => handleMenuOpen(e, comment._id)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Rating
                                    value={comment.rating}
                                    readOnly
                                    size="small"
                                    sx={{
                                        '& .MuiRating-iconFilled': {
                                            color: '#F59E0B',
                                        },
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: '#B45309',
                                        fontWeight: 500,
                                    }}
                                >
                                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#92400E',
                                    lineHeight: 1.6,
                                    mb: 2,
                                }}
                            >
                                {comment.comment}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Button
                                    size="small"
                                    onClick={() => handleLikeDislike(comment._id, 'like')}
                                    disabled={likingReviewId === comment._id}
                                    sx={{
                                        color: '#B45309',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
                                        },
                                        '&:disabled': {
                                            opacity: 0.6,
                                        }
                                    }}
                                >
                                    👍 {comment.likesCount}
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => handleLikeDislike(comment._id, 'dislike')}
                                    disabled={likingReviewId === comment._id}
                                    sx={{
                                        color: '#B45309',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
                                        },
                                        '&:disabled': {
                                            opacity: 0.6,
                                        }
                                    }}
                                >
                                    👎 {comment.dislikesCount}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </CommentCard>
            ))}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                        border: '1px solid #F3F4F6',
                        minWidth: '160px',
                        mt: 1,
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    onClick={handleEditClick}
                    disabled={isLoading}
                    sx={{
                        py: 1.5,
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        color: '#374151',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: '#F59E0B10',
                            color: '#F59E0B',
                            '& .MuiSvgIcon-root': {
                                color: '#F59E0B',
                            }
                        },
                        '&:disabled': {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                        }
                    }}
                >
                    <EditIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Edit Review
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleDeleteClick}
                    disabled={isLoading}
                    sx={{
                        py: 1.5,
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        color: '#374151',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: '#FEF2F2',
                            color: '#EF4444',
                            '& .MuiSvgIcon-root': {
                                color: '#EF4444',
                            }
                        },
                        '&:disabled': {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                        }
                    }}
                >
                    <DeleteIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Delete Review
                    </Typography>
                </MenuItem>
            </Menu>

            <EditReviewDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                onSave={handleEditSave}
                comment={editComment}
                rating={editRating}
                onCommentChange={handleCommentChange}
                onRatingChange={handleRatingChange}
                isLoading={isLoading}
            />

            <DeleteReviewDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteConfirm}
                isLoading={isLoading}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};


export default ExisitingComments;