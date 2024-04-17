import BookmarksCard from "@/components/BookmarksCard";
import { getBookmarks } from "@/utils/actions/database/getBookmarks";
import getUserInfo from "@/utils/actions/getUserinfo";
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
        <div className="w-full flex flex-col gap-10 justify-center items-center">
            <h2 className="text-2xl font-bold">Bookmarks</h2>
            <section className="w-full flex flex-wrap gap-10 justify-start">
                {scenarios.map(async (scenario) => (
                    <BookmarksCard data={await getUserInfo(scenario.user_id)} scenario={scenario} />
                ))}
            </section>
        </div>
    );
}
