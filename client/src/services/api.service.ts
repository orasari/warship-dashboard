import {
  ApiResponse,
  ShipsData,
  Nation,
  VehicleTypesData,
  MediaPathData,
} from '../types/api.types';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<T> = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error('API returned error status');
      }
      
      return data.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getShips(): Promise<ShipsData> {
    return this.fetchWithErrorHandling<ShipsData>('/vehicles/');
  }

  async getNations(): Promise<Nation[]> {
    return this.fetchWithErrorHandling<Nation[]>('/nations/');
  }

  async getVehicleTypes(): Promise<VehicleTypesData> {
    return this.fetchWithErrorHandling<VehicleTypesData>('/vehicle_types_common/');
  }

  async getMediaPath(): Promise<MediaPathData> {
    return this.fetchWithErrorHandling<MediaPathData>('/media_path/');
  }

  // Fetch all data at once
  async getAllData() {
    try {
      const [ships, nations, vehicleTypes, mediaPath] = await Promise.all([
        this.getShips(),
        this.getNations(),
        this.getVehicleTypes(),
        this.getMediaPath(),
      ]);

      return {
        ships,
        nations,
        vehicleTypes,
        mediaPath,
      };
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
export default apiService;