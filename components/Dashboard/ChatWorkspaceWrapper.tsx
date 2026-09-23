'use client'
import React, { useState } from 'react'
import KnowledgeBaseSelector from './KnowledgeBaseSelector'
import ChatUi from './Chat-Ui'
import { Document } from '@/types/document.types';

export default function ChatWorkspaceWrapper({ documents }: { documents: Document[] }) {
    const [cateId, setCateId] = useState<string | null>(null);

    return (
        <>
            <KnowledgeBaseSelector documents={documents} cateId={cateId} onCategoryChange={setCateId} />

            <ChatUi cateId={cateId} />
        </>
    )
}
