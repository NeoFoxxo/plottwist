import { createClient } from "@/utils/supabase/server";

export async function addBookmark({ scenario_id }: { scenario_id: number }) {
    const supabase = createClient();

    // Create profile if user authenticated
    const { data } = await supabase.auth.getUser();
    if (data.user?.aud !== "authenticated")
        throw new Error("User auth failed!");

    const user_id = data.user?.id;
    const email = data.user?.email;

    // User exist check
    const { data: existingScenario, error: existingError } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user_id)
        .eq("id", scenario_id);
    if (existingError) throw new Error("Existing bookmarks check failed!");

    if (existingScenario.length === 0) {
        if (!email) throw new Error("Email not found for user!");

        const { error } = await supabase
            .from("bookmarks")
            .insert({ scenario_id: scenario_id, user_id: user_id });
        if (error) throw new Error("Bookmark creation failed!");
    }
}
