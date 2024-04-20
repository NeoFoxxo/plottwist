import { createClient } from "@/utils/supabase/server";

export async function getBookmarksId(user_id: string | null) {
  if (user_id === "no user") {
    return [];
  }
  const supabase = createClient();

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("scenario_id")
    .eq("user_id", user_id!!);
  if (bookmarksError) throw Error("Bookmarks fetch failed!");

  const bookmarkedStories = bookmarks.map((bookmark) => bookmark.scenario_id);

  return bookmarkedStories;
}
