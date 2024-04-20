import { createClient } from "@/utils/supabase/server"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId"
import DashboardMobile from "@/components/DashboardMobile"
import DashboardDesktop from "@/components/DashboardDesktop"
import { getDashboardData } from "@/utils/getDashboardData"

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
				id: "no user",
			},
		}
	}

	const bookmark = await getBookmarksId(data?.user?.id!!)

	//@ts-expect-error
	let storyCount = parseInt(searchParams.stories) // make sure its an int

	if (!storyCount) {
		storyCount = 10
	}
	const { mostPopular, recentStories } = await getScenarios({ storyCount })

	return (
		<div>
			<div className="md:hidden">
				<DashboardMobile
					mostPopular={mostPopular}
					recentStories={recentStories}
					userData={data}
					bookmark={bookmark}
					storyCount={storyCount}
				/>
			</div>
			<DashboardDesktop
				mostPopular={mostPopular}
				recentStories={recentStories}
				userData={data}
				bookmark={bookmark}
				storyCount={storyCount}
			/>
		</div>
	)
}
