import { IUser } from "../models/User";

export interface AuthRegisterResult {
  user: IUser;
  accessToken: string;
}
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string; // frontend sends it, service ignores it
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}
