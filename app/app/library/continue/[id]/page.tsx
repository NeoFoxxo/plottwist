import NotFound from "@/app/not-found"
import ContinueStory from "@/components/ContinueStory"
import { getStory, getStoryReturnType } from "@/utils/actions/database/getStory"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Create({ params }: { params: { id: string } }) {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")

	let scenario
	try {
		scenario = await getStory(params.id)
	} catch (error) {
		return <NotFound />
	}

	// if user did not create the story 404 them
	if (scenario?.user_id != user_id) return <NotFound />

	return (
		<main className="flex flex-col flex-1 my-4 md:p-10 justify-start items-center w-full md:w-fit">
			<ContinueStory scenarioData={scenario!!} />
		</main>
	)
}
