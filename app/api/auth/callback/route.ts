import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const createProfile = async (
    supabase: SupabaseClient,
    user_id: string,
    email: string
) => {
    const { data: existingUser, error: existingError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user_id);
    if (existingError) throw new Error("Existing profile check failed!");

    if (existingUser.length === 0) {
        const { error } = await supabase
            .from("profiles")
            .insert([{ user_id: user_id, email: email }]);
        if (error) throw new Error("Profile creation failed!");
    }
};

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;

    if (code) {
        const supabase = createClient();
        // Logs in the user post email check
        await supabase.auth.exchangeCodeForSession(code);

        // Create profile
        const { data } = await supabase.auth.getUser();
        if (data.user?.aud !== "authenticated")
            throw new Error("User auth failed!");

        const id = data.user?.id;
        const email = data.user?.email;
        await createProfile(supabase, id, email!);
    }

    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}/protected`);
}
