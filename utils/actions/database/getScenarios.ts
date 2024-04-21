import { createClient } from "@/utils/supabase/server"

export async function getScenarios({
	mostPopularCount,
	recentStoriesCount,
}: {
	mostPopularCount: number
	recentStoriesCount: number
}) {
	const supabase = createClient()

	const { data: mostPopular, error } = await supabase
		.from("scenarios")
		.select("*")
		.eq("published", "true")
		.range(0, mostPopularCount)

	const { data: recentStories, error: recentStoriesError } = await supabase
		.from("scenarios")
		.select("*")
		.order("created_at", { ascending: false })
		.eq("published", "true")
		.range(0, recentStoriesCount)

	if (error || recentStoriesError) throw new Error("Get scenarios failed!")

	return { mostPopular, recentStories }
}
