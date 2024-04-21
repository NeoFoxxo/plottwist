import BookmarksCard from "@/components/BookmarksCard";
import { getBookmarks } from "@/utils/actions/database/getBookmarks";
import getUserInfo from "@/utils/actions/database/getUserinfo";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "All of your saved stories"
}

export default async function Bookmarks() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) redirect("/login");

  const scenarios = await getBookmarks(user_id);

  if (!scenarios[0])
    return (
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <h2
          style={{ textShadow: "0em 0em 0.6em white" }}
          className="text-3xl font-bold"
        >
          Bookmarks
        </h2>
        <p>You have no bookmarks, try saving something from the dashboard!</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10">
      <h2
        style={{ textShadow: "0em 0em 0.6em white" }}
        className="text-3xl font-bold"
      >
        Bookmarks
      </h2>
      <section className="flex flex-wrap items-center justify-center w-full gap-10">
        <div className="flex flex-wrap justify-start w-full items start"></div>
        {scenarios.map(async (scenario) => (
          <BookmarksCard
            key={scenario.id}
            data={await getUserInfo(scenario.user_id)}
            scenario={scenario}
          />
        ))}
      </section>
    </div>
  );
}
