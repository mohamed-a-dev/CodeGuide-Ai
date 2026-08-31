import {
  BookOpen,
  BrainCircuit,
  FileText,
  LockKeyhole,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function Features() {
  const cards = [
    {
      title: "AI Coding Assistant",
      description:
        "Ask coding questions and get intelligent answers based on trusted developer documentation.",
      icon: Sparkles,
    },
    {
      title: "RAG-Powered Search",
      description:
        "Retrieve relevant information from JavaScript, React, and Next.js documentation using semantic search.",
      icon: BrainCircuit,
    },
    {
      title: "Trusted Sources",
      description:
        "Every answer includes references to the documentation used to generate the response.",
      icon: BookOpen,
    },
    {
      title: "Developer Documentation",
      description:
        "Search and explore organized documentation for JavaScript, React, Next.js, and other technologies.",
      icon: FileText,
    },
    {
      title: "Conversation History",
      description:
        "Save and revisit your previous coding questions and AI conversations anytime.",
      icon: MessageSquare,
    },
    {
      title: "Secure & Role Based",
      description:
        "Authentication and role-based permissions provide secure access for users and administrators.",
      icon: LockKeyhole,
    },
  ];

  return (
    <section
      id="features"
      className="container mx-auto bg-slate-50/70 px-6 py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            <Sparkles size={14} />
            Powerful features
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to{" "}
            <span className="text-blue-600">code smarter.</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            CodeGuide AI combines intelligent search, trusted documentation,
            and AI-powered answers into one developer-focused experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                  group
                  relative
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-lg
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-5
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-500
                    transition-all
                    duration-200
                    group-hover:bg-blue-50
                    group-hover:text-blue-600
                  "
                >
                  <Icon size={21} />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>

                {/* Bottom accent */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-6
                    h-0.5
                    w-0
                    rounded-full
                    bg-blue-600
                    transition-all
                    duration-300
                    group-hover:w-10
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
