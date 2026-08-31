import {
  ArrowRight,
  Brain,
  Check,
  FileText,
  MessageSquare,
  Upload,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Add Documentation",
    description:
      "Add trusted documentation and technical resources for JavaScript, React, Next.js, and other technologies.",
  },
  {
    icon: FileText,
    title: "Process Documentation",
    description:
      "Extract content, split it into meaningful chunks, and generate vector embeddings for semantic search.",
  },
  {
    icon: Brain,
    title: "Semantic Retrieval",
    description:
      "CodeGuide AI finds the most relevant documentation sections using semantic vector search.",
  },
  {
    icon: MessageSquare,
    title: "Get Reliable Answers",
    description:
      "Ask coding questions and receive AI-generated answers with references to the original documentation.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="container mx-auto min-h-[calc(100vh-64px)] bg-slate-50/70"
    >
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            <Brain size={14} />
            Simple & intelligent
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>

          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />

          <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
            CodeGuide AI uses Retrieval-Augmented Generation to provide
            accurate answers based on trusted developer documentation.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative flex"
              >
                {/* Card */}
                <div
                  className="
                    flex
                    w-full
                    flex-col
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-md
                  "
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    {/* Icon */}
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                        transition-colors
                        group-hover:bg-blue-600
                        group-hover:text-white
                      "
                    >
                      <Icon size={20} />
                    </div>

                    {/* Step */}
                    <span className="text-xs font-bold text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <h3 className="text-base font-semibold text-slate-800">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    <Check size={13} />
                    Step {index + 1}
                  </div>
                </div>

                {/* Desktop Arrow */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-300 shadow-sm">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          From trusted documentation to reliable AI-powered answers.
        </div>
      </div>
    </section>
  );
}
