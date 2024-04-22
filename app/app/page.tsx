import DashboardDesktop from "@/components/DashboardDesktop"
import DashboardMobile from "@/components/DashboardMobile"
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"

type DashboardProps = {
	searchParams: { mostPopularCount: string; recentStoryCount: string }
}

export const metadata: Metadata = {
	title: `Dashboard`,
	description: `Discover the most popular and recently published interactive stories on Plot Twist, a unique platform to create interactive stories where your choices shape the narrative. Join Plot Twist today and unlock your storytelling potential.`,
}

export default async function Dashboard({ searchParams }: DashboardProps) {
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
			<div className="hidden md:block">
				<DashboardDesktop
					mostPopular={mostPopular}
					recentStories={recentStories}
					userData={data}
					bookmark={bookmark}
					mostPopularCount={mostPopularCount}
					recentStoriesCount={recentStoriesCount}
				/>
			</div>
		</div>
	)
}
