'use client'
import { displayError, displaySuccess } from '@/lib/toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function useDemoLogin() {
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

    return { handleDemo }
}
