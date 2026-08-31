'use server'
import { extractText } from "unpdf";

export const extractPdfText = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();

    const result = await extractText( // result = {totalPages:14, text: ['', '','']}  ==> text array , each index contain text for full page
        new Uint8Array(arrayBuffer)
    );

    return result.text.map((text, index) => ({
        pageNumber: index + 1,
        text,
    }));
}
