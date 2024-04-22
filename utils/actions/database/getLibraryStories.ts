import { createClient } from "@/utils/supabase/client"

export default async function getLibraryStories(
	user_id: string,
	currentSlice: number
) {
	const supabase = createClient()

	const { data: userStories, error } = await supabase
		.from("scenarios")
		.select("*")
		.eq("user_id", user_id)
		.order("created_at", { ascending: false })
		.range(currentSlice, currentSlice + 2)

	if (error) throw new Error("Error when fetching user's stories")
	return userStories
}
