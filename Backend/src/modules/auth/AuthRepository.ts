import { UserModel } from "../../models/User.js";
import { CreateUserInput } from "../../types";

export class AuthRepository {
  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async create(data: CreateUserInput) {
  try {
    return await UserModel.create(data);
  } catch (error: any) {
    if (error.code === 11000) {
      throw new error(409, "User already exists");
    }
    throw error;
  }
}

}
