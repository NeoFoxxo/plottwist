import { createClient } from "@/utils/supabase/server";

export async function getBookmarks(user_id: string | null) {
  const supabase = createClient();

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user_id!!);
  if (bookmarksError) throw Error("Bookmarks fetch failed!");

  const bookmarkedStories = bookmarks.map((bookmark) => bookmark.scenario_id);

  const { data: scenarios, error } = await supabase.from("scenarios").select("*").in("id", bookmarkedStories);
  if (error) throw Error("Scenarios fetch failed in bookmarks!");

  return scenarios;
}
