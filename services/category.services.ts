'use server'
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createCategory = async (name: string) => {
    const session = await auth();
    if (!session)
        redirect('/login');

    const categoryRecord = await prisma.category.create({
        data: {
            name
        },
    });

    return categoryRecord;
};

export const getCategories = async () => {
    const session = await auth();
    if (!session)
        redirect('/login');

    const categories = await prisma.category.findMany();
    return categories;
};