import { createClient } from "@/utils/supabase/client";

export default async function deleteStory(storyId: number) {
  const supabase = createClient();

  const { error } = await supabase.from("scenarios").delete().eq("id", storyId);

  if (error) console.log(`Could not delete story ${error.message}`);
}
