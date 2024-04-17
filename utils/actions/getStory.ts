import { createClient } from "@/utils/supabase/server";

export async function getStory(id: string) {
    const supabase = createClient();

    let { data: story, error } = await supabase
        .from("scenarios")
        .select()
        .eq("id", id)
        .single();

    if (error) throw new Error("Getting the story failed!");
    return story;
}
