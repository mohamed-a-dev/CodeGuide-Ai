import { getUserChatsAction } from "@/actions/chat.actions";
import { formatChats } from "@/lib/chat";
import Wrapper from "@/components/History/Wrapper";
import { MessageSquare } from "lucide-react";


export default async function Page() {
  const chats = await getUserChatsAction();

  // format chats 
  const formattedChats = formatChats(chats);

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div>
        {/* Header */}
        <section className="mb-8">
          <div className="flex items-start justify-between gap-4">
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
                Chat History
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Browse and continue your previous conversations with
                CodeGuide AI.
              </p>
            </div>
          </div>
        </section>

        <Wrapper formattedChats={formattedChats}/>
      
        {/* Empty state - optional */}
        {formattedChats.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <MessageSquare size={22} />
            </div>

            <h3 className="font-semibold text-slate-800">
              No conversations yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your previous conversations will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
