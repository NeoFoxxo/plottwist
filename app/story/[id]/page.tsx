import NotFound from "@/app/not-found"
import AnimateStory from "@/components/AnimateStory"
import BookmarkedButton from "@/components/BookmarkedButton"
import CreateReview from "@/components/CreateReview"
import DeleteReview from "@/components/DeleteReview"
import RemixButton from "@/components/RemixButton"
import { buttonVariants } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { cn } from "@/lib/utils"
import { getBookmarksId } from "@/utils/actions/database/getBookmarksId"
import { getReviews } from "@/utils/actions/database/getReviews"
import getSession from "@/utils/actions/database/getSession"
import { getStory, getStoryReturnType } from "@/utils/actions/database/getStory"
import getStoryBookmarkCount from "@/utils/actions/database/getStoryBookmarkCount"
import getUserInfo from "@/utils/actions/database/getUserInfo"
import { createClient } from "@/utils/supabase/server"
import { MessageSquareText } from "lucide-react"
import Link from "next/link"

export default async function StoryDetails({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: { isReview: boolean }
}) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	let user_id = user?.id
	if (!user_id) user_id = "no user"

	let story: getStoryReturnType | null

	try {
		story = await getStory(params.id)
	} catch (error) {
		return <NotFound />
	}

	let author = await getUserInfo(story?.user_id!!)

	// if the story is private and the current user is not the author, 404 since its nun of their business
	if (story?.published === false && author.data.user_id != user_id)
		return <NotFound />

	const bookmarks = await getBookmarksId(user_id)
	const bookmarkCount = await getStoryBookmarkCount(story!!.id)
	const isBookmarked = bookmarks.includes(story!!?.id) ? true : false

	const accountInfo = [author.stories!!, author.data.star_count, bookmarkCount];

	const icons = ["/icons/book.png", "/icons/star.png", "/icons/bookmark.png"]

	const reviews = await getReviews({
		storyId: Number(params.id),
		commentsCount: 20,
	})

	const currentUser = await getSession()

	function simplifyNumber(number: number) {
		if (number >= 1000000) {
			return (number / 1000000).toFixed(1) + "M"
		} else if (number >= 1000) {
			return (number / 1000).toFixed(1) + "K"
		} else {
			return number
		}
	}

	return (
		<main className="flex flex-col w-full gap-2 py-8 mx-auto my-12">
			<div className="flex flex-col w-full mx-auto">
				<TracingBeam className="pt-6 pb-10">
					<h1
						style={{
							textShadow: "0em 0em 0.3em rgba(255,255,255,0.6)",
						}}
						className="mb-5 text-4xl font-bold"
					>
						{story?.title!!}
					</h1>
					<p className="pb-5 font-mono 0 text-md ">Prompt: {story?.prompt}</p>
					<AnimateStory story={story!!.story!!} />
				</TracingBeam>
				<div className="flex flex-col w-full max-w-5xl mx-auto">
					<p className="mb-2 font-mono text-sm text-white/35">Generated by</p>
					<div className="flex items-center w-full gap-3">
						<a href="" className="w-[fit-content]">
							<img
								src={author.data.image || "/icons/pfp1.png"}
								width={150}
								height={150}
								alt="Author"
								className="rounded-full cursor-pointer w-9 h-9"
							/>
						</a>
						<div className="flex flex-col gap-1">
							<Link href={`/profile/${author.data.name!!}`}
								style={{
									textShadow: "0em 0em 0.3em white",
								}}
								className="text-base font-bold cursor-pointer hover:underline">
								<p className="flex">{author.data.name!!} {author.data.admin && (<img
									src="/icons/admin.png"
									className="w-4 h-4 flex ml-[0.3rem] my-auto"></img>
								)}</p>
							</Link>
							<div className="flex flex-row text-start">
								{accountInfo.map((info: any, index) => (
									<div className="flex items-start gap-0" key={index}>
										<img
											className="h-[0.8rem] w-[0.8rem] mr-1 invert"
											width={0}
											height={0}
											src={icons[index]}
											alt={"icon"}
										/>
										<span
											style={{
												textShadow: "0em 0em 0.4em white",
											}}
											className="mr-2 text-xs font-bold"
										>
											{simplifyNumber(info)}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="flex items-center w-full gap-3 pt-4 mb-7">
						<TooltipProvider delayDuration={300}>
							<Tooltip>
								<TooltipTrigger>
									<RemixButton storyId={story!!.id} />
								</TooltipTrigger>
								<TooltipContent
									className="p-0 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
									side="bottom"
								>
									<p
										style={{
											textShadow: "0em 0em 0.3em white",
										}}
									>
										Remix generation
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						{story?.user_id != currentUser.user?.id && user_id != "no user" && (
							<>
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										<TooltipTrigger>
											<Dialog defaultOpen={searchParams.isReview}>
												<DialogTrigger asChild>
													<Link
														className={cn(buttonVariants({ variant: "outline", }), "flex gap-2.5 px-8")}
														href={""}
													>
														<MessageSquareText className="size-4"></MessageSquareText>
														{simplifyNumber(reviews.length!!)}
													</Link>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
													<DialogHeader>
														<DialogTitle>Add a review</DialogTitle>
													</DialogHeader>
													<CreateReview
														storyId={story?.id!!}
														authorId={currentUser!!.user!!.id}
													/>
												</DialogContent>
											</Dialog>
										</TooltipTrigger>
										<TooltipContent
											className="p-0 m-0 font-mono text-xs bg-transparent border-none outline-none z-2 font-extralight"
											side="bottom"
										>
											<p
												style={{
													textShadow: "0em 0em 0.3em white",
												}}
											>
												Add a review
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										<TooltipTrigger>
											<BookmarkedButton
												storyId={story!!.id}
												isBookmarked={isBookmarked}
												bookmarkCount={bookmarkCount}
											/>
										</TooltipTrigger>
										<TooltipContent
											className="p-0 m-0 font-mono text-xs bg-transparent border-none outline-none font-extralight"
											side="bottom"
										>
											<p
												style={{
													textShadow: "0em 0em 0.3em white",
												}}
											>
												{isBookmarked
													? "Remove from library"
													: "Add to library"}
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</>
						)}
					</div>
					<p className="mb-2 font-mono text-sm text-white/60">Reviews</p>
					<div className="container h-[30vh] overflow-y-auto overflow-x-hidden border border-white/15 bg-black/10 border-solid rounded-lg p-5 flex flex-col items-start gap-3 w-full pt-4">
						{reviews!!.length == 0 ? (
							<>No reviews (yet...)</>
						) : (
							<>
								{reviews!!.map(async (rev, index) => (
									<div
										className="flex flex-col gap-2 mx-auto w-[60rem]"
										key={index}
									>
										<div className="my-2">
											<div className="flex justify-between">
												<div className="flex flex-row gap-2">
													<Link href={`/profile/${(await getUserInfo(rev.user_id)).data.name}`} className="flex gap-2">
														<img
															className="w-6 h-6 rounded-full"
															width={0}
															height={0}
															src={(await getUserInfo(rev.user_id)).data!!
																.image!! || "/icons/pfp1.png"} alt={"User profile"} />

														<h2
															style={{
																textShadow: "0em 0em 0.3em white",
															}}
															className="w-full text-sm cursor-pointer hover:underline"
														>
															{(await getUserInfo(rev.user_id)).data.name}
														</h2>
													</Link>
												</div>
												{rev.user_id == currentUser.user?.id && (
													<DeleteReview
														commentId={rev.comment_id}
														storyId={story?.id!!}
													/>
												)}
											</div>
											<p className="text-[14px] p-[0.1rem] mt-0 font-mono text-white/50">
												{rev.comment}
											</p>
										</div>
										<div className="mx-auto w-full h-[0.01rem] bg-white/5"></div>
									</div>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
