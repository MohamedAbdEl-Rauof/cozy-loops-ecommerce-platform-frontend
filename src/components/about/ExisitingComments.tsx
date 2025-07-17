"use client"
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Rating,
    Paper,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import {
    Send as SendIcon,
    Star as StarIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';


const CommentCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: '16px',
    // background: 'rgba(255, 248, 235, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(217, 119, 6, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        // background: 'rgba(255, 248, 235, 0.95)',
        transform: 'translateX(4px)',
        boxShadow: '0 8px 25px rgba(217, 119, 6, 0.1)',
        border: '1px solid rgba(217, 119, 6, 0.2)',
    }
}));

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    Avatar: string;
}

interface Review {
    _id: string;
    user: User;
    product: string;
    comment: string;
    rating: number;
    likesCount: number;
    dislikesCount: number;
    likes: any[];
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
}

interface ExisitingCommentsProps {
    mockComments: Review[];
}

const ExisitingComments = ({ mockComments }: ExisitingCommentsProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState<number | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, reviewId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedReviewId(reviewId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedReviewId(null);
    };

    const handleEditClick = () => {
        const review = mockComments.find(r => r._id === selectedReviewId);
        if (review) {
            setEditComment(review.comment);
            setEditRating(review.rating);
            setEditDialogOpen(true);
        }
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleEditSave = () => {
        // TODO: Implement update functionality
        console.log('Update review:', { id: selectedReviewId, comment: editComment, rating: editRating });
        setEditDialogOpen(false);
    };

    const handleDeleteConfirm = () => {
        // TODO: Implement delete functionality
        console.log('Delete review:', selectedReviewId);
        setDeleteDialogOpen(false);
    };

    return (
        <Box sx={{ position: 'relative', zIndex: 2 }}>
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
                Customer Reviews ({mockComments.length})
            </Typography>

            {mockComments.map((comment, index) => (
                <CommentCard
                    key={comment._id}
                >
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
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleMenuOpen(e, comment._id)}
                                        sx={{ color: '#B45309' }}
                                    >
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
                                    sx={{
                                        color: '#B45309',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
                                        }
                                    }}
                                >
                                    👍 {comment.likesCount}
                                </Button>
                                <Button
                                    size="small"
                                    sx={{
                                        color: '#B45309',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
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


            {/* Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>
                    <EditIcon sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Review</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Rating</Typography>
                        <Rating
                            value={editRating}
                            onChange={(_, newValue) => setEditRating(newValue)}
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#F59E0B',
                                },
                            }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Comment"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" sx={{ bgcolor: '#D97706' }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Review</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this review? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}
export default ExisitingComments;