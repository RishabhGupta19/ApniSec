import mongoose from "mongoose";
import { ENV } from "./env.js";

export class Database {
  static async connect() {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected");
  }
}
