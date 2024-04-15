import { Button, buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

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
        <form
            action={signOut}
            className="w-full text-sm rounded-sm flex items-center justify-center hover:bg-secondary"
        >
            <button
                type="submit"
                className="w-full px-2 py-[6px] flex justify-start items-center"
            >
                Logout
            </button>
        </form>
    ) : (
        <>
            <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
            >
                Login
            </Link>
            <Link href="/app">
                <Button>Dashboard</Button>
            </Link>
        </>
    );
}
