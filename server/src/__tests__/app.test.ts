import request from 'supertest';
import app from '../app';

describe('App', () => {
  it('should handle 404 errors', async () => {
    const response = await request(app).get('/nonexistent-route');

    expect(response.status).toBe(404);
  });

  it('should handle server errors', async () => {
    // Mock a route that throws an error
    app.get('/error', () => {
      throw new Error('Test error');
    });

    const response = await request(app).get('/error');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Something went wrong!');
  });
}); 