import apiClient from '@/lib/apiClient';

export interface Maker {
  _id: string;
  name: string;
  slug: string;
  location: string;
  image: string;
  specialties: string[];
  aboutMe: string;
  joinDate: string;
  website?: string;
  isActive: boolean;
  rating: number;
  totalProducts: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MakerResponse {
  success: boolean;
  data: Maker;
}

export const makerService = {
  async getMakerById(makerId: string): Promise<Maker> {
    
    try {
      const response = await apiClient.get<MakerResponse>(`/api/makers/${makerId}`);
    
      if (!response.data.success) {
        throw new Error('API returned success: false');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('🚨 API Error Details:', error);
      
      if (error.response?.status === 404) {
        throw new Error(`Maker with ID/slug "${makerId}" not found`);
      }
      
      throw new Error(`Failed to fetch maker: ${error.message}`);
    }
  }
};