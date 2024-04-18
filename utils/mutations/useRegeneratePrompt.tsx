import { useMutation } from "@tanstack/react-query"
import { submitPrompt } from "../actions/api/submitPrompt"
import { StoryReturnTypes } from "../actions/database/insertStory"
import { regenerateStory } from "../actions/api/regenerateStory"

export function useRegeneratePrompt({
	setScenario,
	setErrorMessage,
}: {
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
			setScenario(data)
		},
		onError: (error) => {
			setErrorMessage(`Could not regenerate story: ${error}`)
		},
		retry: 3,
	})
}
