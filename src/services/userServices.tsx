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
    const response = await apiWithAuth.patch('/api/users/profile', formData); 
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const UpdatePassword = async (formData: FormData) => {
  try {
    const response = await apiWithAuth.patch('/api/users/password', formData);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};