import { createClient } from "@/utils/supabase/server"

export async function getMaxStories() {
    const supabase = createClient()

    let u = (await supabase.auth.getUser()).data.user?.id

    let { data: story, error } = await supabase
        .from("profiles")
        .select('stories_created_today')
        .eq("user_id", u!!)
        .single()

    if (error) console.log(error.message)

    return story?.stories_created_today
}
