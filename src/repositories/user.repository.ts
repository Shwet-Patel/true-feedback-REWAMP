import { OTP_EXPIRATION_MINUTES } from "@/configs/env-config";
import { prisma } from "@/db/prisma";
import { UserRegistrationData } from "@/validations/user.validation";

export const findUserByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
      is_verified: true,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};



export const registerUserInDB = async (
  userData: UserRegistrationData & { otp: string },
) => {

  const currentTime = new Date();
  const otp_expiration_time = new Date(currentTime.getTime() + OTP_EXPIRATION_MINUTES * 60000);

  return prisma.user.upsert({
    where: {
      email: userData.email,
      is_verified: false,
    },
    update: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      otp: userData.otp,
      otp_expiration_time,
      is_accepting_messages: false,
      is_verified: false,
      created_dtm: currentTime,
      updated_dtm: currentTime,
    },
    create: {
     username: userData.username,
      email: userData.email,
      password: userData.password,
      otp: userData.otp,
      otp_expiration_time,
      is_accepting_messages: false,
      is_verified: false,
      created_dtm: currentTime,
      updated_dtm: currentTime,
    }
  });
};
