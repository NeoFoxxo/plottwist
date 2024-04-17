import { createProfile } from "@/utils/actions/database/createProfile"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get("code")
	const origin = requestUrl.origin

	if (code) {
		const supabase = createClient()
		// Logs in the user post email check
		await supabase.auth.exchangeCodeForSession(code)

		// Create profile
		await createProfile()
	}

	// URL to redirect to after sign up process completes
	return NextResponse.redirect(`${origin}/app`)
}
