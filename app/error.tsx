"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <AlertTriangle size={30} />
                </div>

                {/* Content */}
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Something went wrong
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    We couldn&apos;t complete your request. Please try again or
                    return to the home page.
                </p>

                {/* Actions */}
                <div className="mt-7 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <RefreshCw size={16} />
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <Home size={16} />
                        Home
                    </Link>
                </div>

                {/* Error ID */}
                {error.digest && (
                    <p className="mt-6 text-xs text-slate-400">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </main>
    );
}
