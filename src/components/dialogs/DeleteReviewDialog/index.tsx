"use client"
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

interface DeleteReviewDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteReviewDialog: React.FC<DeleteReviewDialogProps> = ({
    open,
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this review? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteReviewDialog;