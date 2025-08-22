import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

interface SmallNavbarProps {
    category?: string;
    page1?: string;
    page2?: string;
}

const SmallNavbar: React.FC<SmallNavbarProps> = ({
    category,
    page1,
    page2
}) => {
    const params = useParams();
    const categorySlug = params.categorySlug as string;
    return (
        <Box
            component="nav"
            sx={{
                bgcolor: '#162E3F',
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
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Link href="/categories">
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'var(--primary-color)',
                                }
                            }}
                        >
                            {category}
                        </Typography>
                    </Link>

                    {page1 && (
                        <>
                            <PlayArrowIcon
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                }}
                                aria-hidden="true"
                            />
                            <Link href={`/categories/${categorySlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: page2 ? 'white' : 'var(--primary-color)',
                                        fontWeight: page2 ? 500 : 600,
                                        fontSize: '0.875rem',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: 'var(--primary-color)',
                                        }
                                    }}
                                >
                                    {page1}
                                </Typography>
                            </Link>
                        </>
                    )}

                    {page2 && (
                        <>
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
                                {page2}
                            </Typography>
                        </>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default SmallNavbar;