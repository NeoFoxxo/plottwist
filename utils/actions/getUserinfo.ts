import { createClient } from "@/utils/supabase/client"

export default async function getUserInfo(user_id: string) {
	const supabase = createClient()

	const { data: user, error: dataerr } = await supabase
		.from("profiles")
		.select("*")
		.eq("user_id", user_id)

	const { count: storyCount, error: infoerr } = await supabase
		.from("scenarios")
		.select("*", { count: "exact", head: true })
		.eq("user_id", user_id)

	if (dataerr || infoerr) throw new Error("Error when fetching user's info")

	const userInfo = {
		profile: user[0],
		storyCount: storyCount,
		date: new Date(user[0].created_at).toLocaleDateString(),
	}

	return userInfo
}
