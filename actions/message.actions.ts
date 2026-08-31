'use server'

import { auth } from "@/auth"
import { chatIdSchema } from "@/lib/validation.zod";
import { getChatMessages } from "@/services/message.services";
import { redirect } from "next/navigation";

export const getChatMessagesAction = async (chatId: string) => {
    const session = await auth();
    if (!session)
        redirect('/login');

    // input validation
    const result = chatIdSchema.safeParse({ chatId });
    if (!result.success)
        return { success: false, message: result.error.issues.map(err => err.message).join(", "), data: null };

    const messages = await getChatMessages(chatId);
    return {
        success: true,
        message: '',
        data: messages,
    }

}