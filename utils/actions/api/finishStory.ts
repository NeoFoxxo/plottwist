"use server"
import { extractStoryFromAI } from "../../extractStoryFromAI"
import { AIResponse } from "../../supabase/types/AIResponse"
import updateStory from "../database/updateStory"

export async function finishStory({
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
	const res = await fetch(`${process.env.AI_API_URL}/finish`, {
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

	const { story, choices } = extractStoryFromAI({
		aiResponse,
		stage: "finish",
	})

	const fullStory = currentStory + " " + story

	try {
		const scenario = await updateStory({
			title,
			story: fullStory,
			choices: choices!!,
			previousStoryId,
			isFinished: true,
		})
		return { scenario, currentPart: story }
	} catch (error) {
		throw new Error(String(error))
	}
}
