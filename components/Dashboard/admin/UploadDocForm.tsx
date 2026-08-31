'use client'
import { uploadDocument } from '@/actions/document.actions';
import { displayError, displaySuccess } from '@/lib/toast';
import React, { startTransition, useActionState, useEffect, useState, } from 'react'
import CreateCategory from './CreateCategory';
import { Category } from '@/types/category.types';


export default function UploadDocForm({ categories }: { categories: Category[] }) {
    const [isFileAttached, setIsFileAttached] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const canUpload = isFileAttached && title.trim().length > 0 && category;
    const [state, formAction, pending] = useActionState(uploadDocument, { message: '', success: false, data: null });

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setIsFileAttached(!!file);
    }

    const resetForm = () => {
        setTitle("");
        setCategory("");
        setIsFileAttached(false);
    }

    useEffect(() => {
        if (!state.message)
            return;
        if (state.success) {
            displaySuccess(state.message);
            startTransition(() => resetForm());       
        }
        else
            displayError(state.message);
    }, [state])

    return (
        <form action={formAction} className="space-y-5">
            {/* PDF */}
            <div className="space-y-2">
                <label
                    htmlFor="pdf"
                    className="text-sm font-medium text-slate-700"
                >
                    PDF File
                </label>

                <input
                    id="pdf"
                    type="file"
                    name="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600
              file:mr-4 file:cursor-pointer file:rounded-md file:border-0
              file:bg-slate-800 file:px-4 file:py-2 file:text-sm
              file:font-medium file:text-white hover:file:bg-slate-700"
                />
                {/* warn */}
                {
                    !isFileAttached &&
                    <p className="text-sm text-red-500">
                        Please attach a PDF file.
                    </p>
                }
            </div>

            {/* Title */}
            <div className="space-y-2">
                <label
                    htmlFor="title"
                    className="text-sm font-medium text-slate-700"
                >
                    Title
                </label>

                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    id="title"
                    type="text"
                    name="title"
                    placeholder="e.g. Next.js Documentation"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none
              focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {/* warn */}
                {
                    !title &&
                    <p className="text-sm text-red-500">
                        Please enter a title.
                    </p>
                }
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label
                    htmlFor="category"
                    className="text-sm font-medium text-slate-700"
                >
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none
                       focus:border-slate-500 focus:ring-2 focus:ring-slate-200 capitalize"
                >
                    <option value="">Select category</option>
                    {
                        categories.map((cate: Category) => <option key={cate.id} className='capitalize' value={cate.id}>{cate.name}</option>)
                    }
                </select>
                {/* warn */}
                {
                    !category &&
                    <p className="text-sm text-red-500">
                        Please select a category.
                    </p>
                }

                {/*Create New Category */}
                <CreateCategory />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={!canUpload || pending}
                className={`cursor-pointer bg-slate-900 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-600 w-full rounded-lg py-2.5 text-sm font-medium text-white transition`}
            >
                {!pending ? 'Upload Document' : 'Uploading...'}
            </button>
        </form>
    )
}
