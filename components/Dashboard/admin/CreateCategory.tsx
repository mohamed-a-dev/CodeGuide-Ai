'use client'
import { createCategoryAction } from '@/actions/category.actions';
import { displayError, displaySuccess } from '@/lib/toast';
import React, { useState } from 'react'

export default function CreateCategory() {
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [cateName, setCateName] = useState('');
    const [pending, setPending] = useState(false);

    const handleCreate = async () => {
        setPending(true);

        const { success, message } = await createCategoryAction(cateName);

        setPending(false);

        if (success && message) {
            displaySuccess(message);
            setCateName('');
            setShowCategoryInput(false);
        }
        else if (!success && message)
            displayError(message);
    }

    return (
        <section>
            <button
                onClick={() => setShowCategoryInput((pre) => !pre)}
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600
                         transition hover:text-blue-800 cursor-pointer"
            >
                <span className="text-base">+</span>
                Create new category
            </button>

            <main className={`${showCategoryInput ? 'block' : 'hidden'} space-y-2`}>
                <input
                    onChange={(e) => setCateName(e.target.value)}
                    value={cateName}
                    id="title"
                    type="text"
                    name="category"
                    placeholder="e.g. Next.js"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none
              focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                <div className="space-x-2">
                    <button
                        onClick={handleCreate}
                        disabled={!cateName || pending}
                        type="submit"
                        className="
                        rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white
                        transition-colors
                        hover:bg-slate-700
                        cursor-pointer
                        disabled:cursor-not-allowed
                        disabled:bg-slate-300
                        disabled:text-slate-500
                        disabled:hover:bg-slate-300
                    "
                    >
                        {pending ? "Creating..." : "Create"}
                    </button>

                    <button
                        onClick={() => setShowCategoryInput((pre) => !pre)}
                        type="button"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm
                   text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </main>
        </section>)
}
