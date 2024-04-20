import { createClient } from "@/utils/supabase/server"

export async function getStars({
	userId,
	authorId,
}: {
	userId: string
	authorId: string | undefined
}) {
	const supabase = createClient()

	const { data: data, error: error } = await supabase
		.from("profiles")
		.select("star_array")
		.eq("user_id", userId!!)

	if (error) {
		console.log(
			"Error occured when checking if user has starred author " + error
		)
		return false
	}

	if (data[0].star_array?.includes(authorId!!)) return true

	return false
}
