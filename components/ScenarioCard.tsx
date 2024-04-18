"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

import {
	Bookmark,
	Globe,
	Loader2,
	Lock,
	MessageSquareText,
	Trash,
} from "lucide-react"
import Link from "next/link"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { useRouter } from "next//navigation"
import { useState } from "react"
import publish from "@/utils/actions/database/publishStory"
import unPublish from "@/utils/actions/database/privateStory"

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
	bookmark?: boolean
	data: {
		data: {
			admin: boolean
			bio: string | null
			created_at: string
			email: string
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
	const bookmarkFlag = bookmark ? bookmark : false

	const [pending, setPending] = useState(false)
	const router = useRouter()

	return (
		<CardContainer className="inter-var h-[10rem] p-4 my-7">
			<CardBody
				className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto h-auto max-md:h-auto my-auto sm:w-[25rem] max-w-[25rem] rounded-xl p-7 m-10 border flex flex-col`}
			>
				<div className="flex justify-between items-center">
					<CardItem translateZ="30">
						<div className="flex flex-row mb-2">
							<a href="" className="h-[fit-content] w-[fit-content] m-auto p-0">
								<img
									className="rounded-full w-7 h-7"
									src={data.data!!.image!!}
								></img>
							</a>
							<a href="" className="h-auto w-[fit-content] m-auto p-0">
								<p className="text-sm ml-2 hover:underline">{data.data.name}</p>
							</a>
						</div>
					</CardItem>
					{data.data.user_id == currentUser.user.id && (
						<CardItem>
							<p className="text-sm px-1 rounded-sm bg-green-400/40">Yours</p>
						</CardItem>
					)}
				</div>
				<CardItem
					href={`/story/${scenario.id}`}
					as="a"
					style={{ cursor: "pointer" }}
					translateZ="50"
					className="text-xl font-bold text-neutral-600 dark:text-white"
				>
					{title}
				</CardItem>
				<CardItem
					as="p"
					translateZ="60"
					className="text-neutral-400 text-xs max-w-sm mt-2 dark:text-neutral-400/80 hover:dark:text-neutral-400/100"
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
				<div className="flex justify-between items-center mt-auto">
					<CardItem
						translateZ={74}
						as={Link}
						href={`/app/create?remix=${scenario.id}`}
						style={{ borderRadius: "1em" }}
						className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-transparent hover:bg-white/20 "
					>
						Remix →
					</CardItem>
					{data.data.user_id != currentUser.user.id ? (
						<CardItem translateZ={70}>
							<div className="flex justify-end mt-auto">
								<CardItem
									as="a"
									href="/b"
									style={{ borderRadius: "1em" }}
									className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
								>
									<TooltipProvider delayDuration={300}>
										<Tooltip>
											<TooltipTrigger>
												<MessageSquareText className="size-4 mx-4 my-2"></MessageSquareText>
											</TooltipTrigger>
											<TooltipContent
												className="p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
												side="bottom"
											>
												<p>Add a review</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</CardItem>
								<CardItem
									as="a"
									href="/b"
									style={{ borderRadius: "1em" }}
									className=" rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
								>
									<TooltipProvider delayDuration={300}>
										<Tooltip>
											<TooltipTrigger>
												{bookmark ? (
													<Trash className="size-4 mx-4 my-2" />
												) : (
													<Bookmark className="size-4 mx-4 my-2"></Bookmark>
												)}
											</TooltipTrigger>
											<TooltipContent
												className="p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
												side="bottom"
											>
												{bookmark ? (
													<p>Remove from bookmarks</p>
												) : (
													<p>Add to bookmarks</p>
												)}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</CardItem>
							</div>
						</CardItem>
					) : scenario.published ? (
						<CardItem
							translateZ={70}
							onClick={async () => {
								setPending(true)
								await unPublish(scenario.id)
								router.refresh()
								setPending(false)
							}}
							style={{ borderRadius: "1em" }}
							className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs p-2 font-bold"
						>
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger>
										{pending ? (
											<Loader2 className="animate-spin h-4 w-4"></Loader2>
										) : (
											<Lock className="h-4 w-4" />
										)}
									</TooltipTrigger>
									<TooltipContent
										className="p-0 pt-1 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
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
								router.refresh()
								setPending(false)
							}}
							style={{ borderRadius: "1em" }}
							className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs p-2 font-bold"
						>
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger>
										{pending ? (
											<Loader2 className="animate-spin h-4 w-4"></Loader2>
										) : (
											<Globe className="h-4 w-4" />
										)}
									</TooltipTrigger>
									<TooltipContent
										className="p-0 pt-1 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
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
