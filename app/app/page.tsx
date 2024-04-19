import { createClient } from "@/utils/supabase/server"
import { ScenarioCard } from "@/components/ScenarioCard"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import getUserInfo from "@/utils/actions/database/getUserinfo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBookmarks } from "@/utils/actions/database/getBookmarks"
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId"

export default async function Dashboard({
	searchParams,
}: {
	searchParams: { stories: number }
}) {
	const supabase = createClient()

	let { data, error } = await supabase.auth.getUser()

	// if user is not logged in provide a fake id so that it does not crash
	// the id is used for the "your story" functionality
	if (error) {
		data = {
			//@ts-expect-error
			user: {
				id: "unauthenticated user",
			},
		}
	}

	const bookmark = await getBookmarksId(data?.user?.id!!)

	//@ts-expect-error
	let storyCount = parseInt(searchParams.stories) // make sure its an int

	if (!storyCount) {
		storyCount = 20
	}

	const { mostPopular, recentStories } = await getScenarios({ storyCount })

	return (
		<div className="container h-[90vh] overflow-hidden p-4 flex flex-row max-lg:flex-col mx-auto text-2xl">
			<div className="flex flex-col w-full mx-auto">
				<h2
					style={{ textShadow: "0em 0em 0.6em white" }}
					className="text-2xl font-bold text-center"
				>
					Most popular
				</h2>
				<ScrollArea className="w-full mt-2">
					<div className="py-5 top-0 h-[80vh]">
						{mostPopular?.map(async (scenario) => (
							<ScenarioCard
								key={scenario.id}
								currentUser={data}
								data={await getUserInfo(scenario?.user_id)}
								scenario={scenario}
								bookmark={bookmark.includes(scenario.id) ? true : false}
							/>
						))}
						<Link href={`/app?stories=${storyCount + 20}`}>
							<div className="flex mt-5">
								<Button className="mx-auto">Show More</Button>
							</div>
						</Link>
						<div className="pb-20"></div>
					</div>
				</ScrollArea>
			</div>
			<div className="flex flex-col w-full mx-auto">
				<h2
					style={{ textShadow: "0em 0em 0.6em white" }}
					className="text-2xl font-bold text-center"
				>
					New stories
				</h2>
				<ScrollArea className="w-full mt-2">
					<div className="py-5 top-0 h-[80vh]">
						{recentStories?.map(async (scenario, index) => (
							<ScenarioCard
								currentUser={data}
								data={await getUserInfo(scenario.user_id)}
								key={scenario.id}
								scenario={scenario}
								bookmark={bookmark.includes(scenario.id) ? true : false}
							/>
						))

						}
						<Link href={`/app?stories=${storyCount + 20}`}>
							<div className="flex mt-5">
								<Button className="mx-auto">Show More</Button>
							</div>
						</Link>
						<div className="pb-20"></div>
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}
