import { createClient } from "@/utils/supabase/server"

export default async function getPinnedStories(user_id: string) {
	const supabase = createClient()

	let { data: userStories, error } = await supabase
		.from("scenarios")
		.select("*")
		.order("pinned", { ascending: false })
		.eq("user_id", user_id)
		.eq("pinned", "true")

	const sortedStories = userStories?.sort((a, b) => {
		if (a.pinned === b.pinned) {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		} else {
			return a.pinned ? -1 : 1
		}
	})

	if (error) throw new Error("Error when fetching user's pinned stories")
	return sortedStories
}
