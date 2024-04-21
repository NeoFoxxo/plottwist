import CreatePrompt from "@/components/CreatePrompt"
import { getStoryPrompt } from "@/utils/actions/database/getStoryPrompt"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"

type CreateProps = {
	searchParams: { remix: number }
}

export const metadata: Metadata = {
	title: "Create An Interactive Story",
	description:
		"Create an interactive story where your choices shape the narrative. Join Plot Twist today and unlock your storytelling potential.",
}

export default async function Create({ searchParams }: CreateProps) {
	const remixId = searchParams.remix

	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")

	let prompt: string = ""

	if (remixId) {
		prompt = await getStoryPrompt(remixId)
	}

	return (
		<main className="flex flex-col items-center justify-start flex-1 w-full my-4 md:p-10 md:w-fit">
			<CreatePrompt existingPrompt={prompt} />
		</main>
	)
}
