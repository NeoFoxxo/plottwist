import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function ProfileButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // If user has a custom name display it instead of email
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id);
    if (error) return redirect("/");

    return user ? (
        <Button variant="secondary" className="gap-2">
            {data[0]?.name ? data[0].name : user.email}
        </Button>
    ) : (
        <Button variant="secondary">Guest</Button>
    );
}
