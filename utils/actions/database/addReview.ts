import { createClient } from "@/utils/supabase/server";

export async function addReview({ storyId, comment, authorId }: { storyId: number, comment: string, authorId: string }) {

    const supabase = createClient()

    await supabase.from('comments').insert({ comment: comment, user_id: authorId, scenario_id: storyId })

}