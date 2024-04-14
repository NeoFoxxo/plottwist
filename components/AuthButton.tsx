import { buttonVariants } from "@/components/ui/button";
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
        <form action={signOut}>
            <div className="px-2 py-[6px] text-sm hover:bg-gray-800 rounded-sm cursor-pointer">
                Logout
            </div>
        </form>
    ) : (
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
            Login
        </Link>
    );
}
