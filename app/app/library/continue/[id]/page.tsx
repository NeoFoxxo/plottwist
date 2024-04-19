import ContinueStory from "@/components/ContinueStory";
import { getStory } from "@/utils/actions/database/getStory";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Create({ params }: { params: { id: string } }) {
  const scenario = await getStory(params.id);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) redirect("/login");

  return (
    <main className="my-4 flex w-full flex-1 flex-col items-center justify-start md:w-fit md:p-10">
      {scenario ? <ContinueStory scenarioData={scenario} /> : <div>No story data found!</div>}
    </main>
  );
}
