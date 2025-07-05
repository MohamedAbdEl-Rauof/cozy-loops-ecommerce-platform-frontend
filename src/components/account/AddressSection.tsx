"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Alert,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const AddressCard = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  border: '2px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#FF7043',
    boxShadow: '0 4px 12px rgba(255, 112, 67, 0.15)',
  },
}));

const DefaultChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#FF7043',
  color: 'white',
  fontWeight: 600,
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF7043',
  color: 'white',
  padding: '12px 30px',
  '&:hover': {
    backgroundColor: '#FF5722',
  },
}));

interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const AddressSection: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true,
    },
    {
      id: '2',
      type: 'billing',
      firstName: 'John',
      lastName: 'Doe',
      address: '456 Oak Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'United States',
      isDefault: true,
    },
  ]);

  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    type: 'shipping' as 'shipping' | 'billing',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSave = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...formData }
          : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.filter(a => a.type === formData.type).length === 0,
      };
      setAddresses(prev => [...prev, newAddress]);
    }

    setShowForm(false);
    setEditingAddress(null);
    setFormData({
      type: 'shipping',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    setFormData({
      type: 'shipping',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
          Address Book
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowForm(true)}
          sx={{
            backgroundColor: '#FF7043',
            '&:hover': { backgroundColor: '#FF5722' }
          }}
        >
          Add Address
        </Button>
      </Box>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Address updated successfully!
        </Alert>
      )}

      {/* Address Form */}
      {showForm && (
        <Card sx={{ mb: 4, border: '2px solid #FF7043' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#333' }}>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12}}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button
                    variant={formData.type === 'shipping' ? 'contained' : 'outlined'}
                    onClick={() => handleInputChange('type', 'shipping')}
                    sx={{
                      backgroundColor: formData.type === 'shipping' ? '#FF7043' : 'transparent',
                      borderColor: '#FF7043',
                      color: formData.type === 'shipping' ? 'white' : '#FF7043',
                    }}
                  >
                    Shipping Address
                  </Button>
                  <Button
                    variant={formData.type === 'billing' ? 'contained' : 'outlined'}
                    onClick={() => handleInputChange('type', 'billing')}
                    sx={{
                      backgroundColor: formData.type === 'billing' ? '#FF7043' : 'transparent',
                      borderColor: '#FF7043',
                      color: formData.type === 'billing' ? 'white' : '#FF7043',
                    }}
                  >
                    Billing Address
                  </Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <SaveButton onClick={handleSave}>
                {editingAddress ? 'Update Address' : 'Save Address'}
              </SaveButton>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderColor: '#ccc',
                  color: '#666',
                }}
              >
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Address List */}
      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid size={{ xs: 12, md:6 }} key={address.id}>
            <AddressCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={address.type === 'shipping' ? 'Shipping' : 'Billing'}
                      size="small"
                      sx={{
                        backgroundColor: address.type === 'shipping' ? '#4CAF50' : '#2196F3',
                        color: 'white',
                      }}
                    />
                    {address.isDefault && (
                      <DefaultChip label="Default" size="small" />
                    )}
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(address)}
                      sx={{ color: '#FF7043' }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(address.id)}
                      sx={{ color: '#f44336' }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {address.firstName} {address.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {address.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.city}, {address.state} {address.zipCode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.country}
                </Typography>
              </CardContent>
            </AddressCard>
          </Grid>
        ))}
      </Grid>

      {addresses.length === 0 && !showForm && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            No addresses saved yet
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowForm(true)}
            sx={{
              backgroundColor: '#FF7043',
              '&:hover': { backgroundColor: '#FF5722' }
            }}
          >
            Add Your First Address
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddressSection;