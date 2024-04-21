import { LibraryCard } from "@/components/LibraryCard";
import getPinnedStories from "@/utils/actions/database/getPinnedStories";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Library() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) redirect("/login");

  const userStories = await getPinnedStories(user_id);

  return (
    <main className="flex flex-col items-center justify-start w-full my-4 md:p-5 md:w-fit">
      <h1
        style={{ textShadow: "0em 0em 0.6em white" }}
        className="text-3xl font-bold text-center"
      >
        Your Stories
      </h1>
      <div className="flex flex-wrap justify-start items-start py-0 md:py-10">
        {userStories?.length ? (
          userStories?.map((story) => (
            <div className="!max-w-[26rem] md:!h-80" key={story.id}>
              <LibraryCard key={story.id} scenario={story} />
            </div>
          ))
        ) : (
          <div className="text-xl pt-7">No stories created</div>
        )}
      </div>
    </main>
  );
}
