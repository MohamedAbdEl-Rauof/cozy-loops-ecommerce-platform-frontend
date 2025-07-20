import apiWithAuth from "@/lib/apiWithAuth";

export const getUser = async () => {
  try {
    const response = await apiWithAuth.get('/api/users/me');
    return response.data.user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const UpdateProfile = async (formData: FormData) => {
  try {
    const response = await apiWithAuth.put('/api/users/profile', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const UpdatePassword = async (formData: FormData) => {
  try {
    const response = await apiWithAuth.put('/api/users/password', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const uploadImageToCloudinary = async (imageBase64: string): Promise<string> => {
  try {
    const response = await fetch('/api/uploadUserImage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};