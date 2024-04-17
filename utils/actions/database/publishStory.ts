import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/dist/server/api-utils"
const supabase = createClient()

export default async function publish(story: number) {

    await supabase
        .from("scenarios")
        .update({
            published: true,
            finished: true
        })
        .eq("id", story)

}