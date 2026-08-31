import { Prisma } from "@/generated/prisma/client";

export const prismaErrorHandler = (error: Prisma.PrismaClientKnownRequestError) => {
    // unique constraint
    if (error.code === 'P2002')
        return { success: false, message: 'Record already exists', data: null };

    // foreign key constraint
    if (error.code === 'P2003')
        return { success: false, message: 'Related record does not exist', data: null };

    // required relation violation
    if (error.code === 'P2014')
        return { success: false, message: 'Required relation is missing', data: null };

    // record not found during update / delete
    if (error.code === 'P2025')
        return { success: false, message: 'Record not found', data: null };

    // connection pool timeout
    if (error.code === 'P2024')
        return { success: false, message: 'Database connection timeout', data: null };

    // in case of different error code
    return { success: false, message: 'Something went wrong | prisma.errors.ts', data: null };
};