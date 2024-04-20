"use client"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/client"

export default function StoryLimitCard({
	stories,
	userId,
}: {
	stories: number
	userId: string
}) {
	const [storyCount, setStoryCount] = useState(stories)
	const supabase = createClient()

	// checks if a field in the profile for the user has been updated in real time
	useEffect(() => {
		supabase
			.channel("schema-db-changes")
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "profiles",
					filter: `user_id=eq.${userId}`,
				},
				(payload) => setStoryCount((storyCount) => storyCount + 1)
			)
			.subscribe()
	}, [])

	return (
		<Card className="mb-4 border-none overflow-hidden bg-black/50">
			<div className="hidden opacity-0 group-hover:block group-hover:opacity-100">
				<CardHeader className="text-2xl font-bold">
					<h2>{storyCount}/10 Stories Generated</h2>
				</CardHeader>
				<CardContent className="hidden opacity-0 group-hover:block group-hover:opacity-100">
					<p className="text-xs">This limit will be reset at 12AM GMT</p>
				</CardContent>
			</div>
			<div className="block opacity-100 group-hover:hidden group-hover:opacity-0 text-center mx-auto">
				{storyCount}/10
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
				<div
					className="bg-blue-600 h-2.5 rounded-full"
					style={{ width: storyCount?.toString() + "0%" }}
				></div>
			</div>
		</Card>
	)
}
