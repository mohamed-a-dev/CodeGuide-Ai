'use server'
import { Page } from "@/types/document.types";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

type Chunk = {
    content: string,
    pageNumber: number;
};


const chunks: Chunk[] = [];

export const chunkText = async (pages: Page[]) => {
    for (const page of pages) {
        const chunksArrPerPage = await splitter.splitText(page.text); // arr of string.    each string = chunk

        chunksArrPerPage.forEach((chunk) => {
            chunks.push({ pageNumber: page.pageNumber, content: chunk })
        });
    };

    return chunks;
}

