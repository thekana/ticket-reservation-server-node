import request from 'supertest';
import App from '../app';
import IndexRoute from '../routes/v1/index.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute.router]);

      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
});
