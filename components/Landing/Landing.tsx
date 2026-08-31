import Link from "next/link";
import {
  ArrowRight,

  Check,

  Sparkles,
} from "lucide-react";
import ChatPreview from "../ChatPreview";

export default function Landing() {
  return (
    <div
      id="landing"
      className="container mx-auto mt-17.5 min-h-[calc(100vh-64px)] bg-slate-50/70"
    >
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6 py-12 lg:px-8 lg:py-16">
        <section className="grid w-full grid-cols-1 place-items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="text-center lg:text-start">
              <div className="mb-6 inline-flex mx-auto w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <Sparkles size={14} />
                AI-powered developer assistant
              </div>
            </div>


            {/* Heading */}
            <h1 className="text-4xl font-bold text-center lg:text-start leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your AI assistant for{" "}
              <span className="text-blue-600">better code.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 mx-auto max-w-lg text-center lg:text-start text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Get accurate coding answers powered by AI. Search trusted
              JavaScript, React, and Next.js documentation and receive
              reliable answers with source citations.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center lg:justify-start">
              <Link
                href="/login"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  hover:bg-blue-700
                  hover:shadow-md
                "
              >
                Get Started

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>

              <button
                type="button"
                className="
                cursor-pointer
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition-all
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                View Demo
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
              {[
                "RAG Powered",
                "Official Docs",
                "AI Citations",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs font-medium text-slate-500"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={12} strokeWidth={3} />
                  </span>

                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Chat Preview */}
          <ChatPreview />

        </section>
      </section>
    </div>
  );
}
