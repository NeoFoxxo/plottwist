import { createClient } from "@/utils/supabase/client"

export default async function imageUpload(
	file: File,
	user_id: string,
	existingImage: boolean
) {
	console.log(user_id)
	const supabase = createClient()
	const pathPrefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

	// delete existing image if it exists
	if (existingImage) {
		const { data: currentImage, error } = await supabase.storage
			.from("avatars")
			.list(user_id)

		if (error) throw new Error("Could find existingImage: ", error)

		// yes we could use update here but it would require a page refresh due to the image cache
		const { error: deleteErr } = await supabase.storage
			.from("avatars")
			.remove([user_id + "/" + currentImage!![0].name])
		if (deleteErr)
			throw new Error("Could not delete profile Image: ", deleteErr)
	}

	const fileNamePrefix: string = Date.now().toString()
	const fileName: string = user_id + "/" + `profile_${fileNamePrefix}`

	if (!pathPrefix) throw Error(".env for Storage URL not found!")

	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(fileName, file)

	if (error) throw new Error("Could upload image: ", error)
	return pathPrefix + "/" + data.path
}
