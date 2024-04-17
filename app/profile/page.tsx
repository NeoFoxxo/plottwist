import UserProfile from "@/components/UserProfile";
import getUserInfo from "@/utils/actions/getUserinfo";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const user_id = user?.id;
    if (!user_id) redirect("/login");

    const stories = (await getUserInfo(user_id)).stories

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user_id);

    if (error) throw new Error("Profile details fetch failed!");
    const profileData = data[0];
    const date = new Date(profileData.created_at).toLocaleDateString();

    return (
        <div className="flex flex-col items-center flex-1 w-full m-4 text-2xl">
            <UserProfile stories={stories} profileData={profileData} date={date} />
        </div>
    );
}
