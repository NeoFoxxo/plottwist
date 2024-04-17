import { AIResponse } from "./supabase/types/AIResponse"

export interface ExtractStoryProps {
	aiResponse: AIResponse
	isContinue: boolean
}

export function extractStoryFromAI({
	aiResponse,
	isContinue,
}: ExtractStoryProps) {
	const story = aiResponse.response.story
	if (!story) {
		throw new Error("Story data is undefined, please try again" + aiResponse)
	}

	let choices: string[]
	try {
		choices = aiResponse.choices.choices.map((singleChoice) => singleChoice)
	} catch (error) {
		throw new Error("Choice data is undefined, please try again")
	}

	if (!isContinue) {
		let title = aiResponse.title.title
		if (!title) {
			// @ts-expect-error
			title = aiResponse.title.short_title
		} else if (!title) {
			throw new Error("Title is undefined, please try again")
		}
		return { story, choices, title }
	} else {
		return { story, choices }
	}
}
