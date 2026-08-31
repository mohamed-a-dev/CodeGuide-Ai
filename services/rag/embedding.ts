'use server'
import { generateEmbedding } from "@/lib/jina";
import { Embedding } from "@/types/document.types";

export const generateEmbeddingsInBatches = async (chunks: string[]) => {
    const BATCH_SIZE = 64;

    const embeddings = [];

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batch = chunks.slice(i, i + BATCH_SIZE);

        const batchEmbeddings = await generateEmbedding(batch); // arr of batch of chunks embeddings [{object: 'embedding',index: 0, embedding:[]}, ]

        embeddings.push(...batchEmbeddings.map((embedding: Embedding) => embedding.embedding));
    }

    return embeddings;
}

