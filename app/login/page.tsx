import { siteurl } from "@/utils/siteurl";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    async function signIn(formData: FormData) {
        "use server";

        const email = formData.get("email") as string;
        const supabase = createClient();

        const response = await fetch('https://cluyaim7y39pv7mvbkmxlhcbh.agent.a.smyth.ai/api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        const data_ = await response.json();
        const userName = JSON.parse(data_.result.Output.generatedUsername).username

        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: `${siteurl}/api/auth/callback`,
            },
        });

        if (error) {
            console.log(error.message);
            return redirect(
                `/login?message=Could not authenticate user: ${error.message}`
            );
        }

        //here we should insert the username (userName)

        return redirect(
            "/login?message=Check your email to sign in to Plot Twist!"
        );
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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
