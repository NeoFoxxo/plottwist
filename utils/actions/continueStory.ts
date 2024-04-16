"use server";
import { AIContinueResponse } from "../supabase/types/AIResponse";
import updateStory from "./updateStory";

export async function continueStory({
    title,
    prompt,
    previousStoryId,
}: {
    title: string;
    prompt: string;
    previousStoryId: number;
}) {
    const res = await fetch(`${process.env.AI_API_URL}/continue`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage);
    }

    const data = await res.json();
    const aiResponse: AIContinueResponse = data.result.Output;

    console.log(aiResponse);
    const story = prompt + " " + aiResponse.response.response;
    const choices = aiResponse.choices.choices;

    try {
        const scenario = await updateStory({
            title,
            story,
            choices,
            prompt,
            previousStoryId,
        });
        return scenario;
    } catch (error) {
        throw new Error(String(error));
    }
}
