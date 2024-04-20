import { createClient } from "@/utils/supabase/server";

export async function getBookmarks(user_id: string | null) {
  const supabase = createClient();
  if (!user_id) throw Error("User not found!");

  // RPC Call
  const { data: scenarios, error } = await supabase.rpc("get_bookmark_rpc", {
    b_user_id: user_id,
  });

  if (error) throw Error("Scenarios fetch failed in bookmarks!");
  return scenarios;
}
