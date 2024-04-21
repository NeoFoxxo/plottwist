import { ScrollArea } from "@/components/ui/scroll-area"
import { story } from "./DashboardMobile"
import { ScenarioCard } from "./ScenarioCard"
import { getScenarioData } from "@/utils/getScenarioData"
import ShowMoreButton from "./ShowMoreButton"

export default async function DashboardDesktop({
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
		<div className="container h-[90vh] overflow-hidden p-4 gap-8 flex flex-row max-lg:flex-col mx-auto text-2xl">
			<div className="flex flex-col w-full mx-auto">
				<h2
					style={{ textShadow: "0em 0em 0.6em white" }}
					className="text-2xl font-bold text-center"
				>
					Most popular
				</h2>
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
			</div>
		</div>
	)
}
