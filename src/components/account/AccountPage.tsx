"use client"
import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
} from '@mui/material';
import {
    Person,
    LocationOn,
    CreditCard,
    Favorite,
    ShoppingCart,
    ExitToApp,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ProfileSection from './ProfileSection';
import AddressSection from './AddressSection';
import PaymentSection from './PaymentSection';

const AccountContainer = styled(Container)(({ theme }) => ({
    paddingTop: '40px',
    paddingBottom: '40px',
    minHeight: '70vh',
}));

const SidebarPaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const ContentPaper = styled(Paper)(({ theme }) => ({
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    minHeight: '500px',
}));

const NavItem = styled(ListItem)<{ active?: boolean }>(({ theme, active }) => ({
    borderRadius: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: active ? '#FF7043' : 'transparent',
    color: active ? 'white' : '#666',

    '&:hover': {
        backgroundColor: active ? '#FF7043' : '#f5f5f5',
    },

    '& .MuiListItemIcon-root': {
        color: active ? 'white' : '#FF7043',
        minWidth: '40px',
    },
}));

const AccountPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'Profile', icon: Person },
        { id: 'addresses', label: 'Addresses', icon: LocationOn },
        { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    ];

    const handleNavigation = (path: string) => {
        window.location.href = path;
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logging out...');
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSection />;
            case 'addresses':
                return <AddressSection />;
            case 'payments':
                return <PaymentSection />;
            default:
                return <ProfileSection />;
        }
    };

    return (
        <AccountContainer maxWidth="lg">
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#333' }}>
                My Account
            </Typography>

            <Grid container spacing={4}>
                {/* Simple Sidebar */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <SidebarPaper>
                        <List sx={{ padding: 0 }}>
                            {menuItems.map((item) => (
                                <NavItem
                                    key={item.id}
                                    active={activeSection === item.id}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    <ListItemIcon>
                                        <item.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </NavItem>
                            ))}

                            {/* Quick Links */}
                            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee' }}>
                                <NavItem onClick={() => handleNavigation('/wishlist')}>
                                    <ListItemIcon>
                                        <Favorite />
                                    </ListItemIcon>
                                    <ListItemText primary="Wishlist" />
                                </NavItem>

                                <NavItem onClick={() => handleNavigation('/cart')}>
                                    <ListItemIcon>
                                        <ShoppingCart />
                                    </ListItemIcon>
                                    <ListItemText primary="Cart" />
                                </NavItem>

                                <NavItem onClick={handleLogout} sx={{ mt: 2, color: '#f44336' }}>
                                    <ListItemIcon sx={{ color: '#f44336 !important' }}>
                                        <ExitToApp />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </NavItem>
                            </Box>
                        </List>
                    </SidebarPaper>
                </Grid>

                {/* Content Area */}
                <Grid  size={{ xs: 12, md: 9 }}>
                    <ContentPaper>
                        {renderContent()}
                    </ContentPaper>
                </Grid>
            </Grid>
        </AccountContainer>
    );
};

export default AccountPage;