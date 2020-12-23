import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignUpParams } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User, UserRole } from '../interfaces/model.interface';
import { UserEntity } from '../entity/users.entity';
import { isEmpty } from '../utils/util';

class AuthService {
  public users = UserEntity;

  public async signup(userData: SignUpParams, role: string): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'bad input');

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { username: userData.username } });
    if (findUser) throw new HttpException(409, `${userData.username} already exists`);
    if (role && role.toUpperCase() === 'ORGANIZER') {
      role = UserRole.ORGANIZER;
    } else {
      role = UserRole.CUSTOMER;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await userRepository.save({ ...userData, password: hashedPassword, role: role as UserRole });
  }

  public async login(userData: SignUpParams): Promise<{ token: string; user: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'bad input');

    const userRepository = getRepository(this.users);
    const user: User = await userRepository.findOne({ where: { username: userData.username } });
    if (!user) throw new HttpException(409, `username ${userData.username} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'wrong password');

    const tokenData = this.createToken(user);
    return { token: tokenData.token, user: user };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, role: user.role, username: user.username };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;
    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }
}

export default AuthService;
