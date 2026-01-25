import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DATABASE_URL || "";

export const NODE_ENV = process.env.NODE_ENV || "development";

export const OTP_EXPIRATION_MINUTES = Number(process.env.OTP_EXPIRATION_MINUTES) || 10;

export const EMAIL_USER = process.env.GMAIL_USER || "";
export const EMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";