import request from 'supertest';
import app from '../../app';
import { Watch } from '../../models/Watch';
import jwt from 'jsonwebtoken';

jest.mock('../../models/Watch');
jest.mock('jsonwebtoken');

describe('Watch Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/watches', () => {
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

      (Watch.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockWatches),
      });

      (Watch.countDocuments as jest.Mock).mockResolvedValue(2);

      const response = await request(app)
        .get('/api/watches')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.watches).toEqual(mockWatches);
      expect(response.body.data.pagination).toBeDefined();
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

      (Watch.find as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockWatches),
      });

      (Watch.countDocuments as jest.Mock).mockResolvedValue(1);

      const response = await request(app)
        .get('/api/watches')
        .query({ brand: 'Rolex' });

      expect(response.status).toBe(200);
      expect(response.body.data.watches).toEqual(mockWatches);
    });
  });

  describe('GET /api/watches/:id', () => {
    it('should return a watch by id', async () => {
      const mockWatch = {
        _id: '1',
        brand: 'Rolex',
        model: 'Submariner',
        price: 8000,
      };

      (Watch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockWatch),
      });

      const response = await request(app).get('/api/watches/1');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.watch).toEqual(mockWatch);
    });

    it('should return 404 if watch not found', async () => {
      (Watch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app).get('/api/watches/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Watch not found');
    });
  });

  describe('POST /api/watches', () => {
    it('should create a new watch', async () => {
      const watchData = {
        brand: 'Rolex',
        model: 'Submariner',
        reference: '126610LN',
        price: 8000,
        movement: 'Automatic',
        caseSize: 41,
        waterResistance: 300,
      };

      (Watch.prototype.save as jest.Mock).mockResolvedValue({
        _id: '1',
        ...watchData,
      });

      (jwt.verify as jest.Mock).mockReturnValue({ id: '123' });

      const response = await request(app)
        .post('/api/watches')
        .set('Authorization', 'Bearer valid-token')
        .send(watchData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.watch).toBeDefined();
    });

    it('should return 401 if not authenticated', async () => {
      const watchData = {
        brand: 'Rolex',
        model: 'Submariner',
        reference: '126610LN',
        price: 8000,
      };

      const response = await request(app)
        .post('/api/watches')
        .send(watchData);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('No token provided');
    });
  });
}); 