import { TokenUtil } from "../../utils/TokenUtil.js";
export class AuthMiddleware {
    static protect(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    error: "Authentication required",
                });
            }
            const token = authHeader.split(" ")[1];
            const decoded = TokenUtil.verify(token);
            req.user = { id: decoded.id };
            next();
        }
        catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    error: "Token expired",
                    code: "TOKEN_EXPIRED",
                });
            }
            return res.status(401).json({
                success: false,
                error: "Invalid token",
            });
        }
    }
}
