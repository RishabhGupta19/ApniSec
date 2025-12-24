import express from "express";
import cors from "cors";
import auth from "./modules/auth/auth.routes.js";
import { RateLimitMiddleware } from "./core/middleware/RateLimitMiddleware.js";
import { ErrorHandler } from "./core/errors/ErrorHandler.js";
import userRoutes from "./modules/users/user.routes.js";
import issueRoutes from "./modules/issues/issue.routes.js";


export const app = express();
app.use(
  cors({
    origin: true,        // allow any origin in dev
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: handle preflight
app.options(/.*/, cors());
app.use(express.json());
app.use(RateLimitMiddleware.use);

app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/auth", auth);

app.use(ErrorHandler.handle);
app.get('/', (req, res) => {
  res.send('Backend is running');
});
