import { useMutation } from "@tanstack/react-query"
import { StoryReturnTypes } from "../actions/database/insertStory"
import { continueStory } from "../actions/api/continueStory"

export function useContinuePrompt({
	setScenario,
	setErrorMessage,
}: {
	setScenario: React.Dispatch<React.SetStateAction<StoryReturnTypes | null>>
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}) {
	return useMutation({
		mutationKey: ["continueStory"],
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
		}) => continueStory({ prompt, previousStoryId, currentStory, title }),
		onSuccess: (data) => {
			setScenario(data)
		},
		onError: (error) => {
			setErrorMessage(`Could not continue story: ${error}`)
		},
		retry: 3,
	})
}
