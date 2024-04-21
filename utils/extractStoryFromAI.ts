import { AIResponse } from "./supabase/types/AIResponse"

export interface ExtractStoryProps {
	aiResponse: AIResponse
	stage: "start" | "continue" | "finish"
}

export function extractStoryFromAI({ aiResponse, stage }: ExtractStoryProps) {
	const story = aiResponse.response.story
	if (!story) {
		throw new Error(
			"API request limits exceeded, please try again in a few minutes"
		)
	}

	if (stage === "finish") {
		return { story }
	}

	let choices: string[]
	try {
		if (aiResponse.choices.choices.length !== 3)
			throw new Error(
				"API request limits exceeded, please try again in a few minutes"
			)
		choices = aiResponse.choices.choices.map((singleChoice) => singleChoice)
	} catch (error) {
		throw new Error(
			"API request limits exceeded, please try again in a few minutes"
		)
	}

	if (stage === "start") {
		let title = aiResponse.title.title
		if (!title) {
			// @ts-expect-error
			title = aiResponse.title.short_title
		} else if (!title) {
			throw new Error(
				"API request limits exceeded, please try again in a few minutes"
			)
		}
		return { story, choices, title }
	}

	// else its continue so return em
	return { story, choices }
}
