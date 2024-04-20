import { createClient } from "@/utils/supabase/client";

export default async function deleteReview(comment_id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", comment_id);

  if (error) throw new Error(`Could not delete review ${error}`);
}
