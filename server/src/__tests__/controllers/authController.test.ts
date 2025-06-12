import { Request, Response } from 'express';
import { register, login, refreshToken, getProfile, updateProfile } from '../../controllers/authController';
import { User } from '../../models/User';
import jwt from 'jsonwebtoken';

jest.mock('../../models/User');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
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

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      mockRequest.body = userData;

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.prototype.save as jest.Mock).mockResolvedValue({
        _id: '123',
        email: userData.email,
        name: userData.name,
      });

      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject.success).toBe(true);
      expect(responseObject.data.user).toBeDefined();
      expect(responseObject.data.token).toBeDefined();
    });

    it('should return error if user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      mockRequest.body = userData;

      (User.findOne as jest.Mock).mockResolvedValue({
        email: userData.email,
      });

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject.error).toBe('User already exists');
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockRequest.body = loginData;

      (User.findOne as jest.Mock).mockResolvedValue({
        _id: '123',
        email: loginData.email,
        name: 'Test User',
        comparePassword: jest.fn().mockResolvedValue(true),
      });

      (jwt.sign as jest.Mock).mockReturnValue('mock-token');

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject.success).toBe(true);
      expect(responseObject.data.user).toBeDefined();
      expect(responseObject.data.token).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      mockRequest.body = loginData;

      (User.findOne as jest.Mock).mockResolvedValue({
        _id: '123',
        email: loginData.email,
        name: 'Test User',
        comparePassword: jest.fn().mockResolvedValue(false),
      });

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(responseObject.error).toBe('Invalid credentials');
    });
  });
}); 