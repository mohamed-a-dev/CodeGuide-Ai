'use client'

import { Document } from '@/types/document.types';
import { BookOpen, ChevronDown } from 'lucide-react'

type KnowledgeBaseSelectorProps  = {
  documents: Document[],
  cateId: string | null,
  onCategoryChange: (categoryId: string | null) => void
}

export default function KnowledgeBaseSelector({ documents, cateId, onCategoryChange }: KnowledgeBaseSelectorProps ) {

  return (
    <div className="mb-4 flex items-center justify-between flex-col gap-2 sm:gap-0 sm:flex-row">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          Knowledge Base
        </p>

        <p className="mt-0.5 text-xs text-slate-400">
          Choose which documentation the AI should use
        </p>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <BookOpen size={15} className="text-slate-400" />

          <select
            value={cateId ?? ""}
            onChange={(e) =>
              onCategoryChange(
                e.target.value === "" ? null : e.target.value
              )
            }
            className="
                capitalize
                    w-48
                    cursor-pointer
                    appearance-none
                    bg-transparent
                    pr-5
                    text-xs
                    font-medium
                    text-slate-700
                    outline-none
                "
          >
            <option value="">All Documentation</option>

            {documents.map((document) => (
              <option
                className="capitalize"
                key={document.categoryId}
                value={document.categoryId}
              >
                {document.filename}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 text-slate-400"
          />
        </div>
      </div>
    </div>)
}
