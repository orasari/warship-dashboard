import apiService from './api.service';

// Mock fetch globally
global.fetch = jest.fn();

describe('apiService', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error in tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const mockSuccessResponse = (data: any) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'ok', data }),
    });
  };

  const mockErrorResponse = (status: number) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status,
      json: async () => ({}),
    });
  };

  it('fetches ships successfully', async () => {
    const mockShips = { ship1: { name: 'Iowa' } };
    mockSuccessResponse(mockShips);

    const result = await apiService.getShips();

    expect(result).toEqual(mockShips);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/vehicles/'
    );
  });

  it('fetches nations successfully', async () => {
    const mockNations = [{ name: 'usa' }];
    mockSuccessResponse(mockNations);

    const result = await apiService.getNations();

    expect(result).toEqual(mockNations);
  });

  it('fetches all data successfully', async () => {
    const mockData = {
      ships: { ship1: {} },
      nations: [{ name: 'usa' }],
      vehicleTypes: { Battleship: {} },
      mediaPath: '/media/',
    };

    mockSuccessResponse(mockData.ships);
    mockSuccessResponse(mockData.nations);
    mockSuccessResponse(mockData.vehicleTypes);
    mockSuccessResponse(mockData.mediaPath);

    const result = await apiService.getAllData();

    expect(result).toEqual(mockData);
  });

  it('throws error on HTTP error status', async () => {
    mockErrorResponse(404);

    await expect(apiService.getShips()).rejects.toThrow(
      'HTTP error! status: 404'
    );
  });

  it('throws error when API returns error status', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'error', data: null }),
    });

    await expect(apiService.getShips()).rejects.toThrow(
      'API returned error status'
    );
  });

  it('propagates errors from getAllData', async () => {
    mockErrorResponse(500);

    await expect(apiService.getAllData()).rejects.toThrow();
  });
});
