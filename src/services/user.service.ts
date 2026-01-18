import { AppEror } from "@/errors/app.error";
import { findUserByUsername } from "@/repositories/user.repository";
import { prismaErrorHandler } from "@/utils/prismaErrorHandler.utility";
import type { UserRegistrationData } from "@/validations/user.validation";

const registerUserService = async (userData: UserRegistrationData) => {
  try {
    const { username, email, password } = userData;
    
    // 1. Check if user with this username
    const existingUserByUsername = await findUserByUsername(username);
    if (existingUserByUsername) {
      throw new AppEror("Username already taken", 409);
    }

    // 2. Check if user with this email

    // 3. hash password and generate OTP

    // 4. register user in DB

    // 5. send email with OTP

    // 6. return success response
    
  } catch (error) {
    prismaErrorHandler(error);
  }  

};

export default {
  registerUserService
};