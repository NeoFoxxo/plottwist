import { createClient } from "@/utils/supabase/server";

export async function updateProfile(newProfile: any) {
    const supabase = createClient();

    // Authenticate the user
    const { data, error: authError } = await supabase.auth.getUser();
    if (!data?.user?.aud || data.user.aud !== "authenticated") {
        throw new Error(authError?.message || "User authentication failed!");
    }

    const userId = data.user.id;

    try {
        // Update the authenticated user's profile
        const { error } = await supabase
            .from("profiles")
            .update(newProfile)
            .eq("id", userId);

        if (error) {
            throw new Error(`Profile update failed: ${error.message}`);
        }

        return { message: "Profile updated successfully!" };
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
}
