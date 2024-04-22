import { LibraryCard } from "@/components/LibraryCard"
import { PaginationOnLibrary } from "@/components/PaginationOnLibrary"
import getPinnedStories from "@/utils/actions/database/getPinnedStories"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Library() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")
	const pinnedStories = await getPinnedStories(user_id)

	return (
		<main className="flex flex-col items-center justify-start w-full my-4 md:p-5 md:w-fit">
			<h1
				style={{ textShadow: "0em 0em 0.6em white" }}
				className="text-3xl font-bold text-center"
			>
				Your Stories
			</h1>
			<section className="pt-0">
				<div className="flex flex-col md:flex-row">
					{pinnedStories?.map((pinnedStory) => (
						<div className="py-20" key={pinnedStory.id}>
							<LibraryCard scenario={pinnedStory} />
							<div className="mb-16  md:mb-0"></div>
						</div>
					))}
				</div>
			</section>
			<PaginationOnLibrary userId={user_id} />
		</main>
	)
}
