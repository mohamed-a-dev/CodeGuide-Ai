'use client'
import { FormattedChat } from '@/types/chat.types'
import { ArrowUpRight, Clock3, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function OldChats({ filteredChats }: { filteredChats: FormattedChat[] }) {
    return (
        <section className="space-y-9">
            {filteredChats.map((group) => (
                <div key={group.date}>
                    {/* Date */}
                    <div className="mb-3 flex items-center gap-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {group.date}
                        </h2>

                        <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* Chats */}
                    <div className="space-y-2">
                        {group.items.map((chat: { id: string, title: string, time: string }) => (
                            <Link
                                key={chat.id}
                                href={`/history/${chat.id}`}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-4
                                    shadow-sm
                                    transition-all
                                    duration-200
                                    hover:-translate-y-px
                                    hover:border-blue-200
                                    hover:shadow-md
                    "
                            >
                                {/* Icon */}
                                <div
                                    className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-slate-100
                                            text-slate-500
                                            transition-colors
                                            group-hover:bg-blue-50
                                            group-hover:text-blue-600
                      "
                                >
                                    <MessageSquare size={19} />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                                        {chat.title}
                                    </h3>

                                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                                        <Clock3 size={13} />
                                        <span>{chat.time}</span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div
                                    className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                text-slate-300
                                                transition-all
                                                group-hover:bg-blue-50
                                                group-hover:text-blue-600
                      "
                                >
                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* when filter remove all chat from category */}
                    {
                        group.items.length === 0 && <p>No chats found.</p>
                    }
                </div>
            ))}
        </section>)
}
