import { createClient } from "@/utils/supabase/client"

export async function pinStory(
	storyId: number,
	currentPin: boolean | null,
	userId: string
) {
	const supabase = createClient()

	let { count: pinCount, error: pinCountError } = await supabase
		.from("scenarios")
		.select("*", { count: "exact", head: true })
		.eq("user_id", userId)
		.eq("pinned", "true")

	if (currentPin === false && pinCount!! > 2) {
		return "limit"
	}

	const { error } = await supabase
		.from("scenarios")
		.update({ pinned: !currentPin })
		.eq("id", storyId)
	if (error) throw new Error("Story pin failed!")
	return "success"
}
