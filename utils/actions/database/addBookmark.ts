import { createClient } from "@/utils/supabase/client";

export async function addBookmark(scenario_id: number) {
  const supabase = createClient();

  // Create profile if user authenticated
  const { data } = await supabase.auth.getUser();
  if (data.user?.aud !== "authenticated") throw new Error("User auth failed!");

  const user_id = data.user?.id;

  // Add bookmark
  const { error } = await supabase.rpc("add_bookmark_rpc", {
    b_user_id: user_id,
    b_scenario_id: scenario_id,
  });
  if (error) throw new Error("Bookmark creation failed!");
}
