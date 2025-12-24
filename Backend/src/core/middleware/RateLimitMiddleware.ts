
import { Request, Response, NextFunction } from "express";
import { RateLimiter } from "../rate-limit/RateLimiter.js";

const limiter = new RateLimiter();

export class RateLimitMiddleware {
  static use(req: Request, res: Response, next: NextFunction): Response | void {
    //  allow CORS preflight
    if (req.method === "OPTIONS") {
      return next();
    }

    if (!limiter.allow(req.ip || "undefined")) {
      return res.status(429).json({
        success: false,
        error: "Too many requests",
      });
    }

    next();
  }
}
