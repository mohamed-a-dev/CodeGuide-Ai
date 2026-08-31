'use server'
import { auth } from "@/auth";
import { AuthErrorHandler } from "@/errors/auth.errors";
import { getDefaultErrorResponse } from "@/errors/default-error-response";
import { prismaErrorHandler } from "@/errors/prisma.errors";
import { Prisma } from "@/generated/prisma/client";
import { createCategory } from "@/services/category.services"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCategoryAction = async (categoryName: string) => {
    // Authentication
    const session = await auth();
    if (!session)
        redirect('/login');

    const { role } = session.user;

    // Authorization
    if (role !== "admin")
        return AuthErrorHandler(403);

    if (!categoryName.trim())
        return {
            message: "Please provide a category name.",
            success: false,
        };

    try {
        await createCategory(categoryName);

        revalidatePath('/documents-management');

        return {
            message: "Category created successfully.",
            success: true,
        };
    }
    catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            return prismaErrorHandler(error);

        return getDefaultErrorResponse('category.actions.ts');
    }
}
