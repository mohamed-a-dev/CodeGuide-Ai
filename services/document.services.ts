'use server'
import prisma from "@/lib/prisma";
import { Document } from "@/types/document.types"

export const createDocument = async (document: Document) => {
    const documentRecord = await prisma.document.create({
        data: document,
    });

    return documentRecord;
};

export const getDocuments = async () => {
    const documentRecords = await prisma.document.findMany({
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return documentRecords;
};

export const deleteDocument = async (documentId: string) => {
    await prisma.document.delete({
        where: {
            id: documentId
        }
    });
};


export const markDocumentAsIndexed  = async (documentId: string) => {
    await prisma.document.update({
        where: {
            id: documentId
        },

        data: {
            status: 'indexed'
        }
    });
}


export const getDocumentsCount = async () => {
    return prisma.document.count();
}