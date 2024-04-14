import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

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
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <Button variant={"ghost"}>
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className={buttonVariants({ variant: "secondary" })}
    >
      Login
    </Link>
  );
}
