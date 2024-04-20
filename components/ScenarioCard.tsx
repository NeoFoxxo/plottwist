"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

import { addBookmark } from "@/utils/actions/database/addBookmark"
import unPublish from "@/utils/actions/database/privateStory"
import publish from "@/utils/actions/database/publishStory"
import {
	Bookmark,
	Globe,
	Loader2,
	Lock,
	MessageSquareText,
	Trash,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { removeBookmark } from "@/utils/actions/database/removeBookmark"
import Image from "next/image"
import { userInfo } from "os"

type SCENARIO_TYPES = {
	scenario: {
		choices: string[] | null
		created_at: string
		finished: boolean | null
		follow_count: number
		id: number
		prompt: string | null
		published: boolean | null
		story: string | null
		title: string
		user_id: string
	}
	bookmark: boolean | false
	data: {
		data: {
			admin: boolean | null
			bio: string | null
			created_at: string | null
			email: string | null
			id: number
			image: string | null
			links: string[] | null
			name: string | null
			user_id: string
		}
	}
	currentUser:
	| {
		user: any
	}
	| {
		user: null
	}
}

function truncateString(str: string, maxl: number) {
	// Trim any leading or trailing spaces
	str?.trim()

	if (str?.length > maxl) {
		// Find the index of the last space before the 120th character
		let lastSpaceIndex = str.lastIndexOf(" ", maxl)
		// If no space is found, truncate at 120th character
		let endIndex = lastSpaceIndex === -1 ? maxl : lastSpaceIndex

		return str.substring(0, endIndex).trim() + " ..."
	} else {
		return str
	}
}

const shadowcolor = [
	"hover:shadow-emerald-500/[0.4]",
	"hover:shadow-orange-400/[0.6]",
	"hover:shadow-blue-600/[0.6]",
	"hover:shadow-cyan-400/[0.6]",
	"hover:shadow-violet-500/[0.4]",
	"hover:shadow-red-300/[0.4]",
]

const bordercolor = [
	"border-emerald-500/[0.6]",
	"border-orange-500/[0.6]",
	"border-blue-500/[0.6]",
	"border-cyan-500/[0.6]",
	"border-violet-500/[0.6]",
	"border-red-300/[0.6]",
]

export function ScenarioCard({
	scenario,
	bookmark,
	data,
	currentUser,
}: SCENARIO_TYPES) {
	const r = Math.floor(Math.random() * shadowcolor.length)
	const { title, prompt, story } = scenario
	const [isLoading, setIsLoading] = useState(false)
	const [pending, setPending] = useState(false)
	const [remixLoading, setRemixLoading] = useState(false)
	const [reviewLoading, setReviewLoading] = useState(false)

	const handleAddBookmark = async (isBookmark: boolean) => {
		setIsLoading(true)
		if (isBookmark) {
			await removeBookmark(scenario.id)
			window.location.reload()
		} else {
			await addBookmark(scenario.id)
			window.location.reload()
		}
	}

	return (
		<CardContainer className="p-4 inter-var">
			<CardBody
				className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto sm:w-[25rem] max-w-[25rem] h-auto rounded-xl p-7 m-0 border flex flex-col`}
			>
				<div className="flex items-center justify-between">
					<CardItem translateZ="30">
						<div className="flex flex-row mb-2">
							<Link href={`/profile/${data.data.name}`} className="flex items-center">
								<Image
									alt="User profile"
									width={0}
									height={0}
									className="rounded-full w-7 h-7"
									src={data.data!!.image!!}
								/>
								<p className="ml-2 text-sm hover:underline">{data.data.name}</p>
							</Link>
						</div>
					</CardItem>
					{data.data.user_id == currentUser.user.id && (
						<CardItem>
							<p className="px-1 text-sm rounded-sm bg-green-400/40">Yours</p>
						</CardItem>
					)}
				</div>
				<CardItem
					href={`/story/${scenario.id}`}
					as={Link}
					style={{ cursor: "pointer" }}
					translateZ="50"
					className="text-xl font-bold text-neutral-600 dark:text-white"
				>
					{title}
				</CardItem>
				<CardItem
					as="p"
					translateZ="60"
					className="max-w-sm mt-2 text-xs text-neutral-400 dark:text-neutral-400/80 hover:dark:text-neutral-400/100"
				>
					{truncateString(story!!, 180)}
				</CardItem>
				<CardItem
					as="p"
					translateZ={60}
					style={{
						backgroundColor: "rgba(0,0,0,0.700)",
						borderRadius: "1em",
						lineHeight: "1rem",
						overflowWrap: "break-word",
					}}
					className="text-neutral-600 p-2 transition-all duration-1000 ease-in-out font-mono text-[0.6rem] hover:text-[0.8rem] w-[100%] my-4 dark:text-neutral-500 hover:dark:text-neutral-300"
				>
					Prompt: {prompt}
				</CardItem>
				<div className="flex items-center justify-between mt-auto">
					<CardItem
						translateZ={74}
						as={Link}
						href={`/app/create?remix=${scenario.id}`}
						onClick={() => {
							setRemixLoading(true)
						}}
						style={{ borderRadius: "1em" }}
						className="px-4 py-2 text-xs font-normal bg-transparent rounded-xl dark:text-white hover:bg-white/20 "
					>
						{remixLoading ? (
							<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin"></Loader2>
						) : (
							<>Remix →</>
						)}
					</CardItem>
					{data.data.user_id != currentUser.user.id ? (
						<CardItem translateZ={70}>
							<div className="flex justify-end mt-auto">
								<CardItem
									as={Link}
									href={`/story/${scenario.id}?isReview=true`}
									onClick={() => {
										setReviewLoading(true)
									}}
									style={{ borderRadius: "1em" }}
									className="mr-2 text-xs font-bold bg-transparent rounded-x hover:bg-white/20"
								>
									<TooltipProvider delayDuration={300}>
										<Tooltip>
											<TooltipTrigger>
												{reviewLoading ? (
													<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin"></Loader2>
												) : (
													<MessageSquareText className="mx-4 my-2 size-4"></MessageSquareText>
												)}
											</TooltipTrigger>
											<TooltipContent
												className="p-0 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
												side="bottom"
											>
												<p>Add a review</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</CardItem>
								{currentUser.user.id != "no user" && (
									<CardItem
										as="button"
										onClick={() => {
											handleAddBookmark(bookmark)
										}}
										style={{ borderRadius: "1em" }}
										className="text-xs font-bold bg-transparent rounded-x hover:bg-white/20"
									>
										<TooltipProvider delayDuration={300}>
											<Tooltip>
												<TooltipTrigger>
													{bookmark ? (
														isLoading ? (
															<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin" />
														) : (
															<Trash className="mx-4 my-2 size-4" />
														)
													) : isLoading ? (
														<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin" />
													) : (
														<Bookmark className="mx-4 my-2 size-4"></Bookmark>
													)}
												</TooltipTrigger>
												<TooltipContent
													className="p-0 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
													side="bottom"
												>
													{bookmark ? (
														<p>Remove from bookmarks</p>
													) : isLoading ? (
														<span></span>
													) : (
														<p>Add to bookmarks</p>
													)}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</CardItem>
								)}
							</div>
						</CardItem>
					) : scenario.published ? (
						<CardItem
							translateZ={70}
							onClick={async () => {
								setPending(true)
								await unPublish(scenario.id)
								window.location.reload()
								setPending(false)
							}}
							style={{ borderRadius: "1em" }}
							className="p-2 mr-2 text-xs font-bold bg-transparent rounded-x hover:bg-white/20"
						>
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger>
										{pending ? (
											<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin"></Loader2>
										) : (
											<Lock className="w-4 h-4" />
										)}
									</TooltipTrigger>
									<TooltipContent
										className="p-0 pt-1 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
										side="bottom"
									>
										<p>Make Private</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</CardItem>
					) : (
						<CardItem
							translateZ={70}
							onClick={async () => {
								setPending(true)
								await publish(scenario.id)
								window.location.reload()
								setPending(false)
							}}
							style={{ borderRadius: "1em" }}
							className="p-2 mr-2 text-xs font-bold bg-transparent rounded-x hover:bg-white/20"
						>
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger>
										{pending ? (
											<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin"></Loader2>
										) : (
											<Globe className="w-4 h-4" />
										)}
									</TooltipTrigger>
									<TooltipContent
										className="p-0 pt-1 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
										side="bottom"
									>
										<p>Publish</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</CardItem>
					)}
				</div>
			</CardBody>
		</CardContainer>
	)
}
