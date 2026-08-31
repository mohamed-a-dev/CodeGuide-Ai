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
        ? Prisma.sql`AND d."categoryId" = ${categoryId}`
        : Prisma.empty;

    const chunks = await prisma.$queryRaw<SimilarChunk[]>(Prisma.sql`
    SELECT 
      dc.id,
      dc.content,
      dc."pageNumber",
      dc."documentId",
      d.filename,
      1 - (dc.embedding <=> ${vector}::vector) AS similarity
    FROM "DocumentChunk" dc
    INNER JOIN "Document" d
      ON dc."documentId" = d.id
    WHERE dc.embedding IS NOT NULL
      ${categoryFilter}
    ORDER BY dc.embedding <=> ${vector}::vector
    LIMIT 5
  `);

    return chunks;
};