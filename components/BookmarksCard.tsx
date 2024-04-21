"use client"

import { removeBookmark } from "@/utils/actions/database/removeBookmark"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip"
import { CalendarDays, Loader2, MessageSquareText, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { truncateString } from "@/utils/truncateString"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type BOOKMARK_INPUT_TYPES = {
	scenario: {
		created_at: string
		story_part_count: number
		id: number
		prompt: string | null
		story: string | null
		title: string
		user_id: string
	}
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
}

export default function BookmarksCard({
	scenario,
	data,
}: BOOKMARK_INPUT_TYPES) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const handleRemoveBookmark = async () => {
		setIsLoading(true)
		await removeBookmark(scenario.id)
		router.refresh()
	}

	function relativeTime(timestamp: string) {
		const currentTime: any = new Date()
		const providedTime: any = new Date(timestamp)
		const timeDifference = currentTime - providedTime
		const seconds = Math.floor(timeDifference / 1000)
		const minutes = Math.floor(seconds / 60)
		const hours = Math.floor(minutes / 60)
		const days = Math.floor(hours / 24)
		const weeks = Math.floor(days / 7)

		if (weeks > 0) {
			return weeks + "w"
		} else if (days > 0) {
			return days + "d"
		} else if (hours > 0) {
			return hours + "h"
		} else if (minutes > 0) {
			return minutes + "m"
		} else {
			return seconds + "s"
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

	const r = Math.floor(Math.random() * shadowcolor.length)

	const dateObj = new Date(data.data.created_at as string)
	const date = dateObj.toLocaleString("en-US", {
		month: "long",
		year: "numeric",
	})

	return (
		<CardContainer className="inter-var h-[10rem] p-4 my-7">
			<CardBody
				className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto h-auto max-md:h-auto my-auto sm:w-[25rem] max-w-[25rem] rounded-xl p-7 m-10 border flex flex-col`}
			>
				<CardItem translateZ="80">
					<div className="flex flex-row mb-2">
						<HoverCard>
							<HoverCardTrigger asChild>
								<Link
									href={`/profile/${data.data.name}`}
									className="flex items-center"
								>
									<img
										alt="User profile"
										width={0}
										height={0}
										className="rounded-full w-7 h-7"
										src={data.data!!.image!!}
									></img>
									<p className="flex ml-2 text-sm hover:underline">
										{data.data.name}
										{data.data.admin && (
											<img
												src="/icons/admin.png"
												className="w-3.5 h-3.5 flex ml-[0.4rem] my-auto"
											></img>
										)}
									</p>
								</Link>
							</HoverCardTrigger>
							<HoverCardContent className="ml-36">
								<div className="flex justify-between space-x-4">
									<div>
										<Avatar>
											<AvatarImage src={data.data!!.image!!} />
											<AvatarFallback>VC</AvatarFallback>
										</Avatar>
										<div className="pt-1.5 space-y-1">
											<h4 className="text-sm font-semibold">
												@{data.data.name}
											</h4>
											<p className="text-sm">
												{truncateString(data.data.bio as string, 60)}
											</p>
											<div className="flex items-center pt-2">
												<CalendarDays className="w-4 h-4 mr-2 opacity-70" />
												<span className="text-xs text-muted-foreground">
													{date}
												</span>
											</div>
										</div>
									</div>
									{data.data.admin && (
										<img
											src="/icons/admin.png"
											className="w-3.5 h-3.5 flex ml-[0.4rem] mb-auto"
										></img>
									)}
								</div>
							</HoverCardContent>
						</HoverCard>
					</div>
				</CardItem>
				<CardItem
					href={`/story/${scenario.id}`}
					as="a"
					style={{ cursor: "pointer" }}
					translateZ="50"
					className="text-xl font-bold text-neutral-600 dark:text-white"
				>
					{scenario.title}
				</CardItem>
				<CardItem
					as="p"
					translateZ="60"
					className="max-w-sm mt-2 text-xs text-neutral-400 dark:text-neutral-400/80 hover:dark:text-neutral-400/100"
				>
					{truncateString(scenario.story!!, 180)}
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
					Prompt: {scenario.prompt}
				</CardItem>
				<div className="flex items-center justify-between mt-auto">
					<CardItem
						translateZ={74}
						as={Link}
						href={`/story/${scenario.id}`}
						style={{ borderRadius: "1em" }}
						className="px-4 py-2 text-xs font-normal bg-transparent rounded-xl dark:text-white hover:bg-white/20 "
					>
						Remix →
					</CardItem>
					<CardItem translateZ={70}>
						<div className="flex justify-end mt-auto">
							<CardItem
								as="a"
								href="/b"
								style={{ borderRadius: "1em" }}
								className="mr-2 text-xs font-bold bg-transparent rounded-x hover:bg-white/20"
							>
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										<TooltipTrigger>
											<MessageSquareText className="mx-4 my-2 size-4"></MessageSquareText>
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
							<CardItem
								as="a"
								style={{ borderRadius: "1em" }}
								className="text-xs font-bold bg-transparent rounded-x hover:bg-white/20"
							>
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										{isLoading ? (
											<Loader2 className="w-4 h-4 mx-4 my-2 animate-spin" />
										) : (
											<TooltipTrigger onClick={handleRemoveBookmark}>
												<Trash className="mx-4 my-2 size-4" />
											</TooltipTrigger>
										)}
										<TooltipContent
											className="p-0 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
											side="bottom"
										>
											<p>Remove bookmark</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</CardItem>
						</div>
					</CardItem>
				</div>
			</CardBody>
		</CardContainer>
	)
}
