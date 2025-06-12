import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('User Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should hash password before saving', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    const user = new User(userData);
    await user.save();

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(user.password).toBe('hashed-password');
  });

  it('should compare password correctly', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'hashed-password',
      name: 'Test User',
    };

    const user = new User(userData);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const isMatch = await user.comparePassword('password123');

    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
    expect(isMatch).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'hashed-password',
      name: 'Test User',
    };

    const user = new User(userData);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const isMatch = await user.comparePassword('wrongpassword');

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashed-password');
    expect(isMatch).toBe(false);
  });

  it('should validate required fields', async () => {
    const user = new User({});

    let error;
    try {
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  it('should validate email format', async () => {
    const user = new User({
      email: 'invalid-email',
      password: 'password123',
      name: 'Test User',
    });

    let error;
    try {
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.email).toBeDefined();
  });
}); 