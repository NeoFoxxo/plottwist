import UserProfile from "@/components/UserProfile";
import getUserInfo from "@/utils/actions/getUserinfo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Profile({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) redirect("/login");

  const userInfo = await getUserInfo(params.id);

  return (
    <div className="m-4 flex w-full flex-1 flex-col items-center text-2xl">
      <UserProfile
        storyCount={userInfo.storyCount}
        profileData={userInfo.profile}
        date={userInfo.date}
        userId={user?.id}
      />
    </div>
  );
}
