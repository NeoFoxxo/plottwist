"use client"

import { addStar } from "@/utils/actions/database/addStar"
import { removeStar } from "@/utils/actions/database/removeStar"
import { Loader2, Star } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

export default function StarButton({
	hasStarred,
	authorId,
	userId,
}: {
	hasStarred: boolean
	authorId: string
	userId: string
}) {
	const [pending, setPending] = useState(false)

	return (
		<>
			{hasStarred ? (
				<Button
					variant={"outline"}
					onClick={async () => {
						setPending(true)
						await removeStar({
							current_user_id: userId,
							author_id: authorId,
						})
					}}
				>
					{pending ? (
						<Loader2 className="animate-spin" />
					) : (
						<img className="invert" src="/icons/starred.png"></img>
					)}
				</Button>
			) : (
				<Button
					onClick={async () => {
						setPending(true)
						await addStar({
							current_user_id: userId,
							author_id: authorId,
						})
					}}
					variant={"outline"}
				>
					{pending ? (
						<Loader2 className="animate-spin" />
					) : (
						<Star className="invert-0" />
					)}
				</Button>
			)}
		</>
	)
}
