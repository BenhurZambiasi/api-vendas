import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsReposity = getCustomRepository(ProductRepository);
    const product = await productsReposity.findOne(id);
    const productExists = await productsReposity.findByName(name);
    const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product not found');
    }

    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with the name ' + name);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsReposity.save(product);

    return product;
  }
}
export default UpdateProductService;
