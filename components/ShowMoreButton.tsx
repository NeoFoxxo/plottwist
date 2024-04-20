"use client"
import Link from "next/link"
import { Button } from "./ui/button"

export default function ShowMoreButton({ storyCount }: { storyCount: number }) {
	return (
		<Link href={`/app?stories=${storyCount + 20}`}>
			<div className="flex mt-5">
				<Button className="mx-auto w-28">Show More</Button>
			</div>
		</Link>
	)
}
