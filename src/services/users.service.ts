import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { SignUpParams } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/model.interface';
import { UserEntity } from '../entity/users.entity';
import { isEmpty } from '../utils/util';

class UserService {
  public users = UserEntity;

  public async findAllUser(): Promise<User[]> {
    const userRepository = getRepository(this.users);
    return await userRepository.find();
  }

  public async findUserById(userId: number): Promise<User> {
    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: SignUpParams): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { username: userData.username } });
    if (findUser) throw new HttpException(409, `You're email ${userData.username} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await userRepository.save({ ...userData, password: hashedPassword });
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await userRepository.update(userId, { ...userData, password: hashedPassword });

    return await userRepository.findOne({ where: { id: userId } });
  }

  public async deleteUser(userId: number): Promise<User> {
    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await userRepository.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
