"use server"
import { extractStoryFromAI } from "../extractStoryFromAI"
import { AIResponse } from "../supabase/types/AIResponse"
import insertStory from "./insertStory"

export async function submitPrompt({ prompt }: { prompt: string }) {
	const res = await fetch(`${process.env.AI_API_URL}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
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
		isContinue: false,
	})

	try {
		const scenario = insertStory({ title: title!!, story, choices, prompt })
		return scenario
	} catch (error) {
		throw new Error(String(error))
	}
}
