'use client'
import { deleteDocumentAction } from '@/actions/document.actions'
import { displayError, displaySuccess } from '@/lib/toast';
import { useState } from 'react';

export default function DeleteButton({ documentId }: { documentId: string }) {
    const [pending, setPending] = useState(false);

    const handleDelete = async () => {
        setPending(true);

        const { success, message } = await deleteDocumentAction(documentId);

        setPending(false);

        if (!message) return;

        if (success) return displaySuccess(message);

        displayError(message);
    }

    return (
        <button
            disabled={pending}
            onClick={handleDelete}
            className="rounded-md bg-red-500 cursor-pointer px-2.5 py-1 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-500 disabled:active:scale-100"        >
            Delete
        </button>
    )
}
