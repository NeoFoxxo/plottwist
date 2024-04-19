import { ScenarioCard } from "@/components/ScenarioCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId";
import { getScenarios } from "@/utils/actions/database/getScenarios";
import getUserInfo from "@/utils/actions/database/getUserinfo";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Dashboard({ searchParams }: { searchParams: { stories: number } }) {
  const supabase = createClient();

  let { data, error } = await supabase.auth.getUser();

  // if user is not logged in provide a fake id so that it does not crash
  // the id is used for the "your story" functionality
  if (error) {
    data = {
      //@ts-expect-error
      user: {
        id: "unauthenticated user",
      },
    };
  }

  const bookmark = await getBookmarksId(data?.user?.id!!);

  //@ts-expect-error
  let storyCount = parseInt(searchParams.stories); // make sure its an int

  if (!storyCount) {
    storyCount = 20;
  }

  const { mostPopular, recentStories } = await getScenarios({ storyCount });

  return (
    <div className="container mx-auto flex h-[90vh] flex-row overflow-hidden p-4 text-2xl max-lg:flex-col">
      <div className="mx-auto flex w-full flex-col">
        <h2 style={{ textShadow: "0em 0em 0.6em white" }} className="text-center text-2xl font-bold">
          Most popular
        </h2>
        <ScrollArea className="mt-2 w-full">
          <div className="top-0 h-[80vh] py-5">
            {mostPopular?.map(async (scenario) => (
              <ScenarioCard
                key={scenario.id}
                currentUser={data}
                data={await getUserInfo(scenario?.user_id)}
                scenario={scenario}
                bookmark={bookmark.includes(scenario.id) ? true : false}
              />
            ))}
            <Link href={`/app?stories=${storyCount + 20}`}>
              <div className="mt-5 flex">
                <Button className="mx-auto">Show More</Button>
              </div>
            </Link>
            <div className="pb-20"></div>
          </div>
        </ScrollArea>
      </div>
      <div className="mx-auto flex w-full flex-col">
        <h2 style={{ textShadow: "0em 0em 0.6em white" }} className="text-center text-2xl font-bold">
          New stories
        </h2>
        <ScrollArea className="mt-2 w-full">
          <div className="top-0 h-[80vh] py-5">
            {recentStories?.map(async (scenario, index) => (
              <ScenarioCard
                currentUser={data}
                data={await getUserInfo(scenario.user_id)}
                key={scenario.id}
                scenario={scenario}
                bookmark={bookmark.includes(scenario.id) ? true : false}
              />
            ))}
            <Link href={`/app?stories=${storyCount + 20}`}>
              <div className="mt-5 flex">
                <Button className="mx-auto">Show More</Button>
              </div>
            </Link>
            <div className="pb-20"></div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
