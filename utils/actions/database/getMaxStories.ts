import { createClient } from "@/utils/supabase/server";

export async function getMaxStories() {
  const supabase = createClient();

  let userId = (await supabase.auth.getUser()).data.user?.id;

  let { data: story, error } = await supabase
    .from("profiles")
    .select("stories_created_today")
    .eq("user_id", userId!!)
    .single();

  if (error) console.log(error.message);

  const storyCount = story?.stories_created_today;

  return { storyCount, userId };
}
