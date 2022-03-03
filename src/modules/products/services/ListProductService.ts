import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsReposity = getCustomRepository(ProductRepository);
    const products = productsReposity.find();
    return products;
  }
}
export default ListProductService;
