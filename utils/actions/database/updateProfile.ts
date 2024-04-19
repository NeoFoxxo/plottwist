import { createClient } from "@/utils/supabase/client"

export interface UpdateProfileProps {
	profileData: {
		name: string
		normalised_name: string
		image?: string
		bio: string
		links: string[]
	}
	user_id: string
}

export async function updateProfile({
	profileData,
	user_id,
}: UpdateProfileProps) {
	const supabase = createClient()

	const { error } = await supabase
		.from("profiles")
		.update(profileData)
		.eq("user_id", user_id)

	if (error) {
		if (error.code === "23505") {
			throw new Error(`Username already taken!`)
		}
		throw new Error(`Profile update failed: ${error.code}`)
	}

	return { message: "Profile updated successfully!" }
}
