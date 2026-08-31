import DeleteButton from "@/components/Dashboard/admin/DocDeleteButton";
import DocumentsRefresh from "@/components/Dashboard/admin/PageRefresh";
import UploadDocument from "@/components/Dashboard/admin/UploadDocument";
import { getDocuments } from "@/services/document.services";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  FolderOpen,
  XCircle,
} from "lucide-react";

export default async function Page() {
  const documents = await getDocuments();

  const statusStyles = {
    indexed: {
      className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      icon: CheckCircle2,
    },
    processing: {
      className: "bg-amber-50 text-amber-700 ring-amber-600/20",
      icon: Clock3,
    },
    failed: {
      className: "bg-red-50 text-red-700 ring-red-600/20",
      icon: XCircle,
    },
  };

  return (
    <>
      <DocumentsRefresh />

      <main className="min-h-screen bg-slate-50/70">
          {/* Header */}
          <section className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <BookOpen size={18} />
              </div>

              <span className="text-sm font-semibold text-blue-600">
                Knowledge Base
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Documents
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Manage the developer documentation used by CodeGuide AI.
                </p>
              </div>

              {/* Documents Count */}
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={18} />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Total documents
                  </p>

                  <p className="text-lg font-bold leading-5 text-slate-900">
                    {documents.length}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Upload */}
          <section className="mb-10">
            <UploadDocument />
          </section>

          {/* Documents */}
          <section>
            {/* Section Header */}
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Current Documents
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Documentation currently available to CodeGuide AI.
                </p>
              </div>
            </div>

            {/* Empty State */}
            {documents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <FolderOpen size={22} />
                </div>

                <h3 className="font-semibold text-slate-800">
                  No documents yet
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  Upload your first developer document to make it available
                  to CodeGuide AI.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop / Tablet */}
                <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block!">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-100 bg-slate-50/70">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Document
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Category
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {documents.map((document) => {
                        const status =
                          statusStyles[document.status] ??
                          statusStyles.processing;

                        const StatusIcon = status.icon;

                        return (
                          <tr
                            key={document.id}
                            className="group transition-colors hover:bg-slate-50/70"
                          >
                            {/* Document */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                                  <FileText size={18} />
                                </div>

                                <div className="min-w-0">
                                  <p className="max-w-md truncate font-medium text-slate-800 capitalize">
                                    {document.filename}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-400">
                                    PDF document
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 capitalize">
                                {document.category.name}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className} capitalize`}
                              >
                                <StatusIcon size={13} />
                                {document.status}
                              </span>
                            </td>

                            {/* Action */}
                            <td className="px-6 py-4 text-right">
                              <DeleteButton documentId={document.id} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile */}
                <div className="space-y-3 lg:hidden">
                  {documents.map((document) => {
                    const status =
                      statusStyles[document.status] ??
                      statusStyles.processing;

                    const StatusIcon = status.icon;

                    return (
                      <div
                        key={document.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                      >
                        {/* Top */}
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FileText size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="wrap-break-word text-sm font-semibold text-slate-800">
                              {document.filename}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                {document.category.name}
                              </span>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                              >
                                <StatusIcon size={12} />
                                {document.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
                          <DeleteButton documentId={document.id} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
      </main>
    </>
  );
}

