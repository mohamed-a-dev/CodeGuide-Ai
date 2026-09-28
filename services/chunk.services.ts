'use service'
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma"
import { SimilarChunk } from "@/types/chunk.types";
import { Chunk } from "@/types/document.types"
import { randomUUID } from "crypto";


export const createChunks = async (chunks: Chunk[]) => {
    const values = chunks.map(
        (chunk) => Prisma.sql`
            (
                ${randomUUID()},
                ${chunk.documentId},
                ${chunk.content},
                ${`[${chunk.embedding.join(",")}]`}::vector,
                ${chunk.pageNumber},
                ${chunk.chunkIndex}
            )
        `
    );

    await prisma.$executeRaw`
        INSERT INTO "DocumentChunk" (
            "id",
            "documentId",
            "content",
            "embedding",
            "pageNumber",
            "chunkIndex"
        )
        VALUES ${Prisma.join(values)}
    `;
};


export const searchSimilarChunks = async (messageEmbedding: number[], categoryId: string | null): Promise<SimilarChunk[]> => {
    const vector = `[${messageEmbedding.join(",")}]`;

    const categoryFilter = categoryId
        ? Prisma.sql`WHERE "Document"."categoryId" = ${categoryId}`
        : Prisma.empty;

    const chunks = await prisma.$queryRaw<SimilarChunk[]>(Prisma.sql`
    SELECT 
      "DocumentChunk".id,
      "DocumentChunk".content,
      "DocumentChunk"."pageNumber",
      "DocumentChunk"."documentId",
      "Document".filename,
      1 - ("DocumentChunk".embedding <=> ${vector}::vector) AS similarity
    FROM "DocumentChunk"
    INNER JOIN "Document" 
      ON "DocumentChunk"."documentId" = "Document".id
    ${categoryFilter}
    ORDER BY similarity DESC
    LIMIT 5
  `);

    return chunks;
};