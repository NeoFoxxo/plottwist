"use server"

export async function submitPrompt({ prompt }: { prompt: string }) {
	const res = await fetch(`${process.env.AI_API_URL}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt: prompt,
		}),
	})

	if (!res.ok) {
		const errorMessage = await res.json()
		throw new Error(errorMessage)
	}
	// TODO: insert story and prompt into db
	const data = await res.json()

	// TODO: return the id of inserted row
	return data.result
}
