'use client'

import { FormattedChat } from '@/types/chat.types'
import { Search } from 'lucide-react'
import React from 'react'

export default function SearchChats({ formattedChats, onSearch }: { formattedChats: FormattedChat[], onSearch: (chats: FormattedChat[]) => void }) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(formattedChats.map((cate) =>
        (
            {
                ...cate, items: cate.items.filter((chat) => chat.title.toLowerCase().includes(e.target.value))
            }
        )
        )
        )
    }

    return (
        <section className="mb-10">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    onChange={handleSearch}
                    type="search"
                    placeholder="Search your conversations..."
                    className="
                h-12
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                pl-11
                pr-4
                text-sm
                text-slate-900
                shadow-sm
                outline-none
                transition
                placeholder:text-slate-400
                hover:border-slate-300
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
                />
            </div>
        </section>
    )
}
