import { createClient } from "@/utils/supabase/client"

export default async function getUserInfo(user_id: string) {
	const supabase = createClient()

	let { data: user, error: dataerr } = await supabase
		.from("profiles")
		.select("*")
		.eq("user_id", user_id)

	let { count: storyCount, error: infoerr } = await supabase
		.from("scenarios")
		.select("*", { count: "exact", head: true })
		.eq("user_id", user_id)
		.eq("published", "true")

	// TODO: figure out why these throw on the dashboard
	if (dataerr)
		console.log("Error when fetching user's info: " + dataerr?.message)

	if (infoerr)
		console.log("Error when fetching user's info: " + infoerr?.message)

	const userInfo = {
		data: user!![0],
		stories: storyCount!!,
	}
	return userInfo
}
