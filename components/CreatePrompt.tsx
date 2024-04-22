"use client"
import { Textarea } from "@/components/ui/textarea"
import { StoryReturnTypes } from "@/utils/actions/database/insertStory"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bot, Check, Loader2, Verified } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import Link from "next/link"
import { useSubmitPrompt } from "@/utils/mutations/useSubmitPrompt"
import { useRegeneratePrompt } from "@/utils/mutations/useRegeneratePrompt"
import { useContinuePrompt } from "@/utils/mutations/useContinuePrompt"
import { useFinishPrompt } from "@/utils/mutations/useFinishPrompt"

const createSchema = z.object({
	prompt: z
		.string()
		.min(15, "Minimum characters should be 15!")
		.max(60, "Maximum characters should be 60!"),
})

export default function CreatePrompt({
	existingPrompt,
}: {
	existingPrompt: string
}) {
	const [pending, setPending] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDisabled, setIsDisabled] = useState(false)
	const [isFormOpen, setIsFormOpen] = useState(true)
	const [scenario, setScenario] = useState<StoryReturnTypes | null>(null)
	const [prompt, setPrompt] = useState(existingPrompt)
	const [regenerateCount, setRegenerateCount] = useState(0)
	const [storyPartCount, setStoryPartCount] = useState(0)
	const [storyParts, setStoryParts] = useState([""])
	const [final, setFinal] = useState(false)

	const submitPromptRequest = useSubmitPrompt({
		setIsDisabled,
		setIsFormOpen,
		setScenario,
		setStoryParts,
		setPrompt,
		setErrorMessage,
	})
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
		submitPromptRequest.isPending ||
		regeneratePromptRequest.isPending ||
		continueRequest.isPending ||
		finishRequest.isPending

	useEffect(() => {
		setPending(isLoading)
	}, [isLoading])

	const form = useForm<z.infer<typeof createSchema>>({
		resolver: zodResolver(createSchema),
		defaultValues: {
			prompt: prompt,
		},
	})

	async function onSubmit(values: z.infer<typeof createSchema>) {
		setStoryPartCount((storyPartCount) => storyPartCount + 1)
		setErrorMessage("")
		submitPromptRequest.mutate(values)
	}

	async function regenerate() {
		setRegenerateCount((regenerateCount) => regenerateCount + 1)
		setErrorMessage("")
		if (regenerateCount >= 3) {
			setErrorMessage("Maximum regenerate attempts reached")
			setPending(false)
			return
		}
		regeneratePromptRequest.mutate({
			prompt: prompt,
			previousStoryId: scenario?.id!!,
		})
	}

	async function generateFromChoice(choice: string, finish: boolean) {
		setStoryPartCount((storyPartCount) => storyPartCount + 1)
		console.log(storyParts[storyPartCount])
		setErrorMessage("")
		if (finish == true) {
			finishRequest.mutate({
				title: scenario?.title!,
				prompt: `${
					storyParts[storyPartCount]
						? storyParts[storyPartCount]
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
					storyParts[storyPartCount]
						? storyParts[storyPartCount]
						: storyParts[0]
				} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
		} else {
			continueRequest.mutate({
				title: scenario?.title!,
				prompt: `${
					storyParts[storyPartCount]
						? storyParts[storyPartCount]
						: storyParts[0]
				} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
		}
	}

	return (
		<>
			{isFormOpen && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full p-4 space-y-6 text-center sm:py-4 md:p-0"
					>
						<h1
							style={{ textShadow: "0em 0em 0.6em white" }}
							className="text-4xl font-bold"
						>
							Create a story
						</h1>
						<FormField
							control={form.control}
							name="prompt"
							render={({ field }) => (
								<FormItem>
									<p className="mb-5">
										Write your own story and make different choices to affect
										the outcome.
									</p>
									<FormControl>
										<Textarea
											className="font-mono mx-auto text-center resize-none w-10/12 sm:w-[35rem]"
											minLength={15}
											maxLength={60}
											placeholder="What is your story about?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						></FormField>
						<Button
							variant="default"
							className="mx-auto w-fit"
							type="submit"
							disabled={isDisabled}
						>
							<div className="flex items-center justify-center gap-2">
								{pending ? <Loader2 className="animate-spin" /> : <Bot />}
								{prompt ? <>Remix Story</> : <>Create your story</>}
							</div>
						</Button>
						{errorMessage && (
							<p style={{ color: "rgba(255,50,105,0.600)" }}>{errorMessage}</p>
						)}
					</form>
				</Form>
			)}
			{scenario && (
				<section className="p-4 flex flex-col flex-wrap justify-center items-start gap-4 max-w-[800px]">
					<h1 className="pb-10 text-4xl font-bold">{scenario.title}</h1>
					<h4 className="text-[1.15rem]">
						<b>Prompt:</b> {scenario.prompt}
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
						{!pending && storyPartCount >= 2 && storyPartCount < 8 && (
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
						{final && storyPartCount < 9 && (
							<Check className="p-0 ml-1 my-auto" />
						)}
					</div>
					{storyPartCount === 1 ? (
						<>
							<Button
								onClick={regenerate}
								className="flex items-center justify-center gap-2 font-semibold"
							>
								{pending ? <Loader2 className="animate-spin" /> : <Bot />}
								Regenerate
							</Button>
						</>
					) : (
						pending && (
							<h5 className="flex items-center justify-center gap-2 font-semibold">
								Selecting Choice <Loader2 className="animate-spin" />
							</h5>
						)
					)}
					<div className="flex flex-col flex-wrap gap-2">
						{storyPartCount >= 9 ? (
							<>
								{!pending && (
									<>
										<h4 className="text-lg font-bold">
											Your story is finished!
										</h4>
										<Link href={"/app/library"}>
											<Button className="flex items-center justify-center gap-2 font-semibold">
												Go to Library
											</Button>
										</Link>
									</>
								)}
							</>
						) : (
							<>
								{!pending && (
									<>
										<h4 className="font-semibold">Make your choice:</h4>
										{scenario!!.choices!!.map((choice, index) => {
											return (
												<>
													<div
														key={index}
														onClick={async () =>
															await generateFromChoice(choice, final)
														}
														className="px-4 py-2 rounded-md cursor-pointer bg-neutral-800 hover:bg-neutral-900 w-fit"
													>
														{choice}
													</div>
												</>
											)
										})}
									</>
								)}
							</>
						)}
						{errorMessage && (
							<p style={{ color: "rgba(255,50,105,0.600)" }}>{errorMessage}</p>
						)}
					</div>
				</section>
			)}
		</>
	)
}
