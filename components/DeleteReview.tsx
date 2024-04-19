"use client"
import { Loader2, Trash } from "lucide-react"
import { Button } from "./ui/button"
import deleteReview from "@/utils/actions/database/deleteReview"
import { useState } from "react"

export default function DeleteReview({
	commentId,
	storyId,
}: {
	commentId: string
	storyId: number
}) {
	const [pending, setPending] = useState(false)

	return (
		<Button
			onClick={async () => {
				setPending(true)
				await deleteReview(commentId)
				window.location.href = `/story/${storyId}`
			}}
			variant={"ghost"}
		>
			{pending ? (
				<Loader2 className="animate-spin" />
			) : (
				<Trash className="h-4 w-4 p-0" />
			)}
		</Button>
	)
}
