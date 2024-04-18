import { createClient } from "@/utils/supabase/server";
import { generateRandomUsername } from "../api/generateUsername";

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
        if (!email) throw new Error("Email not found for user!");

        const { error } = await supabase
            .from("profiles")
            .insert([{ user_id: user_id, email: email, name: username, bio: `We don't have a description for ${username} yet.\nBut we're pretty sure that they're really cool!`, links: ["", "", "", ""] }]);
        if (error) throw new Error("Profile creation failed!");
    }
}
