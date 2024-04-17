import { createClient } from "@/utils/supabase/server"

export default async function getUsersStories(user_id: string) {
	const supabase = createClient()

	let { data: userStories, error } = await supabase
		.from("scenarios")
		.select("*")
		.eq("user_id", user_id)

	if (error) throw new Error("Error when fetching user's stories")
	return userStories
}
