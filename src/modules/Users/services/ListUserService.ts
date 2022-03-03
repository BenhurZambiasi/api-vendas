import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUsersService {
  public async execute(): Promise<Users[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = usersRepository.find();
    return users;
  }
}
export default ListUsersService;
