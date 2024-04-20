import { createClient } from "@/utils/supabase/client"
import imageCompression from "browser-image-compression"

async function compressImage(file: File) {
	const options = {
		maxSizeMB: 3,
		useWebWorker: true,
	}
	try {
		const compressedFile = await imageCompression(file, options)
		return compressedFile
	} catch (error) {
		throw Error("Image compression failed, please try again")
	}
}

export default async function imageUpload(file: File, user_id: string) {
	const supabase = createClient()
	const pathPrefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

	// check if user has an existing image
	const { data: existingImage } = await supabase.storage
		.from("avatars")
		.list(user_id)

	// delete existing image if it exists
	if (existingImage!![0]) {
		// yes we could use update here but it would require a page refresh due to the image cache
		const { error: deleteErr } = await supabase.storage
			.from("avatars")
			.remove([user_id + "/" + existingImage!![0].name])
		if (deleteErr)
			throw new Error("Could not delete profile Image: ", deleteErr)
	}

	const fileNamePrefix: string = Date.now().toString()
	const fileName: string = user_id + "/" + `profile_${fileNamePrefix}`

	if (!pathPrefix) throw Error(".env for Storage URL not found!")

	const compressedFile = await compressImage(file)

	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(fileName, compressedFile)

	if (error) throw new Error("Could upload image: ", error)
	return pathPrefix + "/" + data.path
}
