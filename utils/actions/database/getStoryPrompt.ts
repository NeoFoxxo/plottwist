import { createClient } from "@/utils/supabase/server"

export async function getStoryPrompt(storyId: number) {
	const supabase = createClient()
	const { data: prompt, error } = await supabase
		.from("scenarios")
		.select("prompt")
		.eq("id", storyId)
		.single()

	// if anything bad happens just return an empty string and the page will load as normal
	if (error) return ""

	if (prompt.prompt) {
		return prompt.prompt
	}
	return ""
}
