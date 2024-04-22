"use client"
import { getUserStories } from "@/utils/actions/database/getUserStories"
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
import { ProfileCard } from "./ProfileCard"
import { Loader2 } from "lucide-react"

export function PaginateStories({ userId }: { userId: string }) {
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
			const result: any = await getUserStories(userId, currentSlice)
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
			setCurrentSlice((slice) => slice + 1)
		} else {
			if (currentSlice > 0) {
				setCurrentSlice((slice) => slice - 1)
			}
		}
	}
	return (
		<section>
			{isLoading ? (
				<div className="flex flex-wrap justify-center pl-2 mx-auto max-w-7xl">
					<Loader2 size={34} className="my-20 animate-spin" />
				</div>
			) : (
				<>
					{!isFirstRender && stories.length > 0 && (
						<>
							<h4
								style={{ textShadow: "0em 0em 0.6em white" }}
								className="pb-3 pl-5 text-3xl font-bold text-center py-9"
							>
								Stories
							</h4>
							<div className="flex flex-wrap justify-center pl-2 mx-auto max-w-7xl">
								{!isLoading ? (
									<>
										{stories.map((story: story) => (
											<ProfileCard scenario={story} />
										))}
									</>
								) : (
									<Loader2 size={34} className="my-20 animate-spin" />
								)}
							</div>
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
					)}
				</>
			)}
		</section>
	)
}
