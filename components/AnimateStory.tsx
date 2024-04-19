"use client"

import { splitStoryIntoParagraphs } from "@/utils/splitStoryIntoParagraphs"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { useState, useEffect } from "react"

export default function AnimateStory({ story }: { story: string | null }) {
	if (story?.length!! < 1400) {
		return (
			<TextGenerateEffect
				className="max-w-4xl tracking-wider"
				words={story!!}
			/>
		)
	}

	const [index, setIndex] = useState(0)
	const storyParts = splitStoryIntoParagraphs(story!!)

	// this changes the index of the map every 10 seconds
	useEffect(() => {
		if (index < storyParts.length) {
			if (index === 0) {
				setIndex(index + 1)
			} else {
				const timer = setTimeout(() => {
					setIndex(index + 1)
				}, 10500)
				return () => clearTimeout(timer)
			}
		}
	}, [index])

	return (
		<article>
			{storyParts.slice(0, index).map((storyPart) => (
				<TextGenerateEffect
					className="max-w-4xl tracking-wider pb-5"
					words={storyPart}
				/>
			))}
		</article>
	)
}
