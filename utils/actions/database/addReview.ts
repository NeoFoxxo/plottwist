import { createClient } from "@/utils/supabase/client";

export async function addReview({
  storyId,
  comment,
  authorId,
}: {
  storyId: number;
  comment: string;
  authorId: string;
}) {
  const supabase = createClient();

  const { error } = await supabase
    .from("comments")
    .insert({ comment: comment, user_id: authorId, scenario_id: storyId });

  if (error) return "failed";

  return "done";
}
