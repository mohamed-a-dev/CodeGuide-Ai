'use client'
import ChatUi from "@/components/Dashboard/Chat-Ui";
import { getDocuments } from "@/services/document.services";
import { BookOpen, Bot, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [documents, setDocuments] = useState<{ categoryId: string; filename: string }[]>([]);
  const [cateId, setCateId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getDocuments();
      setDocuments(documents);
    }

    fetchDocuments();
  }, [])

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

      {/*  Knowledge Base  */}
      <div className="mb-4 flex items-center justify-between flex-col gap-2 sm:gap-0 sm:flex-row">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Knowledge Base
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            Choose which documentation the AI should use
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <BookOpen size={15} className="text-slate-400" />

            <select
              value={cateId ?? ""}
              onChange={(e) =>
                setCateId(
                  e.target.value === "" ? null : e.target.value
                )
              }
              className="
                capitalize
                    w-48
                    cursor-pointer
                    appearance-none
                    bg-transparent
                    pr-5
                    text-xs
                    font-medium
                    text-slate-700
                    outline-none
                "
            >
              <option value="">All Documentation</option>

              {documents.map((document) => (
                <option
                className="capitalize"
                  key={document.categoryId}
                  value={document.categoryId}
                >
                  {document.filename}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 text-slate-400"
            />
          </div>
        </div>
      </div>


      <ChatUi cateId={cateId} />
    </div>
  );
}