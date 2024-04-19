import { createClient } from "@/utils/supabase/server"
import { ScenarioCard } from "@/components/ScenarioCard"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import getUserInfo from "@/utils/actions/database/getUserinfo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBookmarks } from "@/utils/actions/database/getBookmarks"
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
		<div className="container flex flex-row justify-end p-4 text-2xl gap-x-20 max-xl:gap-x-8 max-lg:flex-col">
			<Tabs defaultValue="popular">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="popular">Most Popular</TabsTrigger>
					<TabsTrigger value="new">New Stories</TabsTrigger>
				</TabsList>
				<TabsContent value="new">
					<ScrollArea className="w-full mt-2">
						<div className="flex flex-col top-0 h-[80vh]">
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
				</TabsContent>
				<TabsContent value="popular">
					<ScrollArea className="w-full mt-2">
						<div className="py-5 top-0 h-[80vh]">
							{recentStories?.map(async (scenario) => (
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
				</TabsContent>
			</Tabs>
			{/* <div className="flex flex-col w-full mx-auto">
				<h2
					style={{ textShadow: "0em 0em 0.6em white" }}
					className="text-2xl font-bold text-center"
				>
					Most popular
				</h2>
				
			</div> */}
			{/* <div className="flex flex-col w-full mx-auto">
				<h2
					style={{ textShadow: "0em 0em 0.6em white" }}
					className="text-2xl font-bold text-center"
				>
					New stories
				</h2>
		
			</div> */}
		</div>
	)
}
