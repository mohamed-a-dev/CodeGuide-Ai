'use server'
import { auth } from "@/auth";
import prisma from "@/lib/prisma"

export const isChatOwner = async (chatId: string, userId: string) => {
    const chat = await prisma.chat.findFirst({
        where: {
            id: chatId,
            userId,
        },
        select: {
            id: true,
        },
    });

    return !!chat;
};

export const createChat = async (userId: string, title: string) => {
    const chat = await prisma.chat.create({
        data: {
            userId,
            title,
        }
    });

    return chat;
}

export const getUserChats = async (userId: string) => {
    const chats = await prisma.chat.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return chats;
}

export const getUserChatsCount = async () => {
    const session = await auth();
    const userId = session?.user.id;

    return prisma.chat.count({
        where: {
            userId
        }
    });
}
