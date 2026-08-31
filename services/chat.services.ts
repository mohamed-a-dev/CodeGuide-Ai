'use server'
import { auth } from "@/auth";
import prisma from "@/lib/prisma"

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
