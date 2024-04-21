import { createClient } from "@/utils/supabase/client";

export interface getStoryReturnType {
  choices: string[] | null;
  created_at: string;
  finished: boolean | null;
  story_part_count: number;
  id: number;
  prompt: string | null;
  published: boolean | null;
  pinned: boolean | null;
  story: string | null;
  title: string;
  user_id: string | null;
}

export async function getUserStories(user_id: string, currentSlice: number) {
  const supabase = createClient();

  let { data: story, error } = await supabase
    .from("scenarios")
    .select("*")
    .eq("user_id", user_id)
    .eq("published", "true")
    .range(currentSlice, currentSlice + 1);

  if (error) throw new Error("Getting the story failed!");
  return story;
}
