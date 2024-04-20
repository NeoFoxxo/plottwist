import { createClient } from "@/utils/supabase/client";

export async function addStar({ userId, authorId }: { userId: string, authorId: string | undefined }) {

    const supabase = createClient()

    const { data, error } = await supabase.from('profiles').select('star_count').eq('user_id', userId!!)

    if (error) return console.log(error)

    let new_int: number = data[0].star_count

    const { error: error2 } = await supabase.from('profiles').update({ 'star_count': new_int + 1 }).eq('user_id', userId!!)

    if (error2) return console.log(error2)

    const { data: data3, error: error3 } = await supabase.from('profiles').select('star_array').eq('user_id', authorId!!)

    if (error3) return 'failed3'

    const new_array = [...data3[0]!!.star_array!!, userId]

    const { error: error4 } = await supabase.from('profiles').update({ 'star_array': new_array }).eq('user_id', authorId!!)

    if (error4) return console.log(error4)

    return 'done'

}