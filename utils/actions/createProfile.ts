import { createClient } from "@/utils/supabase/server";
import { generateRandomUsername } from "./generateUsername";

export async function createProfile() {
    const supabase = createClient();

    // Create profile if user authenticated
    const { data } = await supabase.auth.getUser();
    if (data.user?.aud !== "authenticated") throw new Error("User auth failed!");

    const user_id = data.user?.id;
    const email = data.user?.email;
    const username = await generateRandomUsername()

    // User exist check
    const { data: existingUser, error: existingError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user_id);
    if (existingError) throw new Error("Existing profile check failed!");

    if (existingUser.length === 0) {
        const { error } = await supabase
            .from("profiles")
            .insert([{ user_id: user_id, email: email, name: username }]);
        if (error) throw new Error("Profile creation failed!");
    }
}
