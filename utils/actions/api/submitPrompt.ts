"use server"
import { extractStoryFromAI } from "../../extractStoryFromAI"
import { AIResponse } from "../../supabase/types/AIResponse"
import insertStory from "../database/insertStory"

export async function submitPrompt({ prompt }: { prompt: string }) {
	const res = await fetch(`${process.env.AI_API_URL}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.AI_API_KEY}`,
		},
		body: JSON.stringify({ prompt }),
	})

	if (!res.ok) {
		const errorMessage = await res.json()
		throw new Error(errorMessage)
	}

	const data = await res.json()
	const aiResponse: AIResponse = data.result.Output

	const { title, story, choices } = extractStoryFromAI({
		aiResponse,
		stage: "start",
	})

	try {
		const scenario = await insertStory({
			title: title!!,
			story,
			choices: choices!!,
			prompt,
		})
		return { scenario, currentPart: story }
	} catch (error) {
		throw new Error(String(error))
	}
}
