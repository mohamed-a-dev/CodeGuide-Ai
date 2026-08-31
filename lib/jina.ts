const JINA_API_URL = process.env.JINA_API_URL as string;

export async function generateEmbedding(input: string[]) {
    const response = await fetch(JINA_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        },
        body: JSON.stringify({
            model: "jina-embeddings-v5-text-small",
            task: "retrieval.passage",
            normalized: true,
            input,
        }),
    });

    if (!response.ok) {
        throw new Error(`Jina API error: ${response.status}`);
    }

    const {data} = await response.json();

    return data;
}