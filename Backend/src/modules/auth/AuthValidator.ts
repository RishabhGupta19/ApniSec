import { ApiError } from "../../core/errors/ApiError.js";

export class AuthValidator {
  static login(body: any): asserts body is { email: string; password: string } {
    const { email, password } = body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
  }

  static register(
    body: any
  ): asserts body is { name: string; email: string; password: string; confirmPassword: string } {
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Passwords do not match");
    }
  }

  // static reset(
  //   body: any
  // ): asserts body is { token: string; password: string; confirmPassword: string } {
  //   const { token, password, confirmPassword } = body;

  //   if (!token || !password || password !== confirmPassword) {
  //     throw new ApiError(400, "Invalid reset data");
  //   }
  // }

  static reset(
  body: any
): asserts body is { token: string; password: string } {
  const { token, password } = body;

  if (!token || !password) {
    throw new ApiError(400, "Invalid reset data");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }
}

}
