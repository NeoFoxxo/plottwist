import { createClient } from "@/utils/supabase/server";

export async function getUserTotalBookmarks(profileUserId: string) {
  const supabase = createClient();
  const { data: totalBookmarks, error } = await supabase.rpc(
    "get_user_total_bookmarks",
    {
      profile_user_id: profileUserId,
    }
  );
  if (error) {
    console.error(error);
    return 0;
  }

  return totalBookmarks;
}
