import { createClient } from "@/utils/supabase/server"
import { ScenarioCard } from "@/components/ScenarioCard"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import getUserInfo from "@/utils/actions/database/getUserinfo"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function Dashboard() {
	const supabase = createClient()

	const { data, error: authError } = await supabase.auth.getUser()

	const { mostPopular, recentStories } = await getScenarios()

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
								data={await getUserInfo(scenario.user_id)}
								scenario={scenario}
							/>
						))}
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
							/>
						))}
						<div className="pb-20"></div>
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}
