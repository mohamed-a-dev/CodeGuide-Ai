'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogoutButton() {
    return (
        <button
            onClick={async () => await signOut()}
            className="
                flex
                items-center
                gap-3
                w-full
                px-4
                py-3
                rounded-lg
                bg-red-500/10
                text-red-400
                hover:bg-red-500/20
                cursor-pointer
                "
        >

            <LogOut size={20} />
            Logout
        </button>)
}
