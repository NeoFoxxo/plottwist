"use client"

import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import { truncateString } from "@/utils/truncateString"

type SCENARIO_TYPES = {
	scenario: {
		choices: string[] | null
		created_at: string
		finished: boolean | null
		story_part_count: number
		id: number
		prompt: string | null
		published: boolean | null
		story: string | null
		title: string
		user_id: string
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

export function ProfileCard({ scenario }: SCENARIO_TYPES) {
	const r = Math.floor(Math.random() * shadowcolor.length)
	const { title, prompt, story } = scenario
	const [remixLoading, setRemixLoading] = useState(false)

	return (
		<CardContainer className="p-0 inter-var">
			<CardBody
				className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto sm:w-[25rem] max-w-[25rem] h-auto rounded-xl p-7 m-3 border flex flex-col`}
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
				</div>
			</CardBody>
		</CardContainer>
	)
}
