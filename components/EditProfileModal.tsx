"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import imageUpload from "@/utils/actions/database/imageUpload"
import { updateProfile } from "@/utils/actions/database/updateProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const profileSchema = z.object({
	name: z
		.string()
		.min(2, "Username should be at least 2 characters")
		.max(20, "Username must be shorter than 20 characters")
		.refine(
			(value) => !/[^a-zA-Z0-9]/.test(value ?? ""),
			"Username can only contain letters and numbers"
		),

	bio: z.string().max(80, "Max length of bio is 80").optional(),
	link1: z.string().max(40, "Max length of link is 40").optional(),
	link2: z.string().max(40, "Max length of link is 40").optional(),
	link3: z.string().max(40, "Max length of link is 40").optional(),
	link4: z.string().max(40, "Max length of link is 40").optional(),
})

interface EditProfileModalProps {
	profileData: {
		admin: boolean
		bio: string | null
		links?: string[] | null
		created_at: string
		email: string
		id: number
		image: string | null
		name: string | null
		user_id: string
	}
	userId: string | undefined
}

export default function EditProfileModal({
	profileData,
	userId,
}: EditProfileModalProps) {
	const defaultImage = `/icons/pfp${Math.floor(Math.random() * 5) + 1}.png`
	const [pending, setPending] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const { name, image, bio, user_id, links } = profileData
	const [localImage, setLocalImage] = useState(image)
	const [file, setFile] = useState<File | null>(null)
	const router = useRouter()

	const profileForm = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: name!!,
			bio: bio!!,
			link1: links!![0] !== undefined ? links!![0] : "",
			link2: links!![1] !== undefined ? links!![1] : "",
			link3: links!![2] !== undefined ? links!![2] : "",
			link4: links!![3] !== undefined ? links!![3] : "",
		},
	})

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		setErrorMessage("")
		if (!e.target.files) return "File selection failed!"

		if (!e.target.files[0].type.startsWith("image/")) {
			setErrorMessage("File provided was not an image")
			return
		}
		const selectedFile = e.target.files?.[0]

		if (!selectedFile) {
			setErrorMessage("File attach failed")
			return
		}

		if (selectedFile.size > 20000000) {
			setErrorMessage("Image cannot be larger than 20mb!")
			return
		}

		const url = URL.createObjectURL(selectedFile)
		setLocalImage(url)
		setFile(selectedFile)
	}

	async function onSubmit(profileData: z.infer<typeof profileSchema>) {
		let imgUrl: string | null = null
		setPending(true)
		setErrorMessage("")
		setSuccessMessage("")
		try {
			if (file) {
				try {
					const path = await imageUpload(file, user_id)
					if (path) imgUrl = path
				} catch (error) {
					setPending(false)
					setErrorMessage(String(error))
				}
			}
			const links = [
				profileData.link1,
				profileData.link2,
				profileData.link3,
				profileData.link4,
			].filter((link): link is string => link != "") // check if link is string and not empty

			if (imgUrl) {
				await updateProfile({
					profileData: {
						name: profileData.name!!,
						normalised_name: profileData.name!!.toLowerCase(),
						image: imgUrl,
						bio: profileData.bio!!,
						links: links,
					},
					user_id: user_id,
				})
			} else {
				await updateProfile({
					profileData: {
						name: profileData.name!!,
						normalised_name: profileData.name!!.toLowerCase(),
						bio: profileData.bio!!,
						links: links,
					},
					user_id: user_id,
				})
			}
			if (name != profileData.name) {
				router.push("/profile/" + profileData.name.toLowerCase())
			} else {
				router.refresh()
			}
			setPending(false)
			setSuccessMessage("Profile successfully updated!")
		} catch (error) {
			router.refresh()
			setPending(false)
			setErrorMessage(String(error))
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{userId === profileData.user_id ? (
					<Button variant="outline">Edit Profile</Button>
				) : null}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here.
						<br /> Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<Form {...profileForm}>
					<form
						onSubmit={profileForm.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<div className="flex items-center justify-center gap-5 p-5">
							<img
								src={localImage ? localImage!! : defaultImage!!}
								alt="default-user"
								className="rounded-full w-10 h-10 md:w-28 md:h-28 transition-all hover:shadow-[0em_0em_1em_rgba(255,255,255,0.8)] cursor-pointer"
							/>
							<input
								type="file"
								id="user-file"
								name="user-file"
								accept="image/*"
								style={{ display: "none" }}
								onChange={handleImageUpload}
							/>
							<label
								htmlFor="user-file"
								className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer user-edit whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
							>
								Change Image
							</label>
						</div>
						<FormField
							control={profileForm.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											onKeyDown={() => {
												; ("")
											}}
											className="w-full text-left resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<FormField
							control={profileForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<div className="grid grid-cols-2 gap-6">
							<FormField
								control={profileForm.control}
								name="link1"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-full p-2 bg-transparent"
												{...field}
												placeholder={"https://"}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<FormField
								control={profileForm.control}
								name="link2"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-full p-2 bg-transparent"
												{...field}
												placeholder={"https://"}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<FormField
								control={profileForm.control}
								name="link3"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-full p-2 bg-transparent"
												{...field}
												placeholder={"https://"}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
							<FormField
								control={profileForm.control}
								name="link4"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className="w-full p-2 bg-transparent"
												{...field}
												placeholder={"https://"}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							></FormField>
						</div>
						<DialogFooter>
							{pending ? (
								<Loader2 className="animate-spin" />
							) : (
								<Button type="submit">Save changes</Button>
							)}
						</DialogFooter>
						{errorMessage && <p className="text-red-600 ">{errorMessage}</p>}
						{successMessage && (
							<p className="text-green-500 ">{successMessage}</p>
						)}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
