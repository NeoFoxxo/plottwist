"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { removeBookmark } from "@/utils/actions/database/removeBookmark"
import { addBookmark } from "@/utils/actions/database/addBookmark"
import { Bookmark } from "lucide-react"

export default function BookmarkedButton({
	storyId,
	isBookmarked,
	bookmarkCount,
}: {
	storyId: number
	isBookmarked: boolean
	bookmarkCount: number
}) {
	const [bookmarked, setBookmarked] = useState(isBookmarked)
	const [fakeBmrkCount, setFakeBmrkCount] = useState(bookmarkCount)

	const handleAddBookmark = async () => {
		if (bookmarked) {
			setFakeBmrkCount((fakeBmrkCount) => fakeBmrkCount - 1)
			setBookmarked(false)
			await removeBookmark(storyId)
		} else {
			setFakeBmrkCount((fakeBmrkCount) => fakeBmrkCount + 1)
			setBookmarked(true)
			await addBookmark(storyId)
		}
	}

	return (
		<Button
			variant={"outline"}
			onClick={() => {
				handleAddBookmark()
			}}
		>
			{bookmarked ? (
				<>
					<Bookmark className="mx-4 my-2 size-4" fill="white" />
					<p className="mr-5">{fakeBmrkCount}</p>
				</>
			) : (
				<>
					<Bookmark className="mx-4 my-2 size-4" />
					<p className="mr-5">{fakeBmrkCount}</p>
				</>
			)}
		</Button>
	)
}
