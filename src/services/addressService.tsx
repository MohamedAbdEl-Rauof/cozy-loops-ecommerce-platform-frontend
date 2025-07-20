import apiClient from '@/lib/apiClient';
import { AddressFormData } from '@/types/address';

export const getAddresses = async () => {
  try {
    const response = await apiClient.get('/api/addresses');
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

export const createAddress = async (addressData: AddressFormData) => {
  try {
    const response = await apiClient.post('/api/addresses', addressData);
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

export const updateAddress = async (addressId: string, addressData: Partial<AddressFormData>) => {
  try {
    const response = await apiClient.put(`/api/addresses/${addressId}`, addressData);
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

export const deleteAddress = async (addressId: string) => {
  try {
    const response = await apiClient.delete(`/api/addresses/${addressId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

export const setDefaultAddress = async (addressId: string, type: 'shipping' | 'billing') => {
  try {
    const response = await apiClient.put(`/addresses/${addressId}`, {
      isDefault: true,
      type: type
    });
    return response.data;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};