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

    if (dataerr || infoerr) throw new Error("Error when fetching user's info")
    let d = {
        data: user!![0],
        stories: storyCount!!
    }
    return d
}
