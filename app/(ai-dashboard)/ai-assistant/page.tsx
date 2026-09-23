import ChatWorkspaceWrapper from "@/components/Dashboard/ChatWorkspaceWrapper";
import { getDocuments } from "@/services/document.services";
import { Bot } from "lucide-react";

export default async function Page() {
  const documents = await getDocuments();

  return (
    <div className="space-y-5 bg-slate-50/70">
      {/* Header  */}
      <div className="mb-7">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Bot size={18} />
          </div>

          <span className="text-sm font-semibold text-blue-600">
            CodeGuide AI
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          AI Assistant
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Ask coding questions and get AI-powered answers backed by trusted
          developer documentation and references.
        </p>
      </div>

      {/* wrapper */}
      <ChatWorkspaceWrapper documents={documents} />
    </div>
  );
}