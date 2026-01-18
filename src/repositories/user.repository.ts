import { prisma } from "@/db/prisma";

export const findUserByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    }
  });
};
