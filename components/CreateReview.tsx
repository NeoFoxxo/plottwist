"use client"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MessageSquareText } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { addReview } from "@/utils/actions/database/addReview"
import { useRouter } from "next/navigation"

const reviewSchema = z.object({
	comment: z
		.string()
		.min(2, "Minimum for your review should be 2 characters!")
		.max(120, "Maximum for your review should be 100 characters!"),
})

export default function CreateReview({
	storyId,
	authorId,
}: {
	storyId: number
	authorId: string
}) {
	const [errorMessage, setErrorMessage] = useState("")
	const [isDisabled, setDisabled] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			comment: "",
		},
	})

	async function onSubmit(values: z.infer<typeof reviewSchema>) {
		setDisabled(true)
		let send = await addReview({
			storyId: storyId,
			authorId: authorId,
			comment: values.comment,
		})
		if (send === "failed") {
			setDisabled(false)
			setErrorMessage("Your review was not added, please try again later.")
		} else if (send === "done") {
			window.location.href = `/story/${storyId!!}`
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full p-4 space-y-6 text-center sm:py-4 md:p-0"
				>
					<FormField
						control={form.control}
						name="comment"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										className={"font-mono mx-auto text-left w-full resize-none"}
										minLength={2}
										readOnly={isDisabled}
										maxLength={120}
										placeholder="Your comment here.."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					></FormField>
					<Button variant="default" type="submit" disabled={isDisabled}>
						<div className="flex items-center justify-center gap-2">
							{isDisabled ? (
								<Loader2 className="animate-spin" />
							) : (
								<MessageSquareText />
							)}
							Add
						</div>
					</Button>
					{errorMessage && (
						<p style={{ color: "rgba(255,50,105,0.600)" }}>{errorMessage}</p>
					)}
				</form>
			</Form>
		</>
	)
}
