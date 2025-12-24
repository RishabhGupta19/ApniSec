import { ApiError } from "./ApiError.js";
export class ErrorHandler {
    static handle(err, _req, res, _next) {
        if (err instanceof ApiError) {
            return res.status(err.status).json({
                success: false,
                error: err.message
            });
        }
        console.error(err); // important for debugging
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}
