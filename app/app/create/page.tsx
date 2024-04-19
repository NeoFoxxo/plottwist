import CreatePrompt from "@/components/CreatePrompt";
import { getStoryPrompt } from "@/utils/actions/database/getStoryPrompt";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Create({ searchParams }: { searchParams: { remix: number } }) {
  const remixId = searchParams.remix;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) redirect("/login");

  let prompt: string = "";

  if (remixId) {
    prompt = await getStoryPrompt(remixId);
  }

  return (
    <main className="my-4 flex w-full flex-1 flex-col items-center justify-start md:w-fit md:p-10">
      <CreatePrompt existingPrompt={prompt} />
    </main>
  );
}
