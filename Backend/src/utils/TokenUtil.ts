import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { JWT_CONFIG } from "../config/jwt.js";

export class TokenUtil {
  private static readonly secret: jwt.Secret = ENV.JWT_SECRET;

  static access(payload: JwtPayload | object): string {
    const options: SignOptions = {
      expiresIn: JWT_CONFIG.ACCESS_EXPIRES
    };

    return jwt.sign(payload, this.secret, options);
  }

  static reset(payload: JwtPayload | object): string {
    const options: SignOptions = {
      expiresIn: `${JWT_CONFIG.RESET_EXPIRES_MIN}m`
    };

    return jwt.sign(payload, this.secret, options);
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
