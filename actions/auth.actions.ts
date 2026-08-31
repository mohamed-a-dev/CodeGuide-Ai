'use server'

import { getDefaultErrorResponse } from "@/errors/default-error-response";
import { prismaErrorHandler } from "@/errors/prisma.errors";
import { Prisma } from "@/generated/prisma/client";
import { registerSchema } from "@/lib/validation.zod";
import { createUser } from "@/services/auth.servcies";
import { AuthState } from "@/types/auth.types";

export const signUp = async (prev: AuthState, formData: FormData) => {
    const user = {
        name: String(formData.get('name')),
        email: String(formData.get('email')),
        password: String(formData.get('password')),
    }

    const result = registerSchema.safeParse(user);
    if (!result.success)
        return { message: result.error.issues.map(err => err.message).join(", "), success: false };


    try {
        await createUser(user);
        return {
            success: true,
            message: `Welcome ${user.name} Your account has been created successfully. You can now log in.`,
        };
    }
    catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
            return prismaErrorHandler(error);

        return getDefaultErrorResponse('auth.actions.ts');
    }
}



