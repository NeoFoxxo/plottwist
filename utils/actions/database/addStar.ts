import { createClient } from "@/utils/supabase/client"

export async function addStar({
	current_user_id,
	author_id,
}: {
	current_user_id: string | undefined
	author_id: string | undefined
}) {
	const supabase = createClient()

	const { error } = await supabase.rpc("increment_star", {
		current_user_id,
		author_id,
	})
	if (error) console.error(error)

	window.location.reload()
}
