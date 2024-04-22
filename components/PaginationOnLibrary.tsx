"use client"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination"
import { useEffect, useState } from "react"
import { story } from "./DashboardMobile"
import { Loader2 } from "lucide-react"
import { LibraryCard } from "./LibraryCard"
import getLibraryStories from "@/utils/actions/database/getLibraryStories"

export function PaginationOnLibrary({ userId }: { userId: string }) {
	const [stories, setStories] = useState([])
	const [currentSlice, setCurrentSlice] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [isLastPage, setIsLastPage] = useState(false)
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		if (isFirstRender && stories.length > 0) {
			setIsFirstRender(false)
		}
	}, [stories])

	useEffect(() => {
		async function getStories() {
			const result: any = await getLibraryStories(userId, currentSlice)
			if (result?.length === 0) {
				setIsLoading(false)
				setIsLastPage(true)
				return
			} else {
				setIsLastPage(false)
			}
			setStories(result)
			setIsLoading(false)
		}

		getStories()
	}, [currentSlice])

	const handleState = (condition: string) => {
		if (condition === "increment") {
			setCurrentSlice((slice) => slice + 3)
		} else {
			if (currentSlice > 0) {
				setCurrentSlice((slice) => slice - 3)
			}
		}
	}

	return (
		<div>
			<div className="flex flex-wrap justify-center py-12 gap-y-24">
				{isLoading ? (
					<Loader2 size={34} className="mx-auto my-20 animate-spin" />
				) : (
					<>
						{!isFirstRender && stories.length > 0 ? (
							<>
								{stories.map((story: story) => (
									<div className="mt-5 md:mt-0" key={story.id}>
										<LibraryCard
											//@ts-expect-error
											data={story.userInfo}
											scenario={story}
										/>
										<div className="mb-16  md:mb-0"></div>
									</div>
								))}
								<Pagination className="pt-6">
									<PaginationContent>
										{currentSlice != 0 && (
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
								You have no stories, try creating some!
							</p>
						)}
					</>
				)}
			</div>
		</div>
	)
}
