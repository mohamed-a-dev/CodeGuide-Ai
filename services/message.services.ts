'use server'
import { auth } from "@/auth";
import prisma from "@/lib/prisma"
import { Message } from "@/types/message.types"

export const createMessage = async (message: Message) => {
    return await prisma.message.create({
        data: message
    });
}

export const getChatMessages = async (chatId: string) => {
    const session = await auth();
    const userId = session?.user.id;

    return await prisma.message.findMany({
        where: {
            chatId,
            chat: {
                userId
            }
        }
    });
}

export const getUserMessagesCount = async () => {
    const session = await auth();
    const userId = session?.user.id;

    return prisma.message.count({
        where: {
            chat: {
                userId
            }
        }
    });
}