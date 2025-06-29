"use client"
import { Box, Container, Typography, Link, Grid, IconButton, Divider, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Twitter, LinkedIn, Facebook, GitHub, Language, Public } from "@mui/icons-material"
import { usePathname } from "next/navigation"
import Image from "next/image"

const FooterContainer = styled(Box)(() => ({
    color: "white",
    paddingBottom: 0,
}))

const NewsletterSection = styled(Box)(({ theme }) => ({
    backgroundColor: "#162E3F",
    padding: theme.spacing(6, 0),
}))

const BottomSection = styled(Box)(({ theme }) => ({
    backgroundColor: "#0E1F2B",
    padding: theme.spacing(3, 0),
}))

const NavLink = styled(Link)(() => ({
    color: "#b0c4c1",
    textDecoration: "none",
    fontSize: "0.95rem",
    "&:hover": {
        color: "white",
        textDecoration: "none",
    },
}))

const SocialIconButton = styled(IconButton)(() => ({
    color: "#b0c4c1",
    "&:hover": {
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
}))

const navigationLinks = [
    { label: "About Cozy Loops", href: "/about" },
    { label: "Categories", href: "/categories" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
]

const socialIcon = [
    { icon: <Twitter />, href: "https://twitter.com/cozyloops" },
    { icon: <LinkedIn />, href: "https://www.linkedin.com/company/cozy-loops/" },
    { icon: <Facebook />, href: "https://www.facebook.com/cozyloops/" },
    { icon: <GitHub />, href: "https://github.com/cozyloops" },
    { icon: <Language />, href: "#" },
    { icon: <Public />, href: "#" },
]

export default function Footer() {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth");
    if (isAuthPage) return null

    return (
        <FooterContainer>
            <NewsletterSection>
                <Container maxWidth="xl">
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: { xs: "1.75rem", md: "2rem" },
                                    lineHeight: 1.3,
                                }}
                            >
                                Get the First Look at New Handmade Drops
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#b0c4c1",
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    lineHeight: 1.6,
                                }}
                            >
                                Cozy Loops is proud to support independent artisans across Egypt and the Middle East.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    maxWidth: '500px',
                                    margin: { xs: '0 auto', sm: '0 0 0 auto' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: '9999px',
                                    padding: { xs: '3px', sm: '4px' },
                                    overflow: 'hidden',
                                    maxHeight: { xs: '50px', sm: '60px' },
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    '@media (max-width: 480px)': {
                                        flexDirection: 'row',
                                        height: '50px',
                                    }
                                }}
                            >
                                <input
                                    placeholder="Your email address"
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        width: '100%',
                                        padding: '12px 20px',
                                        fontSize: '0.95rem',
                                        backgroundColor: 'transparent',
                                        color: 'black',
                                    }}
                                    className="custom-input-placeholder"
                                />
                                <button
                                    className="rounded-full"
                                    style={{
                                        backgroundColor: "#ff6b35",
                                        color: "white",
                                        padding: "10px 20px",
                                        marginRight: "10px",
                                        fontSize: "0.7rem",
                                        fontWeight: 800,
                                        textTransform: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                        minWidth: '140px',
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e55a2b"}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff6b35"}
                                >
                                    Join the Cozy Loop
                                </button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </NewsletterSection>

            <Box sx={{ backgroundColor: "#162E3F", py: 1 }}>
                <Container maxWidth="xl">
                    <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 4 }} />
                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                    <Link href="/">
                                        <Image
                                            src="/images/navbarLogo.svg"
                                            alt="Logo"
                                            width={150}
                                            height={50}
                                            style={{ objectFit: 'contain', cursor: 'pointer' }}
                                        />
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 9 }}>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={{ xs: 2, sm: 4 }}
                                    sx={{
                                        justifyContent: { sm: "flex-end" },
                                        alignItems: { xs: "center", sm: "center" },
                                        mt: { xs: 2, sm: 0 }
                                    }}
                                >
                                    {navigationLinks.map(({ label, href }) => (
                                        <NavLink key={href} href={href}>
                                            {label}
                                        </NavLink>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>

                </Container>
            </Box>

            <BottomSection>
                <Container maxWidth="xl">
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#b0c4c1",
                                    fontSize: "0.85rem",
                                    textAlign: { xs: "center", md: "left" },
                                }}
                            >
                                © 2025 Untitled UI. All rights reserved.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    justifyContent: { xs: "center", md: "flex-end" },
                                    alignItems: "center",
                                }}
                            >
                                {socialIcon.map(({ icon, href }) => (
                                    <Link key={href} href={href}>
                                        <SocialIconButton
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                cursor: 'pointer',
                                                color: "#b0c4c1",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {icon}
                                        </SocialIconButton>
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </BottomSection>
        </FooterContainer>
    )
}