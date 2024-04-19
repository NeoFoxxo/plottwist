"use client"
import { BotIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
export default function RemixButton({ storyId }: { storyId: number }) {
	const [remixLoading, setRemixLoading] = useState(false)
	const router = useRouter()

	function onRemixClick() {
		setRemixLoading(true)
		router.replace(`/app/create?remix=${storyId}`)
	}

	return (
		<Button variant={"outline"}>
			{remixLoading ? (
				<Loader2 className="animate-spin h-4 w-4 mx-4 my-2" />
			) : (
				<BotIcon
					className="size-5 mx-4 my-2"
					onClick={() => {
						onRemixClick()
					}}
				/>
			)}
		</Button>
	)
}
