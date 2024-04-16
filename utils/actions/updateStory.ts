import { createClient } from "@/utils/supabase/server"
import { StoryReturnTypes } from "./insertStory"

export interface UpdateStoryProps {
	story: string
	choices: string[]
	prompt: string
	title: string
	previousStoryId: number
}

export default async function updateStory({
	story,
	choices,
	prompt,
	title,
	previousStoryId,
}: UpdateStoryProps): Promise<StoryReturnTypes> {
	const supabase = createClient()

	const { data } = await supabase.auth.getUser()
	const user_id = data.user?.id

	const { data: updatedStory, error } = await supabase
		.from("scenarios")
		.update({
			story: story,
			choices: choices,
			user_id: user_id,
			prompt: prompt,
			title: title,
		})
		.eq("id", previousStoryId)
		.select()

	if (error) throw new Error(error.message)
	const scenario = updatedStory[0]
	return scenario
}
