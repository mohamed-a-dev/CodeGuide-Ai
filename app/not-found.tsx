'use client'
import Link from "next/link";
import { ArrowLeft, Bot, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Bot size={30} />
                </div>

                {/* 404 */}
                <p className="text-sm font-semibold text-blue-600">
                    Error 404
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Page not found
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    It may have been moved or no longer exists.
                </p>

                {/* Actions */}
                <div className="mt-7 flex items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <Home size={16} />
                        Go home
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={16} />
                        Go back
                    </button>
                </div>
            </div>
        </main>
    );
}
