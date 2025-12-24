import dotenv from "dotenv";
dotenv.config();
export const ENV = {
    PORT: process.env.PORT || "5000",
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET, // ✅ force string
    FRONTEND_URL: process.env.FRONTEND_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
};
