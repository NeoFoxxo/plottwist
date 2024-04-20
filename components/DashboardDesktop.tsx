import getUserInfo from "@/utils/actions/database/getUserinfo"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "lucide-react"
import { story } from "./DashboardMobile"
import { ScenarioCard } from "./ScenarioCard"
import { Button } from "./ui/button"

export default function DashboardDesktop({
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
								currentUser={userData}
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
								currentUser={userData}
								data={await getUserInfo(scenario.user_id)}
								key={scenario.id}
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
		</div>
	)
}
