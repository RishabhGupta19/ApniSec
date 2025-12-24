import { AuthRepository } from "./AuthRepository.js";
import { PasswordUtil } from "../../utils/PasswordUtil.js";
import { TokenUtil } from "../../utils/TokenUtil.js";
import { EmailService } from "../../utils/EmailService.js";
import crypto from "crypto";
import { ApiError } from "../../core/errors/ApiError.js";
import { UserModel } from "../../models/User.js";
export class AuthService {
    constructor(repo = new AuthRepository()) {
        this.repo = repo;
    }
    /**
     * Register a new user
     * Returns both user and accessToken (NOT string anymore)
     */
    async register(data) {
        const existingUser = await this.repo.findByEmail(data.email);
        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }
        const hashedPassword = await PasswordUtil.hash(data.password);
        const user = await this.repo.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        const accessToken = TokenUtil.access({
            id: user._id.toString(),
        });
        await EmailService.welcome(user.email);
        return {
            user,
            accessToken,
        };
    }
    /**
     * Login existing user
     * Returns user + accessToken (frontend expects this shape)
     */
    async login(email, password) {
        const user = await this.repo.findByEmail(email);
        if (!user) {
            throw new ApiError(404, "User not registered. Please register first.");
        }
        const isValid = await PasswordUtil.compare(password, user.password);
        if (!isValid) {
            throw new ApiError(401, "Invalid credentials");
        }
        const accessToken = TokenUtil.access({
            id: user._id.toString(),
        });
        return {
            user,
            accessToken,
        };
    }
    /**
     * Forgot password
     */
    async forgot(email) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            return;
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        await EmailService.reset(email, token);
    }
    /**
     * Reset password
     */
    async reset(token, password) {
        const user = await UserModel.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });
        console.log("RESET BODY:", token, password);
        if (!user) {
            throw new ApiError(400, "Invalid or expired reset token");
        }
        user.password = await PasswordUtil.hash(password);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        await EmailService.profileUpdated(user.email);
    }
}
