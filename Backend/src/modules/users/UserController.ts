import { Request, Response, NextFunction } from "express";
import { UserService } from "./UserService.js";

export class UserController {
  constructor(private service = new UserService()) {}

  getProfile = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const user = await this.service.getProfile(req.user!.id);

    return res.json({
      success: true,
      data: user
    });
  };

  updateProfile = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const user = await this.service.updateProfile(
      req.user!.id,
      req.body
    );

    return res.json({
      success: true,
      data: user
    });
  };


  changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await this.service.changePassword(
      req.user!.id,
      currentPassword,
      newPassword
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

}
