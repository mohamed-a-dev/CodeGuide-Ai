'use server'
import { auth } from "@/auth";
import { AuthErrorHandler } from "@/errors/auth.errors";
import { getDefaultErrorResponse } from "@/errors/default-error-response";
import { prismaErrorHandler } from "@/errors/prisma.errors";
import { Prisma } from "@/generated/prisma/client";
import { deleteDocumentSchema, uploadDocumentSchema } from "@/lib/validation.zod";
import { createDocument, deleteDocument } from "@/services/document.services";
import { ragProcessing } from "@/services/rag/rag-pipeline.services";
import { ActionState } from "@/types/document.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";

export const uploadDocument = async (prevState: ActionState, formData: FormData) => {
    // Authentication
    const session = await auth();
    if (!session)
        redirect('/login');

    const { role, id: adminId } = session.user;

    // Authorization
    if (role !== "admin")
        return AuthErrorHandler(403);

    const file = formData.get('file');
    const filename = formData.get('title');
    const categoryId = formData.get('category');

    // input validation
    const result = uploadDocumentSchema.safeParse({ file, filename, categoryId, adminId });
    if (!result.success)
        return { message: result.error.issues.map(err => err.message).join(", "), success: false, data: null };

    try {
        const document = await createDocument({
            filename: result.data.filename,
            adminId: result.data.adminId,
            categoryId: result.data.categoryId,
        });

        revalidatePath('/documents-management');

        // after() is an asynchronous utility function
        // that allows you to schedule secondary tasks to execute after the HTTP response has been fully sent to the client.
        after(async () => {
            await ragProcessing(result.data.file, document.id);
            // revalidatePath("/documents-management");
        });

        return { message: 'Uploaded Successfully', success: true, data: document }

    }
    catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            return prismaErrorHandler(error);

        return getDefaultErrorResponse('category.actions.ts');
    }
}


export const deleteDocumentAction = async (documentId: string) => {
    // Authentication
    const session = await auth();
    if (!session)
        redirect('/login');

    const { role } = session.user;

    // Authorization
    if (role !== "admin")
        return AuthErrorHandler(403);

    const result = deleteDocumentSchema.safeParse({ documentId });
    if (!result.success)
        return { message: result.error.issues.map(err => err.message).join(", "), success: false, data: null };

    try {
        await deleteDocument(result.data.documentId);
        revalidatePath('/documents-management');

        return {
            message: "Document has been deleted successfully.",
            success: true,
            data: null,
        };
    }
    catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            return prismaErrorHandler(error);

        return getDefaultErrorResponse('document.actions.ts');
    }

}
