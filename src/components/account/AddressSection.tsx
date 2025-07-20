"use client"
import React, { useEffect, useState } from 'react';
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
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '@/services/addressService';
import { Address } from '@/types/address';

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

const AddressSection: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAddresses();
      const mappedAddresses = response.addresses.map((addr: any) => ({
        _id: addr._id,
        type: addr.type,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country,
        isDefault: addr.isDefault,
        createdAt: addr.createdAt,
        updatedAt: addr.updatedAt
      }));
      setAddresses(mappedAddresses);
    } catch (err) {
      setError('Failed to fetch addresses');
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    type: 'shipping' as 'shipping' | 'billing',
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
      address: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses(prev => prev.filter(addr => addr._id !== id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to delete address');
      console.error('Error deleting address:', err);
    }
  };

  const handleSave = async () => {
    try {
      if (editingAddress) {
        const response = await updateAddress(editingAddress._id, formData);
        setAddresses(prev => prev.map(addr =>
          addr._id === editingAddress._id
            ? { ...addr, ...response.address }
            : addr
        ));
      } else {
        const response = await createAddress(formData);
        setAddresses(prev => [...prev, response.address]);
      }

      setShowForm(false);
      setEditingAddress(null);
      setFormData({
        type: 'shipping',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save address');
      console.error('Error saving address:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    setFormData({
      type: 'shipping',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    });
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Address updated successfully!
        </Alert>
      )}

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>Loading addresses...</Typography>
        </Box>
      ) : (
        <>
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

          {/* Address Form */}
          {showForm && (
            <Card sx={{ mb: 4, border: '2px solid #FF7043' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#333' }}>
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
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
              <Grid size={{ xs: 12, md: 6 }} key={address._id}>
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
                          onClick={() => handleDelete(address._id)}
                          sx={{ color: '#f44336' }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {address.street}
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
        </>
      )}

    </Box>
  );
};

export default AddressSection;