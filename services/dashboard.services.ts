'use server'

import { getUserChatsCount } from "./chat.services"
import { getDocumentsCount } from "./document.services"
import { getUserMessagesCount } from "./message.services"

export const getDashboardStats = async () => {
    const [messages, chats, documents] = await Promise.all([getUserMessagesCount(), getUserChatsCount(), getDocumentsCount()]);

    return { messages, chats, documents };
}