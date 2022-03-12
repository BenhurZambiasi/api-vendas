import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersReposity = getCustomRepository(CustomersRepository);
    const customer = await customersReposity.findById(id);
    const customerExists = await customersReposity.findByEmail(email);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already a customer with the email address.');
    }
    customer.name = name;
    customer.email = email;

    await customersReposity.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;
