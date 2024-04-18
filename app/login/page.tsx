import { siteurl } from "@/utils/siteurl"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SubmitButton } from "./submit-button"

export default function Login({
	searchParams,
}: {
	searchParams: { message: string }
}) {
	async function signIn(formData: FormData) {
		"use server"

		const email = formData.get("email") as string
		const supabase = createClient()

		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				emailRedirectTo: `${siteurl}/api/auth/callback`,
			},
		})

		if (error) {
			return redirect(
				`/login?message=Could not authenticate user: ${error.message}`
			)
		}

		return redirect("/login?message=Check your email to sign in to Plot Twist!")
	}

	return (
		<div className="pt-40 flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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
					style={{ border: "solid 1px rgba(255,255,255,0.300)" }}
					className="bg-black/30 hover:bg-gray-400/30 transition-all rounded-md px-4 py-2 text-foreground mb-2"
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
	)
}
