import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { JWT_CONFIG } from "../config/jwt.js";
export class TokenUtil {
    static access(payload) {
        const options = {
            expiresIn: JWT_CONFIG.ACCESS_EXPIRES
        };
        return jwt.sign(payload, this.secret, options);
    }
    static reset(payload) {
        const options = {
            expiresIn: `${JWT_CONFIG.RESET_EXPIRES_MIN}m`
        };
        return jwt.sign(payload, this.secret, options);
    }
    static verify(token) {
        return jwt.verify(token, this.secret);
    }
}
TokenUtil.secret = ENV.JWT_SECRET;
