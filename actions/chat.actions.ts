'use server'

import { auth } from "@/auth";
import { AuthErrorHandler } from "@/errors/auth.errors";
import { MessageRole } from "@/generated/prisma/enums";
import { generateEmbedding } from "@/lib/jina";
import { ChatMessageSchema } from "@/lib/validation.zod";
import { createChat, getUserChats } from "@/services/chat.services";
import { searchSimilarChunks } from "@/services/chunk.services";
import { generateChatResponse, generateChatTitle, shouldRetrieve } from "@/services/llm.services";
import { createMessage, getChatMessages } from "@/services/message.services";
import { ChatMessage } from "@/types/chat.types";
import { redirect } from "next/navigation";

export const generateChatResponseAction = async (message: ChatMessage, categoryId: string | null) => {
    // Authentication
    const session = await auth();
    if (!session)
        redirect('/login');

    // validation
    const { chatId, content } = message;
    const result = ChatMessageSchema.safeParse({ chatId, content, categoryId });
    if (!result.success)
        return {
            message: result.error.issues.map(err => err.message).join(", "),
            success: false,
            data: null
        };

    // user info
    const { id: userId } = session.user;

    // create chat if chatId = null
    let chatID = result.data.chatId;
    if (!chatID) {
        const chatTitle = await generateChatTitle(result.data.content);
        const chat = await createChat(userId, chatTitle);
        chatID = chat.id;
    }

    // store user message at db 
    const newMessage = {
        chatId: chatID,
        content: result.data.content,
        role: MessageRole.user,
    }
    await createMessage(newMessage);

    // get all chat messages
    const allMessages = await getChatMessages(chatID);

    // Decide whether the user message requires retrieval from the embedded chunks.
    const needsRetrieval = await shouldRetrieve(result.data.content);

    let messagesToLLM = allMessages.map((message) => ({ role: message.role, content: message.content }));

    if (needsRetrieval) {
        // send message to jina to be embedded 
        const data = await generateEmbedding([result.data.content]);
        const messageEmbedding = data[0].embedding;

        // retrieve related chunks for message (question) 
        const relatedChunks = await searchSimilarChunks(messageEmbedding, result.data.categoryId); // [ {id:1, content:'useState is hook', pageNumber:15, similarity:0.12} ]

        // Include the retrieved chunks as context in the last user message
        // so the LLM can use the relevant context to generate the answer.
        messagesToLLM = messagesToLLM.map((msg, i) => {
            if (i === allMessages.length - 1) {
                const formattedRelatedChunks = relatedChunks.map((chunk) => `File: ${chunk.filename} \n Page: ${chunk.pageNumber} \n ${chunk.content}`).join('\n\n');
                return { role: msg.role, content: `Question: ${msg.content} \n\n context: \n ${formattedRelatedChunks}` }
            }
            return { role: msg.role, content: msg.content };
        });
    }

    // send to llm
    const geminiResponse = await generateChatResponse(messagesToLLM);

    // store gemini message response into DB
    const geminiMessage = await createMessage({
        chatId: chatID,
        role: MessageRole.assistant,
        content: geminiResponse.answer,
        citations: {
            sources: geminiResponse.sources,
        }
    }
    );

    return {
        success: true,
        message: '',
        data: [...allMessages, geminiMessage]
    }
}


export const getUserChatsAction = async () => {
    // authentication
    const session = await auth();
    if (!session)
        redirect('/login');

    const { id: userId } = session.user;

    const chats = await getUserChats(userId);
    
    return chats;
}
