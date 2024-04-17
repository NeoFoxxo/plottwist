"use client"
import { Textarea } from "@/components/ui/textarea"
import { continueStory } from "@/utils/actions/api/continueStory"
import { StoryReturnTypes } from "@/utils/actions/database/insertStory"
import { regenerateStory } from "@/utils/actions/api/regenerateStory"
import { submitPrompt } from "@/utils/actions/api/submitPrompt"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bot, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { finishStory } from "@/utils/actions/api/finishStory"
import Link from "next/link"

const createSchema = z.object({
	prompt: z
		.string()
		.min(15, "Minimum characters should be 15!")
		.max(60, "Maximum characters should be 60!"),
})

export default function CreatePrompt() {
	const [pending, setPending] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [isDisabled, setIsDisabled] = useState(false)
	const [isFormOpen, setIsFormOpen] = useState(true)
	const [scenario, setScenario] = useState<StoryReturnTypes | null>(null)
	const [prompt, setPrompt] = useState("")
	const [regenerateCount, setRegenerateCount] = useState(0)
	const [storyPartCount, setStoryPartCount] = useState(0)

	let attempts = 0
	let submitErr = ""

	const form = useForm<z.infer<typeof createSchema>>({
		resolver: zodResolver(createSchema),
		defaultValues: {
			prompt: prompt,
		},
	})

	async function onSubmit(values: z.infer<typeof createSchema>) {
		setPending(true)
		setErrorMessage("")
		setStoryPartCount((storyPartCount) => storyPartCount + 1)
		if (attempts >= 3) {
			setErrorMessage(`Could not create story: ${submitErr}`)
			setPending(false)
			return
		}

		try {
			const scenarioData = await submitPrompt(values)
			setPending(false)
			setIsDisabled(true)
			setIsFormOpen(false)
			setScenario(scenarioData)
			setPrompt(scenarioData.prompt ? scenarioData.prompt : "")
		} catch (err) {
			attempts++
			submitErr = String(err)
			onSubmit(values)
		}
	}

	async function regenerate() {
		setPending(true)
		setRegenerateCount((regenerateCount) => regenerateCount + 1)
		if (regenerateCount >= 3) {
			setErrorMessage("Maximum regenerate attempts reached")
			setPending(false)
			return
		}
		const scenarioData = await regenerateStory({
			prompt: prompt,
			previousStoryId: scenario?.id!!,
		})
		setPending(false)
		setScenario(scenarioData)
	}

	async function generateFromChoice(choice: string) {
		setPending(true)
		setStoryPartCount((storyPartCount) => storyPartCount + 1)

		let scenarioData: StoryReturnTypes

		if (storyPartCount >= 8) {
			scenarioData = await finishStory({
				title: scenario?.title!,
				prompt: `${scenario?.story!!} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
		} else {
			scenarioData = await continueStory({
				title: scenario?.title!,
				prompt: `${scenario?.story!!} ${choice}`,
				previousStoryId: scenario?.id!!,
				currentStory: scenario?.story!!,
			})
		}

		setPending(false)
		setScenario(scenarioData)
	}

	return (
		<>
			{isFormOpen && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full p-4 sm:py-4 md:p-0 space-y-6 text-center"
					>
						<h1 className="text-4xl font-bold">Create a story.</h1>
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
											className="font-mono mx-auto text-center resize-none w-auto sm:w-[35rem]"
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
							className="w-fit mx-auto"
							type="submit"
							disabled={isDisabled}
						>
							<div className="flex items-center justify-center gap-2">
								{pending ? <Loader2 className="animate-spin" /> : <Bot />}
								Create your story
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
					<h1 className="text-4xl font-bold pb-10">{scenario.title}</h1>
					<h4 className="text-[1.15rem]">
						<b>Prompt:</b> {scenario.prompt}
					</h4>
					<article className="flex flex-col gap-2">
						<h4 className="font-semibold text-[1.05rem]">Your story:</h4>
						<TextGenerateEffect
							className="font-normal text-[1.05rem]"
							words={scenario.story ? scenario.story : "Loading..."}
						/>
					</article>

					{storyPartCount === 1 ? (
						<Button
							onClick={regenerate}
							className="font-semibold flex justify-center items-center gap-2"
						>
							{pending ? <Loader2 className="animate-spin" /> : <Bot />}
							Regenerate
						</Button>
					) : (
						pending && (
							<h5 className="font-semibold flex justify-center items-center gap-2">
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
											<Button className="font-semibold flex justify-center items-center gap-2">
												Go to Library
											</Button>
										</Link>
									</>
								)}
							</>
						) : (
							<>
								<h4 className="font-semibold">Make your choice:</h4>
								{scenario!!.choices!!.map((choice, index) => {
									return (
										<div
											key={index}
											onClick={async () => await generateFromChoice(choice)}
											className="py-2 px-4 cursor-pointer bg-neutral-800 hover:bg-neutral-900 w-fit rounded-md"
										>
											{choice}
										</div>
									)
								})}
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
