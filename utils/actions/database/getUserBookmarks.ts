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

export async function getUserBookmarks(user_id: string, currentSlice: number) {
  const supabase = createClient();

  let { data: bookmarks, error } = await supabase.rpc(
    "get_bookmark_pagination_rpc",
    {
      b_user_id: user_id,
      page_no: currentSlice,
      page_size: 2,
    }
  );

  if (error) throw new Error("Getting bookmarks failed!");
  return bookmarks;
}
