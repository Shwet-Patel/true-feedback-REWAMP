import { prisma } from "@/db/prisma";
import { email } from "zod";

export const findUserByUsernameOrEmail = async (identifier: string, isVerified: boolean = true) => { 
    return await prisma.user.findFirst({
        where: {
            OR: [
                { username: identifier },
                { email: identifier }
            ],
            is_verified: isVerified
        }
    });
};

export const updatePassword = async (userId: string, password: string) => {
    const currentTimestamp = new Date();
    return await prisma.user.update({
        where: {
            user_id: Number(userId),
            is_verified: true,
        },
        data: {
            password,
            updated_dtm: currentTimestamp,
        }
    });
}

export const updateIsVerified = async (userId: number, isVerified: boolean) => {
    const currentTimestamp = new Date();
    return await prisma.user.update({
        where: {
            user_id: userId,
        },
        data: {
            is_verified: isVerified,
            updated_dtm: currentTimestamp,
        }
    });
};