import { LibraryCard } from "@/components/LibraryCard";
import getUsersStories from "@/utils/actions/database/getUsersStories";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Library() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const user_id = user?.id;
    if (!user_id) redirect("/login");

    const userStories = await getUsersStories(user_id);

    return (
        <main className="flex flex-col flex-1 my-4 md:p-5 justify-start items-center w-full md:w-fit">
            <h1
                style={{
                    fontFamily: '"Poppins", sans-serif',
                    textShadow: "0em 0em 0.3em rgba(100,240,230,1)",
                }}
                className="text-4xl font-bold text-center"
            >
                Your Stories
            </h1>
            <div className="flex flex-row flex-wrap justify-center">
                {userStories?.length ? userStories?.map((story) => (
                    <div className="!max-w-[26rem] md:!h-80" key={story.id}>
                        <LibraryCard key={story.id} scenario={story} />
                    </div>
                )) : <div className="text-xl pt-7">No stories created</div>}
            </div>
        </main>
    );
}
