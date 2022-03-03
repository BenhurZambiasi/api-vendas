import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListUserService();
    const products = await listProducts.execute();
    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProducts = new ShowUserService();
    const products = await showProducts.execute({ id });
    return res.json(products);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createProduct = new CreateUserService();
    const product = await createProduct.execute({ name, email, password });
    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, avatar } = req.body;
    const updateProduct = new UpdateUserService();
    const product = await updateProduct.execute({
      id,
      name,
      email,
      password,
      avatar,
    });
    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteUserService();
    await deleteProduct.execute({ id });
    return res.json([]);
  }
}
