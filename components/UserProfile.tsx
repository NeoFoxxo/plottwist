"use client"
import { story } from "@/components/DashboardMobile"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import EditProfileModal from "./EditProfileModal"
import StarButton from "./StarButton"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { Textarea } from "./ui/textarea"
import { ProfileCard } from "./ProfileCard"
import { simplifyNumber } from "@/utils/simplifyNumber"

interface UserProfileProps {
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
		star_count: number
	}
	storyCount: number | null
	userId: string | undefined
	hasStarred: boolean
	stories: story[]
	userTotalBookmarks: number
}

export default function UserProfile({
	profileData,
	hasStarred,
	storyCount,
	userId,
	stories,
	userTotalBookmarks,
}: UserProfileProps) {
	const { name, image, email, bio, links, admin, user_id } = profileData

	const accountInfo = [
		simplifyNumber(storyCount!!),
		simplifyNumber(profileData.star_count),
		simplifyNumber(userTotalBookmarks),
	]
	const texts = ["Stories", "Stars", "Bookmarks"]
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
				<CardContainer className="py-0 md:py-10 inter-var">
					<CardBody className="w-auto bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/30 dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-9 border ">
						<div className="flex items-center justify-start gap-6">
							<CardItem translateZ="50">
								<img
									src={image!!}
									width={250}
									height={250}
									alt="User Profile Image"
									className={
										"rounded-full w-10 h-10 md:w-28 md:h-28 transition-all hover:shadow-[0em_0em_1em_rgba(255,255,255,0.8)]"
									}
								/>
							</CardItem>
							<CardItem translateZ="60">
								<div className="flex flex-row">
									<h4
										style={{
											textShadow: "0em 0em 0.4em white",
										}}
										className="text-3xl font-bold"
									>
										{name ? name : "Default Name"}
									</h4>
									{admin && (
										<img
											src="/icons/admin.png"
											width={25}
											height={25}
											alt="admin icon"
											className="w-5 h-5 ml-2 my-auto"
										/>
									)}
								</div>
								<p className="text-sm md:text-[1.15rem] text-gray-500">
									{email}
								</p>
							</CardItem>
						</div>
						<div className="flex gap-3 pt-3.5 justify-between">
							{accountInfo.map((info: any, index) => (
								<CardItem translateZ="40" key={index}>
									<div className="flex flex-col items-center gap-2 md:flex-row">
										<span
											style={{
												textShadow: "0em 0em 0.4em white",
											}}
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
							{userId !== user_id && userId != "no user" && (
								<StarButton
									hasStarred={hasStarred}
									authorId={profileData.user_id!!}
									userId={userId!!}
								/>
							)}
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="py-0 md:py-10 inter-var flex w-full">
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
								className="w-full bg-transparent resize-none text-start"
								value={bio!!}
								disabled
							/>
						</CardItem>
						{links!![0] ? (
							<CardItem translateZ={"60"}>
								<h3 className="text-[1.2rem] md:text-xl font-bold pb-1">
									Links:
								</h3>
								<div className="grid grid-cols-1 gap-6 py-4 mx-auto md:grid-cols-2">
									{links?.map((singleLink, index) => {
										const cleanLink = makeLink(singleLink)
										return (
											<Link
												key={index}
												href={cleanLink}
												className="w-full p-2 text-xs bg-transparent border rounded-md hover:text-green-400 border-input md:text-sm"
											>
												{cleanLink}
											</Link>
										)
									})}
								</div>
							</CardItem>
						) : (
							<div className="w-full md:w-[453px]"></div>
						)}

						<CardItem translateZ={"40"}>
							<EditProfileModal profileData={profileData} userId={userId} />
						</CardItem>
					</CardBody>
				</CardContainer>
			</div>
			<h4
				style={{ textShadow: "0em 0em 0.6em white" }}
				className="text-3xl font-bold text-center"
			>
				Stories
			</h4>
			{stories.map((story: story) => (
				<ProfileCard scenario={story}></ProfileCard>
			))}
		</div>
	)
}
