export async function submitPrompt() {
	"use server"
	const res = await fetch(`${process.env.AI_API_URL}/start`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userid: "e22e2e",
			prompt: "test",
		}),
	})
	if (!res.ok) {
		const errorMessage = await res.json()
		console.log(errorMessage)
	}
	const data = await res.json()
	console.log(data)
}
