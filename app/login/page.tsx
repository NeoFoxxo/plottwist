import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { siteurl } from "@/utils/siteurl";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    async function signIn(formData: FormData) {
        "use server";

        const email = formData.get("email") as string;
        const supabase = createClient();

        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: `${siteurl}/api/auth/callback`,
            },
        });

        if (error) {
            console.log(error.message);
            return redirect(
                `/login?message=Could not authenticate user: ${error.message}`,
            );
        }

        return redirect(
            "/login?message=Check your email to sign in to Plot Twist!",
        );
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
            </Link>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold">Sign in</h1>
                    <h2>Simply provide your email to continue to Plot Twist</h2>
                </div>
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                />
                <SubmitButton
                    formAction={signIn}
                    className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
                    pendingText="Signing In..."
                >
                    Sign In
                </SubmitButton>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    );
}
