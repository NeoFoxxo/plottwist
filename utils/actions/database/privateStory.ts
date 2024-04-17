import { createClient } from "@/utils/supabase/client"
const supabase = createClient()

export default async function unPublish(story: number) {

    await supabase
        .from("scenarios")
        .update({
            published: false,
            finished: true
        })
        .eq("id", story)
}
