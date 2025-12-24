import { UserModel } from "../../models/User.js";

export class UserRepository {
  findById(id: string) {
    return UserModel.findById(id).select("-password");
  }
  findByIdWithPassword(id: string) {
    return UserModel.findById(id).select("+password");
  }
  update(id: string, data: any) {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).select("-password");
  }
}
