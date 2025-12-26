import {
  ApiResponse,
  ShipsData,
  Nation,
  VehicleTypesData,
  MediaPathData,
} from '../types/api.types';

const API_BASE_URL = 'http://localhost:3001/api';
const REQUEST_TIMEOUT = 10000; // 10 seconds

class ApiService {
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<T> = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error('API returned error status');
      }
      
      return data.data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - Unable to connect to the Vortex service. Please ensure the proxy server is running on port 3001.');
        }
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
      }
      
      throw new Error('An unexpected error occurred');
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
      
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      
      throw new Error('Failed to fetch data from the Vortex service');
    }
  }
}

export const apiService = new ApiService();
export default apiService;