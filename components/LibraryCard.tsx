"use client"
import { Lock, Globe, Loader2, Trash, Pin, PinOff } from "lucide-react"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import publish from "@/utils/actions/database/publishStory"
import unPublish from "@/utils/actions/database/privateStory"
import { useState } from "react"
import { Button } from "./ui/button"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog"
import deleteStory from "@/utils/actions/database/deleteStory"
import { pinStory } from "@/utils/actions/database/pinStory"
import Link from "next/link"

type SCENARIO_TYPES = {
	scenario: {
		created_at: string
		follow_count: number
		id: number
		prompt: string | null
		story: string | null
		title: string
		user_id: string
		finished: boolean | null
		published: boolean | null
		pinned: boolean | null
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

export function LibraryCard({ scenario }: SCENARIO_TYPES) {
	const [isLoading, setIsLoading] = useState(false)
	const [isLoading2, setIsLoading2] = useState(false)

	const [pending, setPending] = useState(false)

	const r = Math.floor(Math.random() * shadowcolor.length)

	const { title, prompt, story, finished, published, pinned } = scenario

	const handleDeleteStory = async () => {
		setIsLoading2(true)
		await deleteStory(scenario.id)
		window.location.reload()
	}

	const handlePinStory = async () => {
		setIsLoading(true)
		await pinStory(scenario.id, pinned)
		window.location.reload()
	}

	return (
		<CardContainer className="inter-var h-[10rem] p-0 my-7">
			<CardBody
				className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto h-auto max-md:h-auto my-auto sm:w-[25rem] max-w-[25rem] rounded-xl p-7 m-10 border flex flex-col`}
			>
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
					<CardItem translateZ={70}>
						<div className="flex justify-start">
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger>
										<Button
											variant={"ghost"}
											className="px-2.5 mr-2"
											onClick={handlePinStory}
										>
											{isLoading ? (
												<Loader2 className="animate-spin h-4 w-4" />
											) : (
												<>{pinned ? <PinOff size={18} /> : <Pin size={18} />}</>
											)}
										</Button>
									</TooltipTrigger>
									<TooltipContent
										className="p-0 pt-1 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
										side="bottom"
									>
										<p>{pinned ? "Unpin" : "Pin"}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</CardItem>
					{finished == false && (
						<CardItem
							as={"a"}
							href={"/app/library/continue/" + scenario.id}
							translateZ={74}
							style={{ borderRadius: "1em" }}
							className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-transparent hover:bg-white/20 "
						>
							Continue →
						</CardItem>
					)}
					<CardItem translateZ={70}>
						<div className="flex justify-end mt-auto">
							{finished == true && (
								<>
									{published ? (
										<CardItem
											onClick={async () => {
												setPending(true)
												await unPublish(scenario.id)
												window.location.reload()
											}}
											style={{ borderRadius: "1em" }}
											className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs p-3 font-bold"
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
											onClick={async () => {
												setPending(true)
												await publish(scenario.id)
												window.location.reload()
											}}
											style={{ borderRadius: "1em" }}
											className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs p-3 font-bold"
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
								</>
							)}
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant={"ghost"} className="px-2.5">
										{isLoading2 ? (
											<Loader2 className="animate-spin" size={18} />
										) : (
											<Trash size={18} />
										)}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											your story.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={handleDeleteStory}>
											{isLoading ? (
												<Loader2 className="animate-spin mx-4 my-2 h-4 w-4" />
											) : (
												"Continue"
											)}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</CardItem>
				</div>
			</CardBody>
		</CardContainer>
	)
}
