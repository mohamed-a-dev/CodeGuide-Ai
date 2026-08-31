import { DocumentStatus } from "@/generated/prisma/enums";

export type ActionState = {
    message: string,
    success: boolean;
};

export type Document = {
    adminId: string;
    categoryId: string;
    filename: string;
    status?: DocumentStatus; // from prisma generated folder
};

export type Page = {
    text: string,
    pageNumber: number;
};

export type Chunk = {
    documentId: string;
    content: string;
    embedding: number[];
    pageNumber: number;
    chunkIndex: number;
};

export type Embedding = {
    object: string,
    index: number,
    embedding: number[]
}




