import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const usersReposity = getCustomRepository(UsersRepository);
    const user = await usersReposity.findOne(id);
    const userExists = await usersReposity.findByName(name);

    if (!user) {
      throw new AppError('User not found');
    }

    if (userExists && name !== user.name) {
      throw new AppError('There is already a user with the name ' + name);
    }
    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    await usersReposity.save(user);

    return user;
  }
}
export default UpdateUserService;
