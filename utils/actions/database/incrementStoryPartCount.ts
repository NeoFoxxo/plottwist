import { createClient } from "@/utils/supabase/server"

export async function incrementStoryPartCount(story_id: number) {
	const supabase = createClient()

	let { error } = await supabase.rpc("increment_story_part_count", {
		story_id,
	})
	if (error) {
		console.error(error)
	}
}
