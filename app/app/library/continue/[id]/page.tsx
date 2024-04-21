import NotFound from "@/app/not-found"
import ContinueStory from "@/components/ContinueStory"
import { getStory } from "@/utils/actions/database/getStory"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"

type ContinueProps = {
	params: { id: string }
}

export const generateMetadata = ({ params }: ContinueProps): Metadata => {
	return {
		title: `Continue Story ${params.id}`,
		description: `Continue your comprehensive journey`
	}
}

export default async function Continue({ params }: ContinueProps) {
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
		<main className="flex flex-col items-center justify-start flex-1 w-full my-4 md:p-10 md:w-fit">
			<ContinueStory scenarioData={scenario!!} />
		</main>
	)
}
