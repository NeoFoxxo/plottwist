import DashboardDesktop from "@/components/DashboardDesktop"
import DashboardMobile from "@/components/DashboardMobile"
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import { createClient } from "@/utils/supabase/server"

export default async function Dashboard({
	searchParams,
}: {
	searchParams: { mostPopularCount: string; recentStoryCount: string }
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

	// make sure its an int
	let mostPopularCount = parseInt(searchParams.mostPopularCount)
	let recentStoriesCount = parseInt(searchParams.recentStoryCount)

	if (!mostPopularCount || mostPopularCount < 10) {
		mostPopularCount = 10
	}

	if (!recentStoriesCount || recentStoriesCount < 10) {
		recentStoriesCount = 10
	}

	const { mostPopular, recentStories } = await getScenarios({
		mostPopularCount,
		recentStoriesCount,
	})

	return (
		<div>
			<div className="md:hidden">
				<DashboardMobile
					mostPopular={mostPopular}
					recentStories={recentStories}
					userData={data}
					bookmark={bookmark}
					mostPopularCount={mostPopularCount}
					recentStoriesCount={recentStoriesCount}
				/>
			</div>
			<DashboardDesktop
				mostPopular={mostPopular}
				recentStories={recentStories}
				userData={data}
				bookmark={bookmark}
				mostPopularCount={mostPopularCount}
				recentStoriesCount={recentStoriesCount}
			/>
		</div>
	)
}
