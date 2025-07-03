import React from 'react';
import { Box, Container, Typography } from '@mui/material';
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
            <Container
                maxWidth={false}
                sx={{
                    maxWidth: {
                        xs: '100%',
                        sm: '100%',
                        md: '1400px',
                        lg: '1600px',
                        xl: '1850px'
                    },
                    px: { xs: 2, sm: 3, md: 4 },
                    mx: 'auto'
                }}
            >
                <Box
                    sx={{
                        px: { xs: 2, sm: 3, md: 6 },
                        display: 'flex',
                        flexDirection : 'flex-grow',
                        gap: 1
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
            </Container>
        </Box >
    );
};

export default SmallNavbar;