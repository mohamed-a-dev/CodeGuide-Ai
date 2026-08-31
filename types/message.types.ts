import { MessageRole } from "@/generated/prisma/enums";

export type Message = {
    chatId: string;
    content: string;
    role: MessageRole;
    citations?: {
        sources:{
            pageNumbers:number[];
            fileName:string
        }[],
    },
}