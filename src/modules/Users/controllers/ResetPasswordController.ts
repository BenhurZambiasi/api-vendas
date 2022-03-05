import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;
    const resetPasssword = new ResetPasswordService();
    await resetPasssword.execute({ token, password });
    return res.status(204).json();
  }
}
