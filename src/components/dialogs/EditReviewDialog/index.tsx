"use client"
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
} from '@mui/material';
import React from 'react';

interface EditReviewDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    comment: string;
    rating: number | null;
    onCommentChange: (comment: string) => void;
    onRatingChange: (rating: number | null) => void;
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Rating</Typography>
                    <Rating
                        value={rating}
                        onChange={(_event, newValue) => onRatingChange(newValue)}
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
                    value={comment}
                    onChange={(e) => onCommentChange(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSave} variant="contained" sx={{ bgcolor: '#D97706' }}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditReviewDialog;