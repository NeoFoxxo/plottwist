import { createClient } from "@/utils/supabase/server";

export async function getReviews({
  storyId,
  commentsCount,
}: {
  storyId: number;
  commentsCount: number;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("scenario_id", storyId)
    .range(0, commentsCount);

  if (error) return [];

  return data;
}
