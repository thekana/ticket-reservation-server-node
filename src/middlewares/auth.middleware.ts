import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.body.token) {
      const secret = process.env.JWT_SECRET;
      const claims = jwt.verify(req.body.token, secret) as DataStoredInToken;
      req.user = { username: claims.username, id: claims.id, role: claims.role, password: '' };
      next();
    } else {
      next(new HttpException(401, 'Unauthorized'));
    }
  } catch (error) {
    next(new HttpException(401, 'Invalid token'));
  }
};

export default authMiddleware;
