import { prisma } from "@/db/prisma";
import { sendMessageData } from "@/validations/message.validation";
import { PaginationData } from "@/validations/shared.validation";

export const sendMessage = async (userId: number, data: sendMessageData) => {
    const currentTimestamp = new Date();
    const message = await prisma.message.create({
        data: {
            content: data.content,
            to_user_id: userId,
            created_dtm: currentTimestamp,
        },
    });
    return message;
};

export const getMessages = async (userId: string, paginationData: PaginationData) => {
    const {page , limit} = paginationData;
    const offset = (page - 1) * limit;

    const data = await prisma.message.findMany({
        where: {
            to_user_id: Number(userId),
        },
        skip: offset,
        take: limit,
        orderBy: {
            created_dtm: 'desc',
        }
    });

    const totalMessages = await prisma.message.count({
        where: {
            to_user_id: Number(userId),
        },
    });

    const meta = {
        currentPage: page,
        totalPages: Math.ceil(totalMessages / limit),
        totalItems: totalMessages,
        itemsPerPage: limit,
        hasNextPage: offset + limit < totalMessages,
        hasPreviousPage: offset > 0,
    }

    return { data, meta };
};

export const getMessageById = async (messageId: number) => {
    return await prisma.message.findFirst({
        where: {
            message_id: messageId
        }
    });
}

export const deleteMessageById = async (messageId: number) => {
    return await prisma.message.delete({
        where: {
            message_id: messageId
        }
    });
}