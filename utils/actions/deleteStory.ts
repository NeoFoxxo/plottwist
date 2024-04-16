import { createClient } from "@/utils/supabase/server"

export default async function deleteStory(storyId: number) {
	const supabase = createClient()

	const { error } = await supabase.from("scenarios").delete().eq("id", storyId)

	if (error) throw new Error(`Could not delete story ${error}`)
}
