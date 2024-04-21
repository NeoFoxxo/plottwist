import { createClient } from "@/utils/supabase/server"
import { getMaxStories } from "./getMaxStories"

export interface InsertStoryProps {
	story: string
	choices: string[]
	prompt: string
	title: string
}

export interface StoryReturnTypes {
	created_at: string
	story_part_count: number
	id: number
	prompt: string | null
	story: string | null
	title: string
	user_id: string
	choices: string[] | null
}

export default async function insertStory({
	story,
	choices,
	prompt,
	title,
}: InsertStoryProps): Promise<StoryReturnTypes> {
	const supabase = createClient()

	const { data } = await supabase.auth.getUser()
	const user_id = data.user?.id

	const { data: insertedStory, error } = await supabase
		.from("scenarios")
		.insert([
			{
				story: story,
				choices: choices,
				user_id: user_id,
				prompt: prompt,
				title: title,
			},
		])
		.select()

	if (error) throw new Error(error.message)
	const scenario = insertedStory[0]

	let { error: incrementStoryErr } = await supabase.rpc(
		"increment_stories_created_today",
		{
			current_user_id: user_id!!,
		}
	)

	if (error) console.error(incrementStoryErr)

	return scenario
}
