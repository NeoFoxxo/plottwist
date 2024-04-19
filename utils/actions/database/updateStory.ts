import { createClient } from "@/utils/supabase/server"
import { StoryReturnTypes } from "../database/insertStory"

export interface UpdateStoryProps {
	story: string
	choices: string[]
	title: string
	previousStoryId: number
	isFinished?: boolean
}

export default async function updateStory({
	story,
	choices,
	title,
	previousStoryId,
	isFinished,
}: UpdateStoryProps): Promise<StoryReturnTypes> {
	const supabase = createClient()

	if (isFinished) {
		const { data: finishedStory, error } = await supabase
			.from("scenarios")
			.update({
				story: story,
				choices: choices,
				title: title,
				finished: true,
				published: false,
			})
			.eq("id", previousStoryId)
			.select()
		if (error) throw new Error(error.message)
		const scenario = finishedStory[0]
		return scenario
	}

	const { data: updatedStory, error } = await supabase
		.from("scenarios")
		.update({
			story: story,
			choices: choices,
			title: title,
			finished: false,
			published: false,
		})
		.eq("id", previousStoryId)
		.select()

	if (error) throw new Error(error.message)
	const scenario = updatedStory[0]
	return scenario
}
