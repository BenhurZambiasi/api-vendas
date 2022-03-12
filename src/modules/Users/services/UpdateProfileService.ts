import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

interface IResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
class UpdateProfileService {
  public async execute({
    user_id,
    email,
    password,
    name,
    old_password,
  }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }
    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }
    if (password && !old_password) {
      throw new AppError('Old required.');
    }

    if (password && old_password) {
      const checkOldPassword = compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    const userResponse: IResponse = {
      id: user_id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return userResponse;
  }
}
export default UpdateProfileService;
