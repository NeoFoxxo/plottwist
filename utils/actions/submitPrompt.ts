"use server"
import { AIResponse } from "../supabase/types/AIResponse"
import deleteStory from "./deleteStory"
import insertStory from "./insertStory"

export async function submitPrompt({
	prompt,
	isRegenerate,
	previousStoryId,
}: {
	prompt: string
	isRegenerate?: boolean
	previousStoryId?: number
}) {
	const res = await fetch(`${process.env.AI_API_URL}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt: prompt,
		}),
	})

	if (!res.ok) {
		const errorMessage = await res.json()
		throw new Error(errorMessage)
	}

	const data = await res.json()
	const aiResponse: AIResponse = data.result.Output

	const story = aiResponse.response.story
	if (!story) {
		throw new Error("Story data is undefined, please try again")
	}

	let choices: string[]
	try {
		choices = aiResponse.choices.choices.map((singleChoice) => singleChoice)
	} catch (error) {
		throw new Error("Choice data is undefined, please try again")
	}

	const title = aiResponse.title.title
	if (!title) {
		throw new Error("Title is undefined, please try again")
	}

	if (isRegenerate && previousStoryId) {
		try {
			await deleteStory(previousStoryId)
		} catch (error) {
			throw new Error(String(error))
		}
	}

	try {
		const scenario = insertStory({ title, story, choices, prompt })
		return scenario
	} catch (error) {
		throw new Error(String(error))
	}
}
