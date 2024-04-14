import ProfileButton from "@/components/ProfileButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthButton from "../../components/AuthButton";

export default async function ProtectedPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col items-center">
            <nav className="w-full flex border-b items-center justify-center border-b-foreground/10 h-16">
                <div className="w-full max-w-7xl flex p-3 items-center justify-between text-sm">
                    <ProfileButton />
                    <AuthButton />
                </div>
            </nav>
            <div className="m-4 text-xl text-slate-300">
                PROFILE PAGE PLACEHOLDER
            </div>
        </div>
    );
}
