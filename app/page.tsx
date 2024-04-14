import { LandingPage } from "@/components/LandingPage";
import { ModeToggle } from "@/components/ModeToggle";
import ProfileButton from "@/components/ProfileButton";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "../components/AuthButton";

export default async function Index() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <LandingPage />;
}
