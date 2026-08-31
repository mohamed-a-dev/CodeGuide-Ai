import { auth } from "@/auth"
import ChatPreview from "@/components/ChatPreview";
import { Bot } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session)
    redirect('/dashboard');

  return (
    <div className="h-screen grid md:grid-cols-2 gap-1">
      {children}
      <section className="w-full md:flex items-center justify-center bg-slate-50 p-6 px-4 py-10 ">
        <main>
          <div className="mb-5 flex justify-center md:justify-start">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Bot size={18}/>
              </span>

              <div className="text-xl">
                <h2 className="font-semibold text-slate-900">
                  CodeGuide AI
                </h2>

                <p className="text-xs text-slate-500">
                  Powered by developer documentation
                </p>
              </div>
            </div>
          </div>

          <ChatPreview />
        </main>
      </section>
    </div>
  )
}
