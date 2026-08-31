import { BookOpen, Bot, FileText, Send, User } from 'lucide-react'
import React from 'react'

export default function ChatPreview() {
  return (
<section className="flex h-150 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

  {/* Messages */}
  <div className="flex-1 space-y-7 overflow-hidden px-5 py-6 sm:px-8">

    {/* User Message */}
    <div className="flex justify-end gap-3">
      <div className="max-w-[80%]">

        {/* Header */}
        <div className="mb-1.5 flex items-center justify-end gap-1.5">
          <span className="text-xs font-semibold text-slate-700">
            You
          </span>

          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <User size={13} />
          </div>
        </div>

        {/* Message */}
        <div className="rounded-2xl rounded-tr-md bg-slate-900 px-4 py-3 text-sm leading-6 text-white">
          <p>What are server actions?</p>
        </div>

      </div>
    </div>


    {/* AI Message */}
    <div className="flex gap-3">

      {/* AI Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
        <Bot size={16} />
      </div>

      <div className="max-w-[80%]">

        {/* Header */}
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-700">
            CodeGuide AI
          </span>
        </div>

        {/* Message Content */}
        <div className="rounded-2xl rounded-tl-md bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">

          <p>
            Server Actions are asynchronous functions that run on the server.
            They can be called from both Server and Client Components to handle
            form submissions, data mutations, and other server-side operations.
            They are defined with the &apos;use server&apos; directive and can be defined
            either inline within a Server Component or in a separate file.
            Server Actions are secure by default, creating POST endpoints that
            cannot be accessed directly via URL, and they include automatic CSRF
            protection.
          </p>

          {/* Sources */}
          <div className="mt-4 border-t border-slate-200 pt-3">

            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <BookOpen size={13} />
              Sources
            </div>

            <div className="space-y-2">

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FileText size={14} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-700 capitalize">
                    next.js 16 beginner guide
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Pages: 69, 71
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  </div>


  {/* Static Input */}
  <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5">

    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

      <div className="flex min-h-10 flex-1 items-center px-3 py-2 text-sm text-slate-400">
        Can you explain useEffect?
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
        <Send size={17} />
      </div>

    </div>

    <p className="mt-2 text-center text-[11px] text-slate-400">
      CodeGuide AI can make mistakes. Verify important information.
    </p>

  </div>

</section>  )
}
