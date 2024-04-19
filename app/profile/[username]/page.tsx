import NotFound from "@/app/not-found"
import UserProfile from "@/components/UserProfile"
import getUserInfoByName from "@/utils/actions/database/getUserinfoByName"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Profile({
	params,
}: {
	params: { username: string }
}) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")

	// check it is over 20 characters and if it contains characters that are not letters and numbers
	if (params.username.length > 20 || /[^a-zA-Z0-9]/.test(params.username)) {
		return <NotFound />
	}

	const userInfo = await getUserInfoByName(params.username.toLowerCase())

	if (userInfo === 404) {
		return <NotFound />
	}

	return (
		<div className="flex flex-col items-center flex-1 w-full m-4 text-2xl">
			<UserProfile
				storyCount={userInfo.storyCount}
				profileData={userInfo.profile}
				date={userInfo.date}
				userId={user?.id}
			/>
		</div>
	)
}
