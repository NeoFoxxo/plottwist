import { createClient } from "@/utils/supabase/server";

export interface InsertStoryProps {
  story: string;
  choices: string[];
  prompt: string;
  title: string;
}

export interface StoryReturnTypes {
  created_at: string;
  follow_count: number;
  id: number;
  prompt: string | null;
  story: string | null;
  title: string;
  user_id: string;
  choices: string[] | null;
}

export default async function insertStory({
  story,
  choices,
  prompt,
  title,
}: InsertStoryProps): Promise<StoryReturnTypes> {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const user_id = data.user?.id;

  const { data: insertedStory, error } = await supabase
    .from("scenarios")
    .insert([
      {
        story: story,
        choices: choices,
        user_id: user_id,
        prompt: prompt,
        title: title,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  const scenario = insertedStory[0];
  return scenario;
}
