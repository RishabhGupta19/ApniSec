import { UserRepository } from "./UserRepository.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { PasswordUtil } from "../../utils/PasswordUtil.js";

export class UserService {
  constructor(private repo = new UserRepository()) {}

  async getProfile(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  async updateProfile(userId: string, data: any) {
    const user = await this.repo.update(userId, data);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    if (!currentPassword || !newPassword) {
      throw new ApiError(400, "Missing password fields");
    }

    // ✅ IMPORTANT CHANGE
    const user = await this.repo.findByIdWithPassword(userId);

    if (!user || !user.password) {
      throw new ApiError(404, "User not found");
    }

    const isValid = await PasswordUtil.compare(
      currentPassword,
      user.password
    );

    if (!isValid) {
      throw new ApiError(400, "Current password is incorrect");
    }

    user.password = await PasswordUtil.hash(newPassword);
    await user.save();
  }
}
