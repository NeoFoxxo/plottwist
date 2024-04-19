"use server"
import { extractStoryFromAI } from "../../extractStoryFromAI"
import { AIResponse } from "../../supabase/types/AIResponse"
import updateStory from "../database/updateStory"

export async function regenerateStory({
	prompt,
	previousStoryId,
}: {
	prompt: string
	previousStoryId: number
}) {
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
		const scenario = await updateStory({
			story,
			choices: choices!!,
			title: title!!,
			previousStoryId,
		})
		return { scenario, currentPart: story }
	} catch (error) {
		throw new Error(String(error))
	}
}
