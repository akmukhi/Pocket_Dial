import { Request, Response } from 'express';
import {
  getWatches,
  getWatchById,
  createWatch,
  updateWatch,
  deleteWatch,
  addReview,
} from '../../controllers/watchController';
import { Watch } from '../../models/Watch';

jest.mock('../../models/Watch');

describe('Watch Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
  });

  describe('getWatches', () => {
    it('should return paginated watches', async () => {
      const mockWatches = [
        {
          _id: '1',
          brand: 'Rolex',
          model: 'Submariner',
          price: 8000,
        },
        {
          _id: '2',
          brand: 'Omega',
          model: 'Seamaster',
          price: 5000,
        },
      ];

      mockRequest.query = {
        page: '1',
        limit: '10',
      };

      (Watch.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockWatches),
      });

      (Watch.countDocuments as jest.Mock).mockResolvedValue(2);

      await getWatches(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.success).toBe(true);
      expect(responseObject.data.watches).toEqual(mockWatches);
      expect(responseObject.data.pagination).toBeDefined();
    });

    it('should filter watches by brand', async () => {
      const mockWatches = [
        {
          _id: '1',
          brand: 'Rolex',
          model: 'Submariner',
          price: 8000,
        },
      ];

      mockRequest.query = {
        brand: 'Rolex',
      };

      (Watch.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockWatches),
      });

      (Watch.countDocuments as jest.Mock).mockResolvedValue(1);

      await getWatches(mockRequest as Request, mockResponse as Response);

      expect(Watch.find).toHaveBeenCalledWith({ brand: 'Rolex' });
      expect(responseObject.data.watches).toEqual(mockWatches);
    });
  });

  describe('getWatchById', () => {
    it('should return a watch by id', async () => {
      const mockWatch = {
        _id: '1',
        brand: 'Rolex',
        model: 'Submariner',
        price: 8000,
      };

      mockRequest.params = {
        id: '1',
      };

      (Watch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockWatch),
      });

      await getWatchById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.success).toBe(true);
      expect(responseObject.data.watch).toEqual(mockWatch);
    });

    it('should return 404 if watch not found', async () => {
      mockRequest.params = {
        id: 'nonexistent',
      };

      (Watch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await getWatchById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject.error).toBe('Watch not found');
    });
  });
}); 