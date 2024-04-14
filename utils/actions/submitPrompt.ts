"use server";

export async function submitPrompt({ prompt }: { prompt: string }) {
    const res = await fetch(`${process.env.AI_API_URL}/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: prompt,
        }),
    });

    if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage);
    }

    const data = await res.json();
    return data.result;
}
