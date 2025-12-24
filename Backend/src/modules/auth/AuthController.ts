import { Request, Response, NextFunction } from "express";
import { AuthService } from "./AuthService.js";
import { AuthValidator } from "./AuthValidator.js";
import { UserService } from "../users/UserService.js";

export class AuthController {
  constructor(private service = new AuthService(),) {}
 private userService = new UserService();
register = async (req:Request, res: Response, next:NextFunction) => {
  try {
    const { user, accessToken } = await this.service.register(req.body);

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        tokens: {
          accessToken,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};


  login = async (req:Request, res: Response, next:NextFunction) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken } = await this.service.login(email, password);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        tokens: {
          accessToken,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

 me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ success: false });
      }

      const user = await this.userService.getProfile(req.user.id);

      return res.json({
        success: true,
        data: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (err) {
      next(err);
    }
  };
  forgot = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    await this.service.forgot(req.body.email);

    return res.json({
      success: true
    });
  };

  // reset = async (
  //   req: Request,
  //   res: Response,
  //   _next: NextFunction
  // ): Promise<Response> => {
  //   AuthValidator.reset(req.body);

  //   await this.service.reset(
  //     req.body.token,
  //     req.body.password
  //   );

  //   return res.json({
  //     success: true
  //   });
  // };

reset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    AuthValidator.reset(req.body);

    const { token, password } = req.body;

    await this.service.reset(token, password);

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};



}
