
import { createClient } from "@/utils/supabase/client";

export async function getStars({ userId, authorId }: { userId: string, authorId: string | undefined }) {

    const supabase = createClient()

    const { data: data2, error: error2 } = await supabase.from('profiles').select('star_array').eq('user_id', authorId!!)

    if (error2) return 'failed2'

    if (data2[0].star_array?.includes(userId)) return true

    return false

}
