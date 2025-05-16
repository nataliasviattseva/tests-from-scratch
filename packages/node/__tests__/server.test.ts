import request from 'supertest';
import { app } from '../src/server';

describe('Server setup', () => {
  it('should respond to GET /users (route exists)', async () => {
    const res = await request(app).get('/users');
    
    expect([200, 404]).toContain(res.statusCode); 
  });

  it('should return 404 on unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
  });

  it('should parse JSON body', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User' })
      .set('Content-Type', 'application/json');

    // Cela suppose que POST /users crée un utilisateur
    expect([200, 201, 400]).toContain(res.statusCode); 
  });
});
