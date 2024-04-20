import { useMutation } from "@tanstack/react-query"
import { StoryReturnTypes } from "../actions/database/insertStory"
import { continueStory } from "../actions/api/continueStory"

export function useContinuePrompt({
	setScenario,
	setErrorMessage,
	setStoryParts,
}: {
	setStoryParts: React.Dispatch<React.SetStateAction<string[]>>
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
			setScenario(data.scenario)
			setStoryParts((storyParts) => [...storyParts, data.currentPart])
		},
		onError: (error) => {
			setErrorMessage(`${error}`)
		},
		retry: 4,
	})
}
