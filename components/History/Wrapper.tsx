'use client'

import React, { useState } from 'react'
import OldChats from './OldChats'
import SearchChats from './SearchChats'
import { FormattedChat } from '@/types/chat.types'

export default function Wrapper({ formattedChats }: { formattedChats: FormattedChat[] }) {
    const [filteredChats,setFilteredChats] = useState(formattedChats);
    return (
        <>
            {/* Search */}
            <SearchChats formattedChats={formattedChats} onSearch={setFilteredChats} />

            {/* History */}
            <OldChats filteredChats={filteredChats}/>
        </>
    )
}
