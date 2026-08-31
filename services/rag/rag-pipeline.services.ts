'use server'

import { createChunks } from "../chunk.services";
import { markDocumentAsIndexed } from "../document.services";
import { chunkText } from "./creating-chunks";
import { generateEmbeddingsInBatches } from "./embedding";
import { extractPdfText } from "./extract-text";


export const ragProcessing = async (file: File, documentId: string) => {
   const pages = await extractPdfText(file) // arr of each page = [{text:'', pageNumber:1},{text:'', pageNumber:2}]

   const chunks = await chunkText(pages); // arr of chunks = [{pageNumber:1, content:''}]

   const embeddingVectors = await generateEmbeddingsInBatches(chunks.map((chunk) => chunk.content)); // arr of vectors

   const embeddedChunks = chunks.map((chunk, i) => ({ ...chunk, embedding: embeddingVectors[i], chunkIndex: i, documentId }));

   await createChunks(embeddedChunks);

   await markDocumentAsIndexed(documentId);
}

