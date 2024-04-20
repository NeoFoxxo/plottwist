import { createClient } from "@/utils/supabase/server"
export default async function getCommentCount(scenarioId: number) {
	const supabase = createClient()

	const { data: commentCount, error } = await supabase.rpc(
		"get_comment_count",
		{
			scenarioid: scenarioId,
		}
	)

	if (error)
		throw new Error("Failed to get commentCount " + error.message + scenarioId)

	if (!commentCount) {
		return 0
	}
	return commentCount
}
