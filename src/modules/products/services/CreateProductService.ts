import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsReposity = getCustomRepository(ProductRepository);
    const productExists = await productsReposity.findByName(name);
    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('There is already a product with the name ' + name);
    }
    const product = productsReposity.create({ name, price, quantity });

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');
    await productsReposity.save(product);
    return product;
  }
}
export default CreateProductService;
