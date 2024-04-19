import BookmarksCard from "@/components/BookmarksCard";
import { getBookmarks } from "@/utils/actions/database/getBookmarks";
import getUserInfo from "@/utils/actions/database/getUserinfo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Bookmarks() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) redirect("/login");

  const scenarios = await getBookmarks(user_id);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <h2 style={{ textShadow: "0em 0em 0.6em white" }} className="text-2xl font-bold">
        Bookmarks
      </h2>
      <section className="flex w-full flex-wrap justify-start gap-10">
        {scenarios.map(async (scenario) => (
          <BookmarksCard key={scenario.id} data={await getUserInfo(scenario.user_id)} scenario={scenario} />
        ))}
      </section>
    </div>
  );
}
