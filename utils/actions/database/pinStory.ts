import { createClient } from "@/utils/supabase/client";

export async function pinStory(storyId: number, currentPin: boolean | null) {
  const supabase = createClient();

  const { error } = await supabase.from("scenarios").update({ pinned: !currentPin }).eq("id", storyId);
  if (error) throw new Error("Story pin failed!");
}
