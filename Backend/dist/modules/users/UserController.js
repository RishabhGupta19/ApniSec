import { UserService } from "./UserService.js";
export class UserController {
    constructor(service = new UserService()) {
        this.service = service;
        this.getProfile = async (req, res, _next) => {
            const user = await this.service.getProfile(req.user.id);
            return res.json({
                success: true,
                data: user
            });
        };
        this.updateProfile = async (req, res, _next) => {
            const user = await this.service.updateProfile(req.user.id, req.body);
            return res.json({
                success: true,
                data: user
            });
        };
        this.changePassword = async (req, res, next) => {
            try {
                const { currentPassword, newPassword } = req.body;
                await this.service.changePassword(req.user.id, currentPassword, newPassword);
                res.json({ success: true });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
