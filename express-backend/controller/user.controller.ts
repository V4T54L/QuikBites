import { Response } from 'express';
import { UserService } from '../service/service';
import { AuthenticatedRequest } from '../model/model';

export class UserControllerImpl {
  constructor(private userService: UserService) {}

  async register(req: AuthenticatedRequest, res: Response): Promise<void> {
    await this.userService.register(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  }

  async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    const result = await this.userService.login(req.body);
    res.status(200).json(result);
  }

  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user?.id) {
      res.status(401).json({ message: 'Unauthorized: Missing user ID' });
      return;
    }

    const user = await this.userService.getProfile(req.user.id);
    res.status(200).json(user);
  }

  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user?.id) {
      res.status(401).json({ message: 'Unauthorized: Missing user ID' });
      return;
    }

    await this.userService.updateProfile({ ...req.body, id: req.user.id });
    res.status(200).json({ message: 'Profile updated successfully' });
  }

  async updateCurrentAddress(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user?.id) {
      res.status(401).json({ message: 'Unauthorized: Missing user ID' });
      return;
    }

    await this.userService.updateCurrentAddress(req.user.id, req.body);
    res.status(200).json({ message: 'Address updated successfully' });
  }
}
