import { createClient } from "@/utils/supabase/server"

export default async function getStoryBookmarkCount(scenarioId: number) {
	const supabase = createClient()

	const { data: bookmarkCount, error } = await supabase.rpc(
		"get_story_bookmark_count",
		{
			scenarioid: scenarioId,
		}
	)

	if (error)
		throw new Error("Failed to get bookmarkCount " + error.message + scenarioId)

	if (!bookmarkCount) {
		return 0
	}
	return bookmarkCount
}
