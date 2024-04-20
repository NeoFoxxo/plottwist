import { createClient } from "@/utils/supabase/client";

export async function removeStar({
  current_user_id,
  author_id,
}: {
  current_user_id: string | undefined;
  author_id: string | undefined;
}) {
  const supabase = createClient();

  if (!current_user_id || !author_id) throw Error("userID/authorId not found!");

  const { error } = await supabase.rpc("remove_star", {
    current_user_id,
    author_id,
  });
  if (error) console.error(error);

  window.location.reload();
}
