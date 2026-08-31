'use client'
import { signUp } from "@/actions/auth.actions";
import { displayError, displaySuccess } from "@/lib/toast";
import { Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export default function Register() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [state, formAction, pending] = useActionState(signUp, { message: '', success: false });
    const router = useRouter();
    const canRegister = user.name && user.email && user.password;

    useEffect(() => {
        if (!state.message)
            return;
        if (state.success) {
            displaySuccess(state.message);
            router.push('/login');
        }
        else {
            displayError(state.message);
            startTransition(() => {
                setUser({ name: '', email: '', password: '' });
            });
        }
    }, [state, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
            <section className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-slate-900 flex gap-2 justify-center"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Bot size={22} />
                        </span>
                        <span>CodeGuide AI</span>
                    </Link>

                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                        Welcome
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Register to access your Ai coding assistant
                    </p>
                </div>

                {/* Register Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <form action={formAction} className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700"
                            >
                                Name
                            </label>

                            <input
                                onChange={(e) => setUser((pre) => ({ ...pre, name: e.target.value }))}
                                value={user.name}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="john"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>

                            <input
                                onChange={(e) => setUser((pre) => ({ ...pre, email: e.target.value }))}
                                value={user.email}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <input
                                onChange={(e) => setUser((pre) => ({ ...pre, password: e.target.value }))}
                                value={user.password}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            disabled={!canRegister}
                            type="submit"
                            className="
                                        w-full rounded-lg bg-slate-900 py-2.5
                                        text-sm font-medium text-white
                                        transition
                                        hover:bg-slate-800
                                        active:scale-[0.99]
                                        cursor-pointer
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                        disabled:hover:bg-slate-900
                                        disabled:active:scale-100
    "
                        >
                            {!pending ? "Register" : "Registering..."}
                        </button>
                    </form>

                    {/* Register */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-slate-900 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>

                {/* Demo */}
                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-center">
                    <p className="text-xs text-slate-500">
                        Want to explore the project?
                    </p>

                    <Link
                        href="/login?demo=doctor"
                        className="mt-1 inline-block text-sm font-medium text-slate-900 hover:underline"
                    >
                        Try Demo Account →
                    </Link>
                </div>
            </section>
        </div>
    )
}