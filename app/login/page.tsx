import { siteurl } from "@/utils/siteurl"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SubmitButton } from "./submit-button"
import { Metadata } from "next"

type LoginProps = {
	searchParams: { message: string }
}

export const metadata: Metadata = {
	title: "Login",
	description:
		"Login or Create your Plot Twist account to create interactive stories where your choices shape the narrative. Explore stories created by the community or share your own. Join Plot Twist today and unlock your storytelling potential.",
}

export default function Login({ searchParams }: LoginProps) {
	async function signIn(formData: FormData) {
		"use server"

		const email = formData.get("email") as string
		const supabase = createClient()

		const { error } = await supabase.auth.signInWithOtp({
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
		<div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 pt-40 sm:max-w-md">
			<form className="flex flex-col justify-center flex-1 w-full gap-2 animate-in text-foreground">
				<div className="mb-5">
					<h1 className="text-2xl font-bold">Sign in</h1>
					<h2>Simply provide your email to continue to Plot Twist</h2>
				</div>
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					className="px-4 py-2 mb-6 border rounded-md bg-inherit"
					name="email"
					type="email"
					placeholder="you@example.com"
					required
				/>
				<SubmitButton
					formAction={signIn}
					style={{ border: "solid 1px rgba(255,255,255,0.300)" }}
					className="px-4 py-2 mb-2 transition-all rounded-md bg-black/30 hover:bg-gray-400/30 text-foreground"
					pendingText="Signing In..."
				>
					Sign In
				</SubmitButton>
				{searchParams?.message && (
					<p className="p-4 mt-4 text-center bg-foreground/10 text-foreground">
						{searchParams.message}
					</p>
				)}
			</form>
		</div>
	)
}
