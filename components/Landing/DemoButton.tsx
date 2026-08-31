'use client'
import { displayError, displaySuccess } from '@/lib/toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DemoButton() {
    const router = useRouter();

    const handleDemo = async () => {
        const result = await signIn("credentials", {
            email: "demo@gmail.com",
            password: "abc123456",
            redirect: false,
        });

        if (!result.error) {
            displaySuccess("Welcome! You are now logged in with the demo account.");
            router.push("/ai-assistant");
        } else {
            displayError("Unable to login with the demo account.");
        }
    }

    return (
        <button
            onClick={handleDemo}
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
    )
}
