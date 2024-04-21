import { createClient } from "@/utils/supabase/server"

export async function getStoryTitle(storyId: string) {
	const supabase = createClient()
	const { data: title, error } = await supabase
		.from("scenarios")
		.select("title")
		.eq("id", storyId)
		.single()

	if (error) throw new Error("Getting the story title failed!")

	if (title.title) {
		return title.title
	}
}
