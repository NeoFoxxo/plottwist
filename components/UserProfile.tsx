"use client"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { updateProfile } from "@/utils/actions/database/updateProfile"

type PROFILE_DATA_TYPES = {
	profileData: {
		bio: string
		links: string[] | null
		created_at: string
		email: string
		id: number
		image: string | null
		name: string
		user_id: string
	}
	date: string
	stories: number
}

const profileSchema = z.object({
	name: z.string().min(2, "Username should be at least 2 characters"),
	bio: z.string().max(80, "Max length of bio is 80"),
	links: z.array(z.string().regex(/^https:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/, "Link is not valid"))
})

export default function UserProfile({
	profileData,
	date,
	stories,
}: PROFILE_DATA_TYPES) {
	const { name, image, email, bio, links } = profileData;

	const accountInfo = [stories, 20, 570]
	const texts = ["Stories", "Stars", "Bookmarks"]
	const defaultImage = `/icons/pfp${Math.floor(Math.random() * 5) + 1}.png`
	const newLinks: string[] = [];

	const profileForm = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: name,
			bio: bio,
			links: []
		},
	})

	function onSubmit(values: z.infer<typeof profileSchema>) {
		// An error occurs after invoking the function
		// if (newLinks == links) {
		// 	updateProfile(values);
		// } else {
		// 	const name = values.name;
		// 	const bio = values.bio;
		// 	const newProfile = { name, bio, newLinks };
		// 	updateProfile(newProfile);
		// }
	}

	function link(link: any, value: any) {
		newLinks[link] = value;
	}

	return (
		<div className="overflow-hidden">
			<div className="container flex items-start justify-center w-full gap-4 max-lg:flex-col">
				<CardContainer className="py-0 inter-var">
					<CardBody className="w-auto bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/30 dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-9 border ">
						<div className="flex items-center justify-start gap-6">
							<CardItem translateZ="50">
								<img
									src={image ? image!! : defaultImage!!}
									alt="default-user"
									className="rounded-full w-28 h-28 transition-all hover:shadow-[0em_0em_1em_rgba(255,255,255,0.8)] cursor-pointer"
								/>
							</CardItem>
							<CardItem translateZ="60">
								<h4
									style={{ textShadow: "0em 0em 0.4em white" }}
									className="text-3xl font-bold"
								>
									{name ? name : "Default Name"}
								</h4>
								<p className="text-[1.15rem] text-gray-500">{email}</p>
							</CardItem>
						</div>
						<div className="flex gap-3 pt-3.5">
							{accountInfo.map((info: any, index) => (
								<CardItem translateZ="40">
									<div className="flex items-center gap-2">
										<span
											style={{ textShadow: "0em 0em 0.4em white" }}
											className="text-xl font-bold"
										>
											{info}
										</span>
										<span className="text-lg font-light text-neutral-300">
											{texts[index]}
										</span>
									</div>
								</CardItem>
							))}
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="py-0 inter-var">
					<CardBody className="flex flex-1 flex-col gap-4 w-full h-auto bg-gray-50 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/30 dark:border-white/[0.2] border-black/[0.1] rounded-xl p-7 border">
						<CardItem translateZ={"60"}>
							<p
								onKeyDown={() => {
									; ("")
								}}
								className="max-w-md text-xl text-left h-30"
							>
								{bio}
							</p>
						</CardItem>
						<CardItem translateZ={"60"} className="w-full">
							<Input
								className="bg-transparent"
								value={name!!}
								disabled
							/>
						</CardItem>
						<CardItem translateZ={"60"}>
							<div className="grid grid-cols-2 gap-6">
								<Input
									className="w-full bg-transparent"
									value={links!![0] || "No specified url"}
									disabled
								/>
								<Input
									className="w-full bg-transparent"
									value={links!![1] || "No specified url"}
									disabled
								/>
								<Input
									className="w-full bg-transparent"
									value={links!![2] || "No specified url"}
									disabled
								/>
								<Input
									className="w-full bg-transparent"
									value={links!![3] || "No specified url"}
									disabled
								/>
							</div>
						</CardItem>
						<CardItem translateZ={"40"}>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline">Edit Profile</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Edit profile</DialogTitle>
										<DialogDescription>
											Make changes to your profile here.<br /> Click save when you're done.
										</DialogDescription>
									</DialogHeader>
									<Form {...profileForm}>
										<form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-4">
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
												)}>
											</FormField>
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
												)}>
											</FormField>
											<div className="grid grid-cols-2 gap-6">
												<FormField
													control={profileForm.control}
													name="links"
													render={() => (
														<FormItem>
															<FormControl>
																<Input
																	className="w-full p-2 bg-transparent"
																	placeholder={"https://"}
																	onKeyDown={(e) => { link(0, e) }}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}>
												</FormField>
												<FormField
													control={profileForm.control}
													name="links"
													render={() => (
														<FormItem>
															<FormControl>
																<Input
																	className="w-full p-2 bg-transparent"
																	placeholder={"https://"}
																	onKeyDown={(e) => { link(1, e) }}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}>
												</FormField>
												<FormField
													control={profileForm.control}
													name="links"
													render={() => (
														<FormItem>
															<FormControl>
																<Input
																	className="w-full p-2 bg-transparent"
																	placeholder={"https://"}
																	onKeyDown={(e) => { link(2, e) }}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}>
												</FormField>
												<FormField
													control={profileForm.control}
													name="links"
													render={() => (
														<FormItem>
															<FormControl>
																<Input
																	className="w-full p-2 bg-transparent"
																	placeholder={"https://"}
																	onKeyDown={(e) => { link(3, e) }}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}>
												</FormField>
											</div>
											<DialogFooter>
												<Button type="submit">Save changes</Button>
											</DialogFooter>
										</form>
									</Form>
								</DialogContent>
							</Dialog>
						</CardItem>
					</CardBody>
				</CardContainer>
			</div >
		</div >
	)
}
