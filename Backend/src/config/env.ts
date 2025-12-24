import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string, // ✅ force string
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
   EMAIL_FROM: process.env.EMAIL_FROM as string,
};
