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
		<main className="flex flex-col flex-1 my-4 md:p-10 justify-start items-center w-full md:w-fit">
			<h1
				style={{
					fontFamily: '"Poppins", sans-serif',
					textShadow: "0em 0em 0.3em rgba(100,240,230,1)",
				}}
				className="text-4xl font-bold text-center"
			>
				Your Stories
			</h1>
		</main>
	)
}
