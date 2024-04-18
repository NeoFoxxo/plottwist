"use client"
import { Input } from "@/components/ui/input"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import EditProfileModal from "./EditProfileModal"
import { Textarea } from "./ui/textarea"

interface UserProfileProps {
	profileData: {
		bio: string
		links?: string[] | undefined
		created_at: string
		email: string
		id: number
		image: string | null
		name: string | null
		user_id: string
	}
	date: string
	storyCount: number | null
}

export default function UserProfile({
	profileData,
	date,
	storyCount,
}: UserProfileProps) {
	const { name, image, email, bio, links } = profileData

	const accountInfo = [storyCount, 20, 570]
	const texts = ["Stories", "Stars", "Bookmarks"]
	const defaultImage = `/icons/pfp${Math.floor(Math.random() * 5) + 1}.png`
	const linkRegex = /^https?:\/\//

	function makeLink(link: string) {
		// check if link starts with https:// or http://
		if (linkRegex.test(link)) {
			return link
		} else {
			let cleanLink = `https://${link}`
			return cleanLink
		}
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
									className="rounded-full w-10 h-10 md:w-28 md:h-28 transition-all hover:shadow-[0em_0em_1em_rgba(255,255,255,0.8)] cursor-pointer"
								/>
							</CardItem>
							<CardItem translateZ="60">
								<h4
									style={{ textShadow: "0em 0em 0.4em white" }}
									className="text-3xl font-bold"
								>
									{name ? name : "Default Name"}
								</h4>
								<p className="text-sm md:text-[1.15rem] text-gray-500">
									{email}
								</p>
							</CardItem>
						</div>
						<div className="flex gap-3 pt-3.5">
							{accountInfo.map((info: any, index) => (
								<CardItem translateZ="40">
									<div className="flex items-center flex-col md:flex-row gap-2">
										<span
											style={{ textShadow: "0em 0em 0.4em white" }}
											className="text-[1.2rem] md:text-xl font-bold"
										>
											{info}
										</span>
										<span className="text-sm font-light text-neutral-300">
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
						<CardItem translateZ={"60"} className="w-full">
							<h3 className="text-[1.2rem] md:text-xl font-bold pb-1">
								Username:
							</h3>
							<Input className="bg-transparent" value={name!!} disabled />
						</CardItem>
						<CardItem translateZ={"60"} className="w-full">
							<h3 className="text-[1.2rem] md:text-xl font-bold pb-1">Bio:</h3>
							<Textarea
								className="text-start bg-transparent w-full resize-none"
								value={bio}
								disabled
							/>
						</CardItem>
						<CardItem translateZ={"60"}>
							<h3 className="text-[1.2rem] md:text-xl font-bold pb-1">
								Links:
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-6 py-4">
								{links?.map((singleLink) => {
									const cleanLink = makeLink(singleLink)
									return (
										<a
											href={cleanLink}
											className="hover:text-green-400 p-2 rounded-md border border-input text-xs md:text-sm w-full bg-transparent"
										>
											{cleanLink}
										</a>
									)
								})}
							</div>
						</CardItem>
						<CardItem translateZ={"40"}>
							<EditProfileModal profileData={profileData} />
						</CardItem>
					</CardBody>
				</CardContainer>
			</div>
		</div>
	)
}
