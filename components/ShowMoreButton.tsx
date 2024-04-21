"use client"
import Link from "next/link"
import { Button } from "./ui/button"

export default function ShowMoreButton({
	storyCount,
	section,
}: {
	storyCount: number
	section: "mostPopular" | "recentStories"
}) {
	let link = `/app?recentStoryCount=${storyCount + 20}`
	if (section === "mostPopular") {
		link = `/app?mostPopularCount=${storyCount + 20}`
	}

	return (
		<Link href={link}>
			<div className="flex mt-5">
				<Button className="mx-auto w-28">Show More</Button>
			</div>
		</Link>
	)
}
