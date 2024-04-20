import { useMutation } from "@tanstack/react-query"
import { StoryReturnTypes } from "../actions/database/insertStory"
import { regenerateStory } from "../actions/api/regenerateStory"

export function useRegeneratePrompt({
	setScenario,
	setErrorMessage,
	setStoryParts,
}: {
	setStoryParts: React.Dispatch<React.SetStateAction<string[]>>
	setScenario: React.Dispatch<React.SetStateAction<StoryReturnTypes | null>>
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}) {
	return useMutation({
		mutationKey: ["regeneratePrompt"],
		mutationFn: ({
			prompt,
			previousStoryId,
		}: {
			prompt: string
			previousStoryId: number
		}) => regenerateStory({ prompt, previousStoryId }),
		onSuccess: (data) => {
			setScenario(data.scenario)
			setStoryParts([data.currentPart])
		},
		onError: (error) => {
			setErrorMessage(`${error}`)
		},
		retry: 4,
	})
}
