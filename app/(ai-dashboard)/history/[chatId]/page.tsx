import { getChatMessagesAction } from "@/actions/message.actions";
import ChatUi from "@/components/Dashboard/Chat-Ui";
import { ChatMessage } from "@/types/chat.types";
import { MessageSquare } from "lucide-react";

export default async function Page({ params, }: { params: { chatId: string } }) {
  const { chatId } = await params;
  const { success, message, data } = await getChatMessagesAction(chatId);

  if (!success || !data)
    return <p className="text-red-500 text-2xl text-center mt-10">{message}</p>


  const oldChatMessages = data.map(
    (message) => ({
      ...message,
      citations:
        message.citations as ChatMessage["citations"],
    })
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="mb-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <MessageSquare size={18} />
            </div>

            <span className="text-sm font-semibold text-blue-600">
              CodeGuide AI
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Chat
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            View and continue your previous conversations with CodeGuide AI.
          </p>
        </div>
      </section>
      
      <ChatUi oldChatId={chatId} initialMessages={oldChatMessages} />
    </div>
  );
}