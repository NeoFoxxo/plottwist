import { createClient } from "@/utils/supabase/server"

export interface InsertStoryProps {
	story: string
	choices: string[]
	prompt: string
	title: string
}

export default async function insertStory({
	story,
	choices,
	prompt,
	title,
}: InsertStoryProps): Promise<number> {
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

	return insertedStory[0].id
}
