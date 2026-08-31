"use client";

import { generateChatResponseAction } from "@/actions/chat.actions";
import { MessageRole } from "@/generated/prisma/enums";
import { displayError } from "@/lib/toast";
import { ChatMessage } from "@/types/chat.types";
import {
  BookOpen,
  Bot,
  FileText,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";

export default function ChatUi({ cateId = null, initialMessages = [], oldChatId = null }: { cateId?: string | null, initialMessages?: ChatMessage[], oldChatId?: string | null }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(oldChatId);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSend = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      return displayError("Write a message!");
    }

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      chatId,
      role: MessageRole.user,
      content: message,
    };

    // Optimistic update
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setLoading(true);

    const {
      success,
      message: responseMessage,
      data,
    } = await generateChatResponseAction(newMessage, cateId);

    if (!success && responseMessage) {
      displayError(responseMessage);
    }

    if (success && data) {
      const formattedData: ChatMessage[] = data.map(
        (message) => ({
          ...message,
          citations:
            message.citations as ChatMessage["citations"],
        })
      );

      setMessages(formattedData);
      setChatId(data[0].chatId);
    }

    setLoading(false);
  };

  return (
    <section
      className="
            flex
            max-w-200 mx-auto
            h-170
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
    >
      {/* Messages */}
      <div
        className="
              scrollbar-thin
              scrollbar-thumb-slate-300
              flex-1
              space-y-7
              overflow-y-auto
              px-5
              py-6
              sm:px-8
            "
      >
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex h-full min-h-125 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Bot size={30} />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Ask me about the documentation
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Ask questions about Next.js, React, JavaScript, or Express.
              CodeGuide AI will answer using your selected documentation.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "How does Next.js App Router work?",
                "Explain React Server Components",
                "How does async/await work in JavaScript?",
                "How do I create middleware in Express?",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setMessage(prompt)}
                  className="
                  cursor-pointer
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-xs
            font-medium
            text-slate-600
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
          "
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}


        {/* Messages */}
        {messages.map((msg) => {
          const isUser = msg.role === MessageRole.user;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"
                }`}
            >
              {/* AI Avatar */}
              {
              !isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Bot size={16} />
                </div>
              )}

              <div
                className={`max-w-[80%] ${isUser ? "items-end" : "items-start"
                  }`}
              >
                {/* Message Header */}
                <div
                  className={`mb-1.5 flex items-center gap-1.5 ${isUser ? "justify-end" : "justify-start"
                    }`}
                >
                  {isUser && (
                    <span className="text-xs font-medium text-slate-500">
                      You
                    </span>
                  )}

                  {!isUser && (
                    <span className="text-xs font-semibold text-slate-700">
                      CodeGuide AI
                    </span>
                  )}

                  {isUser && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <User size={13} />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        leading-6
                        ${isUser
                      ? "rounded-tr-md bg-slate-900 text-white"
                      : "rounded-tl-md bg-slate-50 text-slate-700"
                    }
                      `}
                >
                  <p className="whitespace-pre-wrap">
                    {msg.content}
                  </p>

                  {/* Citations */}
                  {!isUser &&
                    (msg.citations?.sources?.length ?? 0) > 0 && (
                      <div className="mt-4 border-t border-slate-200 pt-3">
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                          <BookOpen size={13} />
                          Sources
                        </div>

                        <div className="space-y-2">
                          {msg.citations?.sources.map(
                            (source, index) => (
                              <div
                                key={`${source.fileName}-${index}`}
                                className="
                                      flex
                                      items-center
                                      gap-3
                                      rounded-xl
                                      border
                                      border-slate-200
                                      bg-white
                                      p-2.5
                                    "
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                  <FileText size={14} />
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-xs font-medium text-slate-700">
                                    {source.fileName}
                                  </p>

                                  <p className="mt-0.5 text-[11px] text-slate-400">
                                    Pages:{" "}
                                    {source.pageNumbers
                                      .sort(
                                        (a, b) => a - b
                                      )
                                      .join(", ")}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading */}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Bot size={16} />
            </div>

            <div>
              <div className="mb-1.5 text-xs font-semibold text-slate-700">
                CodeGuide AI
              </div>

              <div className="rounded-2xl rounded-tl-md bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= Input ================= */}
      <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5">
        <form
          onSubmit={handleSend}
          className="
                flex
                items-end
                gap-2
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-sm
                transition
                focus-within:border-blue-300
                focus-within:ring-4
                focus-within:ring-blue-500/10
              "
        >
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            disabled={loading}
            placeholder="Ask a coding question..."
            className="
                  min-h-10
                  flex-1
                  bg-transparent
                  px-3
                  py-2
                  text-sm
                  text-slate-800
                  outline-none
                  placeholder:text-slate-400
                  disabled:cursor-not-allowed
                "
          />

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="
                cursor-pointer
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-900
                  text-white
                  transition-all
                  hover:bg-blue-600
                  disabled:cursor-not-allowed
                  disabled:bg-slate-200
                  disabled:text-slate-400
                "
          >
            <Send size={17} />
          </button>
        </form>

        <p className="mt-2 text-center text-[11px] text-slate-400">
          CodeGuide AI can make mistakes. Verify important information.
        </p>
      </div>
    </section>
  );
}
