export interface AIResponse {
	response: { story: string }
	choices: { choices: string[] }
	title: { title: string }
}

export interface AIContinueResponse {
	response: { response: string }
	choices: { choices: string[] }
	title: { title: string }
}
