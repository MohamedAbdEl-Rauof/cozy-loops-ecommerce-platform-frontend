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

const ExisitingComments = ({mockComments}:ExisitingCommentsProps) => {
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
                    key={comment.id}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '1.2rem',
                            }}
                        >
                            {comment.user.name.charAt(0)}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#92400E',
                                    }}
                                >
                                    {comment.user.name}
                                </Typography>
                                {comment.user.verified && (
                                    <Chip
                                        label="Verified"
                                        size="small"
                                        sx={{
                                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            height: '20px',
                                        }}
                                    />
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
                                    {new Date(comment.date).toLocaleDateString('en-US', {
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
                                    👍 {comment.likes}
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
                                    👎 {comment.dislikes}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </CommentCard>
            ))}
        </Box>
    )

}
export default ExisitingComments;