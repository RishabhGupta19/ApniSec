import { UserModel } from "../../models/User.js";
export class AuthRepository {
    findByEmail(email) {
        return UserModel.findOne({ email });
    }
    async create(data) {
        try {
            return await UserModel.create(data);
        }
        catch (error) {
            if (error.code === 11000) {
                throw new error(409, "User already exists");
            }
            throw error;
        }
    }
}
