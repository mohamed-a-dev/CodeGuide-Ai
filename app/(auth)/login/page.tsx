"use client"

import { displayError, displaySuccess } from "@/lib/toast"
import { loginSchema } from "@/lib/validation.zod"
import { Bot } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const canLogin = credentials.email && credentials.password;

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
            displayError(result.error.issues.map(err => err.message).join(", "));
            return;
        }

        setPending(true);

        try {
            const response = await signIn("credentials", {
                ...credentials,
                redirect: false,
            })

            if (!response.error) {
                router.push('/dashboard');
                displaySuccess("Welcome back! 🎉")
            }

            if (response.code === "credentials")
                displayError('Wrong credentials')
        }
        catch (error: unknown) {
            if (error instanceof Error)
                displayError(error.message)

            else
                displayError("Something went wrong. Please try again.")
        }
        finally {
            setPending(false);
        }
    }

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
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Login to your AI coding assistant
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <form
                        onSubmit={handleLogin}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>

                            <input
                                onChange={(e) =>
                                    setCredentials((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
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
                                onChange={(e) =>
                                    setCredentials((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            disabled={!canLogin}
                            type="submit"
                            className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900"
                        >
                            {pending ? "Signing in..." : "Login"}
                        </button>
                    </form>

                    {/* Register */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Do not have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-slate-900 hover:underline"
                        >
                            Register
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