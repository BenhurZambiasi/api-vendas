import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfileService = new ShowProfileService();
    const user = await showProfileService.execute({ user_id });
    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;
    const updateProfile = new UpdateProfileService();
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(instanceToInstance(user));
  }
}
