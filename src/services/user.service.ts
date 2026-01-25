import { AppEror } from "@/errors/app.error";
import {
  findUserByEmail,
  findUserByUsername,
  registerUserInDB,
} from "@/repositories/user.repository";
import { prismaErrorHandler } from "@/utils/prismaErrorHandler.utility";
import bcrypt from "bcryptjs";
import type { UserRegistrationData } from "@/validations/user.validation";
import { sendVerificationEmail } from "@/utils/sendEmail.utility";
import { findUserByUsernameOrEmail } from "@/repositories/auth.repository";

const registerUserService = async (userData: UserRegistrationData) => {
  try {
    const { username, email, password } = userData;

    // 1. Check if user with this username
    const existingUserByUsername = await findUserByUsername(username);
    if (existingUserByUsername) {
      throw new AppEror("Username already taken", 409);
    }

    // 2. Check if user with this email
    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail && existingUserByEmail.is_verified) {
      throw new AppEror("Email already registered", 409);
    }

    // 3. hash password and generate OTP (random 6 digit code)
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. register user in DB
    const registeredUser = await registerUserInDB({...userData, password: hashedPassword, otp });

    // 5. send email with OTP
    await sendVerificationEmail(registeredUser.username , registeredUser.email, otp);

    // 6. return success response
    return registeredUser;
  } catch (error) {
    prismaErrorHandler(error);
  }
};

const getAcceptMessageStatusService = async (username: string) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new AppEror("User not found", 404);
    }
    return user.is_accepting_messages;
  } catch (error) {
    prismaErrorHandler(error);
  }
};

const getUserDetailsService = async (username: string) => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      throw new AppEror("User not found", 404);
    }
    return user;
  } catch (error) {
    prismaErrorHandler(error);
  }
};

const checkUsernameAvailabilityService = async (username: string) => {
  const user = await findUserByUsernameOrEmail(username);
  return !user;
};


export default {
  registerUserService,
  getAcceptMessageStatusService,
  getUserDetailsService,
  checkUsernameAvailabilityService
};
