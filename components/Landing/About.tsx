import {
  ArrowRight,
  Brain,
  Check,
  Database,
  FileCode2,
  Layers3,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const technologies = [
  "Next.js",
  "React",
  "JavaScript",
  "RAG",
  "PostgreSQL + pgvector",
  "Vercel AI SDK",
  "Redis",
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-[calc(100vh-64px)] bg-slate-50/70"
    >
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            <Sparkles size={14} />
            Built for developers
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            About CodeGuide AI
          </h2>

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />

          <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
            An AI-powered developer assistant built to make technical
            documentation easier to search, understand, and use.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Description */}
          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              sm:p-8
            "
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Brain size={21} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Intelligent Documentation Search
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Powered by Retrieval-Augmented Generation
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-base leading-7 text-slate-600">
                CodeGuide AI is an AI-powered developer assistant that helps
                developers search and understand JavaScript, React, and Next.js
                documentation using{" "}
                <span className="font-semibold text-slate-800">
                  Retrieval-Augmented Generation (RAG)
                </span>
                .
              </p>

              <p className="text-sm leading-7 text-slate-500">
                Ask technical questions and receive contextual answers based
                on trusted documentation. CodeGuide AI retrieves the most
                relevant information from its knowledge base, generates a
                helpful response, and provides clear source citations.
              </p>
            </div>

            {/* Features */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <MessageSquare
                  size={18}
                  className="text-blue-600"
                />

                <p className="mt-3 text-xs font-semibold text-slate-700">
                  Ask Questions
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Ask technical questions naturally.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <Layers3
                  size={18}
                  className="text-blue-600"
                />

                <p className="mt-3 text-xs font-semibold text-slate-700">
                  Smart Retrieval
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Find relevant documentation instantly.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <FileCode2
                  size={18}
                  className="text-blue-600"
                />

                <p className="mt-3 text-xs font-semibold text-slate-700">
                  Trusted Sources
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Get answers with clear references.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              sm:p-8
            "
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Database size={21} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  Technology Stack
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Technologies behind CodeGuide AI
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {technologies.map((technology) => (
                <div
                  key={technology}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-slate-100
                    bg-slate-50/70
                    px-4
                    py-3
                    transition-all
                    hover:border-blue-100
                    hover:bg-blue-50/50
                  "
                >
                  <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                    {technology}
                  </span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm transition-colors group-hover:text-blue-600">
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs text-blue-600">
              <ArrowRight size={14} />

              <span>
                Designed to make developer knowledge easier to access.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
