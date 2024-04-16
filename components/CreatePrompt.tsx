"use client"
import { Textarea } from "@/components/ui/textarea"
import { submitPrompt } from "@/utils/actions/submitPrompt"
import { Bot, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { useRouter } from "next/navigation"

const createSchema = z.object({
	prompt: z
		.string()
		.min(15, "Minimum characters should be 15!")
		.max(60, "Maximum characters should be 60!"),
})

export default function CreatePrompt() {
	const [pending, setPending] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const router = useRouter()
	let attempts = 0
	let submitErr = ""

	const form = useForm<z.infer<typeof createSchema>>({
		resolver: zodResolver(createSchema),
		defaultValues: {
			prompt: "",
		},
	})

	async function onSubmit(values: z.infer<typeof createSchema>) {
		setPending(true)
		setErrorMessage("")

		if (attempts >= 3) {
			setErrorMessage(`Could not create story: ${submitErr}`)
			setPending(false)
			return
		}

		try {
			const storyId = await submitPrompt(values)
			router.push(`/story/${storyId}`)
		} catch (err) {
			attempts++
			submitErr = String(err)
			onSubmit(values)
		}
	}

	return (
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
								Write your own story and make different choices to affect the
								outcome.
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
					variant={"outline"}
					className="w-fit mx-auto"
					type="submit"
					disabled={pending}
				>
					{pending ? (
						<div className="flex items-center justify-center gap-2">
							<Loader2 className="animate-spin" />
							Creating your story
						</div>
					) : (
						<div className="flex items-center justify-center gap-2">
							<Bot />
							Create your story
						</div>
					)}
				</Button>
				{errorMessage && (
					<p style={{ color: "rgba(255,50,105,0.600)" }}>{errorMessage}</p>
				)}
			</form>
		</Form>
	)
}
