import { NextFunction, Request, Response } from 'express';
import { SignUpParams, LoginParams } from '../dtos/users.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/model.interface';
import AuthService from '../services/auth.service';
import { ResponseJson } from '../interfaces/response.interface';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response<ResponseJson>, next: NextFunction): Promise<void> => {
    try {
      const userData: SignUpParams = req.body;
      const { id, username, role }: User = await this.authService.signup(userData, req.query.role as string);
      res.status(201).json({ code: 0, data: { id, username, role }, message: '' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response<ResponseJson>, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginParams = req.body;
      const { token, user } = await this.authService.login(userData);
      const { id, username, role } = user;
      res.status(200).json({ code: 0, message: 'login', data: { user: { id, username, role }, token } });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response<ResponseJson>, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ code: 0, data: {}, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public check = async (req: RequestWithUser, res: Response<ResponseJson>, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ code: 0, message: 'check', data: req.user });
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;
