import React from 'react';
import { Box, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';

interface SmallNavbarProps {
    category?: string;
    currentPage?: string;
    backgroundColor?: string;
}

const SmallNavbar: React.FC<SmallNavbarProps> = ({
    category = "Category",
    currentPage = "Punch Needle",
    backgroundColor = "#162E3F"
}) => {
    return (
        <Box
            component="nav"
            sx={{
                bgcolor: backgroundColor,
                py: 3,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            role="navigation"
            aria-label="Breadcrumb navigation"
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    margin: '0 auto',
                }}
            >
                <Link href="/categories" >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'white',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                        }}
                    >
                        {category}
                    </Typography>
                </Link>


                <PlayArrowIcon
                    sx={{
                        color: 'white',
                        fontSize: '1rem',
                    }}
                    aria-hidden="true"
                />

                <Typography
                    variant="body2"
                    sx={{
                        color: 'var(--primary-color)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                    }}
                >
                    {currentPage}
                </Typography>
            </Box>
        </Box>
    );
};

export default SmallNavbar;