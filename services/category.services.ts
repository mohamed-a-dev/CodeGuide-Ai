'use server'
import prisma from "@/lib/prisma";

export const createCategory = async (name: string) => {
    const categoryRecord = await prisma.category.create({
        data: {
            name
        },
    });

    return categoryRecord;
};

export const getCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories; 
};