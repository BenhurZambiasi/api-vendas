import { getCustomRepository } from 'typeorm';
import RedisCache from '@shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsReposity = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCTS_LIST',
    );
    if (!products) {
      products = await productsReposity.find();
      await redisCache.save('api-vendas-PRODUCTS_LIST', products);
    }
    return products;
  }
}
export default ListProductService;
