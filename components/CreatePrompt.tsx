import { Textarea } from "@/components/ui/textarea"
import { submitPrompt } from "@/utils/actions/submitPrompt"

export default async function CreatePrompt() {
	return (
		<>
			<form className="w-full flex flex-col items-center gap-10">
				<Textarea placeholder="What is your story about?" id="prompt" />
				<button className="p-[3px] relative" formAction={submitPrompt}>
					<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
					<div className="px-4 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
						Create your interactive story
					</div>
				</button>
			</form>
		</>
	)
}
