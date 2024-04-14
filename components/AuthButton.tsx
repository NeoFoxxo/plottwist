import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export default async function AuthButton() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/login");
    };

    return user ? (
        <div className="flex items-center justify-between gap-4">
            <ModeToggle />
            <form action={signOut}>
                <Button variant="outline">Logout</Button>
            </form>
        </div>
    ) : (
        <Button variant="outline">
            <Link href="/login">Login</Link>
        </Button>
    );
}
