"use server"
import { extractStoryFromAI } from "../extractStoryFromAI"
import { AIResponse } from "../supabase/types/AIResponse"
import updateStory from "./updateStory"

export async function continueStory({
	title,
	prompt,
	previousStoryId,
	currentStory,
}: {
	title: string
	prompt: string
	previousStoryId: number
	currentStory: string
}) {
	const res = await fetch(`${process.env.AI_API_URL}/continue`, {
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

	const { story, choices } = extractStoryFromAI({
		aiResponse,
		isContinue: true,
	})

	const fullStory = currentStory + " " + story

	try {
		const scenario = await updateStory({
			title,
			story: fullStory,
			choices,
			previousStoryId,
		})
		return scenario
	} catch (error) {
		throw new Error(String(error))
	}
}