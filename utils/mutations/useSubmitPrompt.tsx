import { useMutation } from "@tanstack/react-query"
import { submitPrompt } from "../actions/api/submitPrompt"
import { StoryReturnTypes } from "../actions/database/insertStory"

export function useSubmitPrompt({
	setIsDisabled,
	setIsFormOpen,
	setScenario,
	setPrompt,
	setErrorMessage,
}: {
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
	setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
	setScenario: React.Dispatch<React.SetStateAction<StoryReturnTypes | null>>
	setPrompt: React.Dispatch<React.SetStateAction<string>>
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}) {
	return useMutation({
		mutationKey: ["submitPrompt"],
		mutationFn: (values: { prompt: string }) => submitPrompt(values),
		onSuccess: (data) => {
			setIsDisabled(true)
			setIsFormOpen(false)
			setScenario(data)
			setPrompt(data.prompt ? data.prompt : "")
		},
		onError: (error) => {
			setErrorMessage(`Could not create story: ${error}`)
		},
		retry: 3,
	})
}
