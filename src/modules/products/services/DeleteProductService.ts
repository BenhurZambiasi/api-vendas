import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsReposity = getCustomRepository(ProductRepository);
    const product = await productsReposity.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }
    await productsReposity.remove(product);
  }
}
export default DeleteProductService;
