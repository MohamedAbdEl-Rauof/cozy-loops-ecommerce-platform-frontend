"use client"

import {
    Close as CloseIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Rating,
    Typography,
    Box,
    IconButton,
    CircularProgress,
} from '@mui/material';
import React from 'react';

interface EditReviewDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    comment: string;
    rating: number | null;
    onCommentChange: (_comment: string) => void;
    onRatingChange: (_rating: number | null) => void;
    isLoading: boolean;
}

const EditReviewDialog: React.FC<EditReviewDialogProps> = ({
    open,
    onClose,
    onSave,
    comment,
    rating,
    onCommentChange,
    onRatingChange,
    isLoading
}) => {
    return (
        <Dialog
            open={open}
            onClose={!isLoading ? onClose : undefined}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 2,
                    borderBottom: '1px solid #F3F4F6',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EditIcon sx={{ color: '#F59E0B', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                        Edit Review
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    disabled={isLoading}
                    size="small"
                    sx={{
                        color: '#6B7280',
                        '&:hover': {
                            backgroundColor: '#F3F4F6',
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 2 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: '#374151',
                            mb: 1.5,
                        }}
                    >
                        Rating
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Rating
                            value={rating}
                            onChange={(_event, newValue) => onRatingChange(newValue)}
                            size="large"
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#F59E0B',
                                },
                                '& .MuiRating-iconHover': {
                                    color: '#F59E0B',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: '#E5E7EB',
                                },
                            }}
                        />
                        {rating && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#6B7280',
                                    fontWeight: 500,
                                }}
                            >
                                {rating}/5
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: '#374151',
                            mb: 1.5,
                        }}
                    >
                        Your Review
                    </Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        label="Write your review..."
                        value={comment}
                        onChange={(e) => onCommentChange(e.target.value)}
                        variant="outlined"
                        placeholder="Share your thoughts about this product..."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '&:hover fieldset': {
                                    borderColor: '#F59E0B',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#F59E0B',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                '&.Mui-focused': {
                                    color: '#F59E0B',
                                },
                            },
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                            color: '#9CA3AF',
                            mt: 1,
                            display: 'block',
                            textAlign: 'right',
                        }}
                    >
                        {comment.length}/500
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    px: { xs: 2, sm: 3 },
                    pb: { xs: 2, sm: 3 },
                    pt: 1,
                    gap: { xs: 1.5, sm: 2 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                }}
            >
                <Button
                    onClick={onClose}
                    disabled={isLoading}
                    variant="outlined"
                    sx={{
                        borderColor: '#D1D5DB',
                        color: '#6B7280',
                        borderRadius: { xs: '6px', sm: '8px' },
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        textTransform: 'none',
                        fontWeight: 500,
                        minHeight: { xs: '44px', sm: '48px' },
                        order: { xs: 2, sm: 1 },
                        '&:hover': {
                            borderColor: '#9CA3AF',
                            backgroundColor: '#F9FAFB',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSave}
                    disabled={isLoading || !comment.trim() || !rating}
                    variant="contained"
                    sx={{
                        backgroundColor: '#F59E0B',
                        borderRadius: { xs: '6px', sm: '8px' },
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        textTransform: 'none',
                        fontWeight: 600,
                        minHeight: { xs: '44px', sm: '48px' },
                        minWidth: { xs: '100%', sm: 'auto' },
                        order: { xs: 1, sm: 2 },
                        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                        '&:hover': {
                            backgroundColor: '#D97706',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                        },
                        '&:disabled': {
                            backgroundColor: '#E5E7EB',
                            color: '#9CA3AF',
                            boxShadow: 'none',
                        },
                    }}
                >
                    {isLoading ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0.8, sm: 1 },
                            justifyContent: 'center'
                        }}>
                            <CircularProgress
                                color="inherit"
                                sx={{
                                    width: { xs: 14, sm: 16 },
                                    height: { xs: 14, sm: 16 },
                                }}
                            />
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    fontWeight: 'inherit'
                                }}
                            >
                                Saving...
                            </Typography>
                        </Box>
                    ) : (
                        <Typography
                            component="span"
                            sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                fontWeight: 'inherit'
                            }}
                        >
                            Save Changes
                        </Typography>
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditReviewDialog;