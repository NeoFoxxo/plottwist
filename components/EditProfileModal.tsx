"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { updateProfile } from "@/utils/actions/database/updateProfile"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const profileSchema = z.object({
	name: z.string().min(2, "Username should be at least 2 characters"),
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
}

export default function EditProfileModal({
	profileData,
}: EditProfileModalProps) {
	const [pending, setPending] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const { name, bio, user_id, links } = profileData
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

	async function onSubmit(profileData: z.infer<typeof profileSchema>) {
		setPending(true)
		try {
			const links = [
				profileData.link1,
				profileData.link2,
				profileData.link3,
				profileData.link4,
			].filter((link): link is string => link != "") // check if link is string and not empty

			await updateProfile({
				profileData: {
					name: profileData.name!!,
					bio: profileData.bio!!,
					links: links,
				},
				user_id: user_id,
			})
			setSuccessMessage("Profile successfully updated!")
			setPending(false)
		} catch (error) {
			setErrorMessage(String(error))
			setPending(false)
		}
		router.refresh()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
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
						<FormField
							control={profileForm.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											onKeyDown={() => {
												;("")
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
						{errorMessage && <p className=" text-red-600">{errorMessage}</p>}
						{successMessage && (
							<p className=" text-green-500">{successMessage}</p>
						)}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
