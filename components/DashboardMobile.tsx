import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScenarioCard } from "./ScenarioCard"
import { getScenarioData } from "@/utils/getScenarioData"
import ShowMoreButton from "./ShowMoreButton"

export interface story {
	choices: string[] | null
	created_at: string
	finished: boolean | null
	story_part_count: number
	id: number
	prompt: string | null
	published: boolean | null
	pinned: boolean | null
	story: string | null
	title: string
	user_id: string
}

export default async function DashboardMobile({
	mostPopular,
	recentStories,
	userData,
	bookmark,
	recentStoriesCount,
	mostPopularCount,
}: {
	mostPopular: story[]
	recentStories: story[]
	userData: any
	bookmark: number[]
	recentStoriesCount: number
	mostPopularCount: number
}) {
	// fetch all data at once so that we dont have any undefined errors
	const { mostPopularData, recentStoriesData } = await getScenarioData(
		mostPopular,
		recentStories
	)
	return (
		<div className="md:hidden container flex flex-row justify-end p-4 text-2xl gap-x-20 max-xl:gap-x-8 max-lg:flex-col">
			<Tabs defaultValue="popular">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="popular">Most Popular</TabsTrigger>
					<TabsTrigger value="new">New Stories</TabsTrigger>
				</TabsList>
				<TabsContent value="popular">
					<ScrollArea className="w-full mt-2">
						<div className="py-5 top-0 h-[80vh]">
							{mostPopularData?.map((data, index) => (
								<ScenarioCard
									key={mostPopular[index].id}
									currentUser={userData}
									data={data.userInfo}
									scenario={mostPopular[index]}
									bookmark={bookmark.includes(mostPopular[index].id)}
									bookmarkCount={data.bookmarkCount}
									commentCount={data.commentCount}
								/>
							))}
							<ShowMoreButton
								storyCount={mostPopularCount}
								section="mostPopular"
							/>

							<div className="pb-20"></div>
						</div>
					</ScrollArea>
				</TabsContent>
				<TabsContent value="new">
					<ScrollArea className="w-full mt-2">
						<div className="flex flex-col top-0 h-[80vh]">
							{recentStoriesData?.map((data, index) => (
								<ScenarioCard
									key={recentStories[index].id}
									currentUser={userData}
									data={data.userInfo}
									scenario={recentStories[index]}
									bookmark={bookmark.includes(recentStories[index].id)}
									bookmarkCount={data.bookmarkCount}
									commentCount={data.commentCount}
								/>
							))}
							<ShowMoreButton
								storyCount={recentStoriesCount}
								section="recentStories"
							/>
							<div className="pb-20"></div>
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	)
}
