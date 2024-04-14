import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import { Button, buttonVariants } from "@/components/ui/button";

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
            <form action={signOut}>
                <Button variant={"ghost"}>
                    Logout
                </Button>
            </form>
        </div>
    ) : (
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>Login</Link>
    );
}
