import { useMutation } from "@tanstack/react-query"
import { StoryReturnTypes } from "../actions/database/insertStory"
import { finishStory } from "../actions/api/finishStory"

export function useFinishPrompt({
	setScenario,
	setErrorMessage,
}: {
	setScenario: React.Dispatch<React.SetStateAction<StoryReturnTypes | null>>
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}) {
	return useMutation({
		mutationKey: ["finishStory"],
		mutationFn: ({
			prompt,
			previousStoryId,
			title,
			currentStory,
		}: {
			prompt: string
			previousStoryId: number
			title: string
			currentStory: string
		}) => finishStory({ prompt, previousStoryId, currentStory, title }),
		onSuccess: (data) => {
			setScenario(data)
		},
		onError: (error) => {
			setErrorMessage(`Could not finish story: ${error}`)
		},
		retry: 3,
	})
}
