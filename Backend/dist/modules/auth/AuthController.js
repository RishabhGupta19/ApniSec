import { AuthService } from "./AuthService.js";
import { AuthValidator } from "./AuthValidator.js";
import { UserService } from "../users/UserService.js";
export class AuthController {
    constructor(service = new AuthService()) {
        this.service = service;
        this.userService = new UserService();
        this.register = async (req, res, next) => {
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
            }
            catch (err) {
                next(err);
            }
        };
        this.login = async (req, res, next) => {
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
            }
            catch (err) {
                next(err);
            }
        };
        this.me = async (req, res, next) => {
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
            }
            catch (err) {
                next(err);
            }
        };
        this.forgot = async (req, res, _next) => {
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
        this.reset = async (req, res, next) => {
            try {
                AuthValidator.reset(req.body);
                const { token, password } = req.body;
                await this.service.reset(token, password);
                return res.json({ success: true });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
