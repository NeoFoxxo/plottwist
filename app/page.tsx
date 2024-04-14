
import Footer from "@/components/Footer"
import AuthButton from "../components/AuthButton"
import Header from "@/components/Header"
import { ModeToggle } from "@/components/ModeToggle"
import Link from "next/link"
import { LandingPage } from "@/components/LandingPage";
import { ModeToggle } from "@/components/ModeToggle";
import ProfileButton from "@/components/ProfileButton";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="flex flex-col items-center flex-1 w-full gap-20">
                <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
                    <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
                        <AuthButton />
                        <ModeToggle />
                    </div>
                </nav>
                <LandingPage />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center flex-1 w-full gap-20">
            <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
                <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
                    <ProfileButton />
                    <AuthButton />
                </div>
            </nav>
            <LandingPage />
        </div>
    );
}