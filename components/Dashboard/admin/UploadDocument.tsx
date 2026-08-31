import { getCategories } from "@/services/category.services"
import UploadDocForm from "./UploadDocForm"

export default async function UploadDocument() {
    const categories = await getCategories();

    return (
        <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Upload Documentation
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Upload a PDF to add it to the AI knowledge base.
                </p>
            </div>

            <UploadDocForm categories={categories} />
        </section>
    )
}
