import { createClient } from "@/utils/supabase/server"

export async function getScenarios() {
	const supabase = createClient()

	const { data: mostPopular, error } = await supabase
		.from("scenarios")
		.select("*")
		.eq("published", "true")

	const { data: recentStories, error: recentStoriesError } = await supabase
		.from("scenarios")
		.select("*")
		.order("created_at", { ascending: false })
		.eq("published", "true")

	if (error) throw new Error("Get scenarios failed!")

	return { mostPopular, recentStories }
}
