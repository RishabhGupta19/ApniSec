import { UserModel } from "../../models/User.js";
export class UserRepository {
    findById(id) {
        return UserModel.findById(id).select("-password");
    }
    findByIdWithPassword(id) {
        return UserModel.findById(id).select("+password");
    }
    update(id, data) {
        return UserModel.findByIdAndUpdate(id, data, { new: true }).select("-password");
    }
}
