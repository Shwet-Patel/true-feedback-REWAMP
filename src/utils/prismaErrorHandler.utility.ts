import { AppEror } from "@/errors/app.error";
import { Prisma } from "@/generated/prisma/client";

export const prismaErrorHandler = (error: any): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppEror("Unique constraint failed", 409);

      case "P2025":
        throw new AppEror("Record not found", 404);

      case "P2003":
        throw new AppEror("Invalid foreign key reference", 400);

      case "P2000":
      case "P2011":
        throw new AppEror("Invalid data provided", 400);
    }
  }

  throw error;
};
