import { createClient } from "@/utils/supabase/client";

export async function removeBookmark(scenario_id: number) {
    const supabase = createClient();

    // Create profile if user authenticated
    const { data } = await supabase.auth.getUser();
    if (data.user?.aud !== "authenticated")
        throw new Error("User auth failed!");

    const user_id = data.user?.id;
    const email = data.user?.email;

    // Existing bookmark check
    const { data: existingScenario, error: existingError } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user_id)
        .eq("scenario_id", scenario_id);
    if (existingError) throw new Error("Existing bookmarks check failed!");

    if (existingScenario.length > 0) {
        if (!email) throw new Error("Email not found for user!");

        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("user_id", user_id)
            .eq("scenario_id", scenario_id);
        if (error) throw new Error("Bookmark creation failed!");
    }
}
