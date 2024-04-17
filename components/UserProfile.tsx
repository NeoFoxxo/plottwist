"use client"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"

type PROFILE_DATA_TYPES = {
	profileData: {
		bio: string
		links?: string[]
		created_at: string
		email: string
		id: number
		image: string | null
		name: string | null
		user_id: string
	}
	date: string
	stories: number
}

export default function UserProfile({
	profileData,
	date,
	stories,
}: PROFILE_DATA_TYPES) {
	const { name, image, email, created_at, bio } = profileData

	const accountInfo = [stories, 20, 570]
	const texts = ["Stories", "Stars", "Bookmarks"]
	const defaultImage = `/icons/pfp${Math.floor(Math.random() * 5) + 1}.png`

	return (
		<div className="overflow-hidden">
			<div className="container flex flex-row justify-around w-full h-[80vh] overflow-auto">
				<CardContainer className="inter-var">
					<CardBody className="w-auto m-4 bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/30 dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-9 border ">
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
				<CardContainer className="inter-var">
					<CardBody className="flex flex-1 flex-col w-full h-auto bg-gray-50 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/30 dark:border-white/[0.2] border-black/[0.1] rounded-xl p-7 border">
						<CardItem translateZ={"60"}>
							<Textarea
								onKeyDown={() => {
									;("")
								}}
								className="h-30 w-[27.47rem] text-left resize-none"
								placeholder="Bio"
							>
								{bio
									? bio
									: `We don't have a description for ${name} yet.\nBut we're pretty sure that they're really cool!`}
							</Textarea>
						</CardItem>
						<div className="grid grid-cols-2 gap-6 pt-6">
							<CardItem translateZ={"46"}>
								<Input
									className="w-full p-2 bg-transparent"
									placeholder="name"
								/>
							</CardItem>
							<CardItem translateZ={"46"}>
								<Input
									className="w-full p-2 bg-transparent"
									placeholder="url"
								/>
							</CardItem>
							<CardItem translateZ={"34"}>
								<Input
									className="w-full p-2 bg-transparent"
									placeholder="name"
								/>
							</CardItem>
							<CardItem translateZ={"34"}>
								<Input
									className="w-full p-2 bg-transparent"
									placeholder="url"
								/>
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
			</div>
		</div>
	)
}
