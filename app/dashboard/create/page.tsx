import CreatePrompt from "@/components/CreatePrompt"

export default async function Create() {
	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<main className="pt-10 flex-1 text-center flex flex-col gap-3">
				<h1 className="font-bold text-4xl mb-1">
					Create your own interactive story
				</h1>
				<h2 className="text-1xl mb-5">
					Write about a scenario and make different choices to affect the
					stories outcome
				</h2>
				<CreatePrompt />
			</main>
		</div>
	)
}
