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
      const response = await apiClient.get<MakerResponse>(`/makers/${makerId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching maker:', error);
      throw new Error('Failed to fetch maker information');
    }
  }
};