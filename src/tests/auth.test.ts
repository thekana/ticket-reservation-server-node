import request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/v1/auth.route';
import { SignUpParams } from '../dtos/users.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', () => {
      const userData: SignUpParams = {
        username: 'test@email.com',
        password: 'q1w2e3r4!',
      };
      const authRoute = new AuthRoute();
      const app = new App([authRoute.router]);

      return request(app.getServer()).post('api/v1/signup').send(userData);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: SignUpParams = {
        username: 'test@email.com',
        password: 'q1w2e3r4!',
      };
      process.env.JWT_SECRET = 'jwt_secret';
      const authRoute = new AuthRoute();
      const app = new App([authRoute.router]);

      return request(app.getServer())
        .post('api/v1/login')
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', () => {
      const authRoute = new AuthRoute();
      const app = new App([authRoute.router]);

      return request(app.getServer())
        .post('api/v1/logout')
        .expect('Set-Cookie', /^Authorization=/);
    });
  });
});
