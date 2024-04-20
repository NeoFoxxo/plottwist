import getUserInfo from "@/utils/actions/database/getUserinfo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScenarioCard } from "./ScenarioCard"
import ShowMoreButton from "./ShowMoreButton"

export interface story {
	choices: string[] | null
	created_at: string
	finished: boolean | null
	follow_count: number
	id: number
	prompt: string | null
	published: boolean | null
	pinned: boolean | null
	story: string | null
	title: string
	user_id: string
}

export default function DashboardMobile({
	mostPopular,
	recentStories,
	userData,
	bookmark,
	storyCount,
}: {
	mostPopular: story[]
	recentStories: story[]
	userData: any
	bookmark: number[]
	storyCount: number
}) {
	return (
		<div className="md:hidden container flex flex-row justify-end p-4 text-2xl gap-x-20 max-xl:gap-x-8 max-lg:flex-col">
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
									currentUser={userData}
									data={await getUserInfo(scenario?.user_id)}
									scenario={scenario}
									bookmark={bookmark.includes(scenario.id) ? true : false}
								/>
							))}
							<ShowMoreButton storyCount={storyCount} />
							<div className="pb-20"></div>
						</div>
					</ScrollArea>
				</TabsContent>
				<TabsContent value="popular">
					<ScrollArea className="w-full mt-2">
						<div className="py-5 top-0 h-[80vh]">
							{recentStories?.map(async (scenario) => (
								<ScenarioCard
									currentUser={userData}
									data={await getUserInfo(scenario.user_id)}
									key={scenario.id}
									scenario={scenario}
									bookmark={bookmark.includes(scenario.id) ? true : false}
								/>
							))}
							<ShowMoreButton storyCount={storyCount} />
							<div className="pb-20"></div>
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	)
}
