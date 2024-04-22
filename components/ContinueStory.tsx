"use client"

import { StoryReturnTypes } from "@/utils/actions/database/insertStory"
import { useContinuePrompt } from "@/utils/mutations/useContinuePrompt"
import { useFinishPrompt } from "@/utils/mutations/useFinishPrompt"
import { useRegeneratePrompt } from "@/utils/mutations/useRegeneratePrompt"
import { Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { redirect } from "next/navigation"

export type CONTINUE_STORY_TYPES = {
	scenarioData: {
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

export default function ContinueStory({ scenarioData }: CONTINUE_STORY_TYPES) {
	const [pending, setPending] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [scenario, setScenario] = useState<StoryReturnTypes | null>(
		scenarioData
	)

	useEffect(() => {
		if (scenarioData.finished == true) return redirect("/app/library/")
	})

	const [prompt, setPrompt] = useState(scenarioData.prompt)
	const [regenerateCount, setRegenerateCount] = useState(0)
	const [storyPartCount, setStoryPartCount] = useState(
		scenarioData.story_part_count
	)
	const [storyParts, setStoryParts] = useState([scenarioData.story!!])
	const [final, setFinal] = useState(false)
	const [currentStoryPartCount, setCurrentStoryPartCount] = useState(0)
	const regeneratePromptRequest = useRegeneratePrompt({
		setScenario,
		setStoryParts,
		setErrorMessage,
	})
	const continueRequest = useContinuePrompt({
		setScenario,
		setStoryParts,
		setErrorMessage,
	})
	const finishRequest = useFinishPrompt({
		setScenario,
		setStoryParts,
		setErrorMessage,
	})

	const isLoading =
		regeneratePromptRequest.isPending ||
		continueRequest.isPending ||
		finishRequest.isPending

	useEffect(() => {
		setPending(isLoading)
	}, [isLoading])

	async function regenerate() {
		setRegenerateCount((regenerateCount) => regenerateCount + 1)
		setErrorMessage("")
		if (regenerateCount >= 3) {
			setErrorMessage("Maximum regenerate attempts reached")
			setPending(false)
			return
		}
		regeneratePromptRequest.mutate({
			prompt: prompt!!,
			previousStoryId: scenario?.id!!,
		})
	}

	async function generateFromChoice(choice: string, finish: boolean) {
		setStoryPartCount((storyPartCount) => storyPartCount + 1)
		setCurrentStoryPartCount(
			(currentStoryPartCount) => currentStoryPartCount + 1
		)
		setErrorMessage("")
		if (finish == true) {
			finishRequest.mutate({
				title: scenario?.title!,
				prompt: `${
					storyParts[currentStoryPartCount]
						? storyParts[currentStoryPartCount]
						: storyParts[0]
				} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
			setStoryPartCount(9)
			return
		}
		if (storyPartCount >= 8) {
			finishRequest.mutate({
				title: scenario?.title!,
				prompt: `${
					storyParts[currentStoryPartCount]
						? storyParts[currentStoryPartCount]
						: storyParts[0]
				} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
		} else {
			continueRequest.mutate({
				title: scenario?.title!,
				prompt: `${
					storyParts[currentStoryPartCount]
						? storyParts[currentStoryPartCount]
						: storyParts[0]
				} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
		}
	}

	return (
		<section className="p-4 flex flex-col flex-wrap justify-center items-start gap-4 max-w-[800px]">
			<h1 className="pb-10 text-4xl font-bold">{scenarioData.title}</h1>
			<h4 className="text-[1.15rem]">
				<b>Prompt:</b> {scenarioData.prompt}
			</h4>
			<article className="flex flex-col gap-2">
				<h4 className="font-semibold text-[1.05rem]">Your story:</h4>
				{storyParts.map((currentPart) => (
					<TextGenerateEffect
						className="font-normal text-[1.05rem]"
						words={currentPart}
					/>
				))}
			</article>
			<div className="flex gap-1">
				{!pending && storyPartCount >= 1 && storyPartCount < 8 && (
					<Button
						onClick={() => {
							setFinal(!final)
						}}
					>
						{final ? (
							<p className="flex mx-auto">Set as last choice</p>
						) : (
							"Set as last choice"
						)}
					</Button>
				)}
				{final && storyPartCount < 9 && <Check className="p-0 ml-1 my-auto" />}
			</div>
			{pending && (
				<h5 className="flex items-center justify-center gap-2 font-semibold">
					Selecting Choice <Loader2 className="animate-spin" />
				</h5>
			)}
			<div className="flex flex-col flex-wrap gap-2">
				{storyPartCount >= 9 ? (
					<>
						{!pending && (
							<>
								<h4 className="text-lg font-bold">Your story is finished!</h4>
								<Link href={"/app/library"}>
									<Button className="flex items-center justify-center gap-2 font-semibold">
										Go to Library
									</Button>
								</Link>
							</>
						)}
					</>
				) : (
					!pending && (
						<>
							<h4 className="font-semibold">Make your choice:</h4>
							{scenario!!.choices!!.map((choice, index) => {
								return (
									<div
										key={index}
										onClick={async () =>
											await generateFromChoice(choice, final)
										}
										className="px-4 py-2 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-900 w-fit"
									>
										{choice}
									</div>
								)
							})}
						</>
					)
				)}
				{errorMessage && (
					<p style={{ color: "rgba(255,50,105,0.600)" }}>{errorMessage}</p>
				)}
			</div>
		</section>
	)
}
