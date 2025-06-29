"use client"

import type React from "react"
import { useState } from "react"
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    InputBase,
    Badge,
    Avatar,
    Button,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Container,
    styled,
} from "@mui/material"
import {
    Search as SearchIcon,
    Menu as MenuIcon,
    Person as PersonIcon,
    Home as HomeIcon,
    Category as CategoryIcon,
    Info as InfoIcon,
} from "@mui/icons-material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

const NavbarContainer = styled(Box)(() => ({
    backgroundColor: "var(--foreground)",

}))

const Navbar = ({
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth");
    const router = useRouter();
    const { user, logout } = useAuth();

    if (isAuthPage) return null

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleUserMenuClose = () => {
        setAnchorEl(null)
    }

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const navigationItems = [
        { name: "Home", path: "/", icon: <HomeIcon /> },
        { name: "Categories", path: "/categories", icon: <CategoryIcon /> },
        { name: "About", path: "/about", icon: <InfoIcon /> }
    ];

    const renderDesktopNav = () => (
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navigationItems.map((item) => (
                <Link href={item.path} key={item.name} style={{ textDecoration: 'none' }}>
                    <Button
                        sx={{
                            color: pathname === item.path ? "var(--primary-color)" : "var(--text-primary)",
                            fontWeight: 500,
                            textTransform: "none",
                            fontSize: "16px",
                            position: "relative",
                            transition: "color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "transparent",
                                color: "var(--primary-color)",
                            },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                width: pathname === item.path ? "100%" : "0%",
                                height: "2px",
                                backgroundColor: "var(--primary-color)",
                                transition: "width 0.3s ease, left 0.3s ease",
                                transform: pathname === item.path ? "translateX(-50%)" : "none",
                            },
                            "&:hover::after": {
                                width: "100%",
                                left: "0%",
                                transform: "translateX(0)",
                            }
                        }}
                    >
                        {item.name}
                    </Button>
                </Link>
            ))}
        </Box>
    )

    const renderMobileMenu = () => (
        <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            sx={{
                "& .MuiDrawer-paper": {
                    width: 280,
                    backgroundColor: "var(--foreground)",
                    padding: "16px 0",
                },
            }}
        >

            <List>
                {navigationItems.map((item) => (
                    <Link href={item.path} key={item.name} style={{ textDecoration: 'none' }}>
                        <ListItem
                            onClick={handleMobileMenuToggle}
                            sx={{
                                borderLeft: pathname === item.path ? '4px solid var(--primary-color)' : '4px solid transparent',
                                backgroundColor: pathname === item.path ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{
                                color: pathname === item.path ? 'var(--primary-color)' : 'var(--text-primary)',
                                minWidth: '40px'
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontWeight: pathname === item.path ? 600 : 500,
                                        color: pathname === item.path ? 'var(--primary-color)' : 'var(--text-primary)',
                                    },
                                }}
                            />
                        </ListItem>
                    </Link>
                ))}

                {!user && (
                    <ListItem
                        onClick={() => {
                            handleMobileMenuToggle();
                            router.push("/auth/login");
                        }}
                        sx={{
                            mt: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Login / Register"
                            sx={{
                                "& .MuiTypography-root": {
                                    fontWeight: 500,
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />
                    </ListItem>
                )}

                {user && (
                    <>
                        <ListItem sx={{ mt: 2 }}>
                            <ListItemText
                                primary="My Account"
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontWeight: 600,
                                        color: 'var(--text-muted)',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    },
                                }}
                            />
                        </ListItem>

                        <ListItem
                            onClick={() => {
                                handleMobileMenuToggle();
                                router.push("/profile");
                            }}
                            sx={{
                                py: 1.5,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Profile"
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontWeight: 500,
                                        color: 'var(--text-primary)',
                                    },
                                }}
                            />
                        </ListItem>

                        <ListItem
                            onClick={() => {
                                handleMobileMenuToggle();
                                router.push("/cart");
                            }}
                            sx={{
                                py: 1.5,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <StorefrontIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Cart"
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontWeight: 500,
                                        color: 'var(--text-primary)',
                                    },
                                }}
                            />
                            <Badge
                                badgeContent={3}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontSize: '0.7rem',
                                        height: '18px',
                                        minWidth: '18px'
                                    }
                                }}
                            />
                        </ListItem>

                        <ListItem
                            onClick={() => {
                                handleMobileMenuToggle();
                                router.push("/favorites");
                            }}
                            sx={{
                                py: 1.5,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <FavoriteBorderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Favorites"
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontWeight: 500,
                                        color: 'var(--text-primary)',
                                    },
                                }}
                            />
                            <Badge
                                badgeContent={2}
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        fontSize: '0.7rem',
                                        height: '18px',
                                        minWidth: '18px'
                                    }
                                }}
                            />
                        </ListItem>

                        <Box sx={{ mt: 2, mx: 2, borderTop: '1px solid var(--border-light)', pt: 1 }}>
                            <ListItem
                                onClick={() => {
                                    handleMobileMenuToggle();
                                    logout?.();
                                }}
                                sx={{
                                    py: 1.5,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgba(211, 47, 47, 0.05)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px', color: 'var(--danger-color)' }}>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Logout"
                                    sx={{
                                        "& .MuiTypography-root": {
                                            fontWeight: 500,
                                            color: 'var(--danger-color)'
                                        },
                                    }}
                                />
                            </ListItem>
                        </Box>
                    </>
                )}
            </List>
        </Drawer>
    )

    const renderUserSection = () => {
        if (user) {
            return (
                <>
                    {!isMobile && !isTablet && (
                        <>
                            <IconButton sx={{ color: "var(--text-primary)" }}>
                                <Badge badgeContent={2} color="error">
                                    <FavoriteBorderIcon />
                                </Badge>
                            </IconButton>
                            <IconButton sx={{ color: "var(--text-primary)" }}>
                                <Badge badgeContent={3} color="error">
                                    <StorefrontIcon />
                                </Badge>
                            </IconButton>
                        </>
                    )}
                    <IconButton onClick={handleUserMenuOpen}>
                        <Avatar src={user?.avatar} sx={{ width: 32, height: 32, bgcolor: "var(--primary-color)" }}>
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || '?'}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleUserMenuClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                minWidth: '180px'
                            }
                        }}
                    >
                        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>My Orders</MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleUserMenuClose()
                                logout?.()
                            }}
                            sx={{ color: 'var(--danger-color)' }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            )
        } else {
            return (
                <>
                    {!isMobile && (
                        <Button
                            variant="outlined"
                            startIcon={<PersonIcon />}
                            onClick={() => router.push("/auth/login")}
                            sx={{
                                color: "var(--text-primary)",
                                borderColor: "var(--text-primary)",
                                textTransform: "none",
                                "&:hover": {
                                    borderColor: "var(--primary-color)",
                                    color: "var(--primary-color)",
                                },
                            }}
                        >
                            Login
                        </Button>
                    )}
                </>
            )
        }
    }

    return (
        <>
            <NavbarContainer>
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
                    <AppBar
                        position="static"
                        elevation={0}
                        sx={{
                            backgroundColor: "var(--foreground)",
                            borderBottom: "1px solid var(--border-light)",
                            px: { xs: 2, sm: 3, md: 6 }
                        }}
                    >
                        <Toolbar sx={{
                            justifyContent: "space-between",
                            padding: "0 !important",
                            height: { xs: '64px', md: '72px' }
                        }}>
                            {/* Logo */}
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            >
                                <Link href="/" passHref style={{ textDecoration: 'none' }}>
                                    <Image
                                        src="/images/navbarLogo.svg"
                                        alt="Cozy Loops Logo"
                                        width={isMobile ? 80 : 100}
                                        height={isMobile ? 32 : 40}
                                        quality={100}
                                        priority
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Link>
                            </Box>

                            {/* Desktop Navigation */}
                            {!isMobile && renderDesktopNav()}

                            {/* Search Bar */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: "var(--foreground)",
                                    borderRadius: "24px",
                                    padding: "4px 12px",
                                    width: { xs: '40%', sm: '35%', md: '30%' },
                                    border: "1px solid var(--border-light)",
                                    '&:hover': {
                                        boxShadow: '0 0 0 2px rgba(var(--primary-rgb), 0.1)',
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <SearchIcon sx={{ color: "var(--text-muted)", mr: 1 }} />
                                <InputBase
                                    placeholder="What are you looking for?"
                                    sx={{
                                        flex: 1,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        color: "var(--text-primary)",
                                        '& .MuiInputBase-input': {
                                            padding: { xs: '6px 0', md: '8px 0' },
                                        }
                                    }}
                                />
                            </Box>

                            {/* User Section & Mobile Menu Button */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
                                {renderUserSection()}

                                {/* Mobile Menu Button - Now on the right */}
                                {isMobile && (
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={handleMobileMenuToggle}
                                        sx={{
                                            color: "var(--text-primary)",
                                            ml: 1,
                                            border: mobileMenuOpen ? '1px solid var(--primary-color)' : '1px solid transparent',
                                            backgroundColor: mobileMenuOpen ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent',
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Toolbar>
                    </AppBar>

                </Container>
            </NavbarContainer>

            {/* Mobile Menu */}
            {renderMobileMenu()}
        </>
    )
}

export default Navbar