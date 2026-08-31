import { MessageRole } from "@/generated/prisma/enums"

export type LLmInputMessages = {
    role: MessageRole;
    content: string;
}[]