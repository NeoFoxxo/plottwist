"use client"
import {
	BookmarkStory,
	getUserBookmarks,
} from "@/utils/actions/database/getUserBookmarks"
import { useEffect, useState } from "react"
import BookmarksCard from "./BookmarksCard"
import { story } from "./DashboardMobile"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination"
import { Loader2 } from "lucide-react"
import getUserInfo from "@/utils/actions/database/getUserinfo"

export function PaginateBookmarks({ userId }: { userId: string }) {
	const [bookmarks, setBookmarks] = useState([])
	const [currentSlice, setCurrentSlice] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [isLastPage, setIsLastPage] = useState(false)
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		if (isFirstRender && bookmarks.length > 0) {
			setIsFirstRender(false)
		}
	}, [bookmarks])

	useEffect(() => {
		async function getBookmarks() {
			const bookmarks = await getUserBookmarks(userId, currentSlice)
			if (bookmarks?.length === 0) {
				setIsLoading(false)
				setIsLastPage(true)
				return
			} else {
				setIsLastPage(false)
			}
			const updatedResult = await Promise.all(
				bookmarks!!.map(async (story: BookmarkStory) => {
					const userInfo = await getUserInfo(story.user_id)
					return { ...story, userInfo }
				})
			)
			//@ts-expect-error
			setBookmarks(updatedResult)

			setIsLoading(false)
		}
		getBookmarks()
	}, [currentSlice])

	const handleState = (condition: string) => {
		if (condition === "increment") {
			setCurrentSlice((slice) => slice + 1)
		} else {
			if (currentSlice > 1) {
				setCurrentSlice((slice) => slice - 1)
			}
		}
	}

	return (
		<section className="pt-10">
			<div className="flex flex-wrap justify-center py-12 gap-y-24">
				{isLoading ? (
					<Loader2 size={34} className="mx-auto my-20 animate-spin" />
				) : (
					<>
						{!isFirstRender && bookmarks.length > 0 ? (
							<>
								{bookmarks.map((story: story) => (
									<div className="mt-5 md:mt-0" key={story.id}>
										<BookmarksCard
											//@ts-expect-error
											data={story.userInfo}
											scenario={story}
										/>
										<div className="mb-16  md:mb-0"></div>
									</div>
								))}
								<Pagination className="pt-6">
									<PaginationContent>
										{currentSlice != 1 && (
											<PaginationItem
												onClick={() => handleState("decrement")}
												style={{ cursor: "pointer" }}
											>
												<PaginationPrevious />
											</PaginationItem>
										)}
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
										{!isLastPage && (
											<PaginationItem
												onClick={() => handleState("increment")}
												style={{ cursor: "pointer" }}
											>
												<PaginationNext />
											</PaginationItem>
										)}
									</PaginationContent>
								</Pagination>
							</>
						) : (
							<p className="text-lg font-medium">
								You have no bookmarks, try saving something from the dashboard!
							</p>
						)}
					</>
				)}
			</div>
		</section>
	)
}
