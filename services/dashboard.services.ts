'use server'

import { redirect } from "next/navigation"
import { getUserChatsCount } from "./chat.services"
import { getDocumentsCount } from "./document.services"
import { getUserMessagesCount } from "./message.services"
import { auth } from "@/auth"

export const getDashboardStats = async () => {
    // authentication
    const session = await auth();
    if (!session)
        redirect('/login');

    const [messages, chats, documents] = await Promise.all([getUserMessagesCount(), getUserChatsCount(), getDocumentsCount()]);

    return { messages, chats, documents };
}