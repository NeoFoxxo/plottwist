import { createClient } from "@/utils/supabase/client"

export default async function getUserInfoByName(username: string) {
	const supabase = createClient()

	const { data: user, error: dataerr } = await supabase
		.from("profiles")
		.select("*")
		.eq("normalised_name", username)

	if (!user!![0] || dataerr) return 404

	const { count: storyCount, error: infoerr } = await supabase
		.from("scenarios")
		.select("*", { count: "exact", head: true })
		.eq("user_id", user[0].user_id)
		.eq("published", "true")

	if (infoerr) return 404

	const userInfo = {
		profile: user[0],
		storyCount: storyCount,
		date: new Date(user[0].created_at).toLocaleDateString(),
	}

	return userInfo
}
