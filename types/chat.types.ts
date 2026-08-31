import { MessageRole } from "@/generated/prisma/enums";

export type ChatMessage = {
  id: string;
  chatId: string | null;
  role: MessageRole;
  content: string;
  citations?: {
    sources: {
      fileName: string;
      pageNumbers: number[];
    }[]
  };
};

export type ChatRecord = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}



export type FormattedChat = {
  date: string;
  items: {
    id: string;
    title: string;
    time: string;
  }[]
}

