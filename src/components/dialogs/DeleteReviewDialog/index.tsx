'use client'

import {
    Close as CloseIcon,
    DeleteOutline as DeleteIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    CircularProgress,
} from '@mui/material';
import React from 'react';

interface DeleteReviewDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const DeleteReviewDialog: React.FC<DeleteReviewDialogProps> = ({
    open,
    onClose,
    onConfirm,
    isLoading
}) => {
    return (
        <Dialog
            open={open}
            onClose={!isLoading ? onClose : undefined}
            maxWidth="xs"
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
                    <DeleteIcon sx={{ color: '#EF4444', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                        Delete Review
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
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <WarningIcon
                        sx={{
                            color: '#F59E0B',
                            fontSize: 24,
                            mt: 0.5,
                            flexShrink: 0,
                        }}
                    />
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#374151',
                                fontWeight: 500,
                                mb: 1,
                            }}
                        >
                            Are you sure you want to delete this review?
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6B7280',
                                lineHeight: 1.5,
                            }}
                        >
                            This action cannot be undone. Your review and rating will be permanently removed.
                        </Typography>
                    </Box>
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
                    onClick={onConfirm}
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                        backgroundColor: '#EF4444',
                        borderRadius: { xs: '6px', sm: '8px' },
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        textTransform: 'none',
                        fontWeight: 600,
                        minHeight: { xs: '44px', sm: '48px' },
                        minWidth: { xs: '100%', sm: 'auto' },
                        order: { xs: 1, sm: 2 },
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                        '&:hover': {
                            backgroundColor: '#DC2626',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
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
                                Deleting...
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
                            Delete Review
                        </Typography>
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteReviewDialog;