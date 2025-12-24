import { Router } from "express";
import { UserController } from "./UserController.js";
import { AuthMiddleware } from "../../core/middleware/AuthMiddleware.js";
const router = Router();
const controller = new UserController();
router.get("/profile", AuthMiddleware.protect, controller.getProfile);
router.put("/profile", AuthMiddleware.protect, controller.updateProfile);
// ✅ ADD THIS
router.put("/change-password", AuthMiddleware.protect, controller.changePassword);
export default router;
