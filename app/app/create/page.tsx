import CreatePrompt from "@/components/CreatePrompt"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function Create() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const user_id = user?.id
	if (!user_id) redirect("/login")

	return (
		<main className="flex flex-col items-center justify-start flex-1 w-full my-4 md:p-10 md:w-fit">
			<CreatePrompt />
		</main>
	)
}
