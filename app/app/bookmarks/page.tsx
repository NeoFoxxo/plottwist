import { PaginateBookmarks } from "@/components/PaginationBookmarks"
import getUserInfo from "@/utils/actions/database/getUserinfo"
import { createClient } from "@/utils/supabase/server"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Bookmarks",
	description: "View your bookmarked stories on Plot Twist",
}

export default async function Bookmarks() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")

	return (
		<div className="flex flex-col items-center justify-center w-full gap-10">
			<h2
				style={{ textShadow: "0em 0em 0.6em white" }}
				className="text-3xl font-bold"
			>
				Bookmarks
			</h2>
			<PaginateBookmarks userId={user_id} />
		</div>
	)
}
