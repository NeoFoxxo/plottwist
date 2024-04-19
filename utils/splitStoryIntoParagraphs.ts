export function splitStoryIntoParagraphs(story: string) {
	// Split the text into sentences
	const sentences = story.split(". ")

	// Calculate the number of sentences per paragraph
	const sentencesPerParagraph = Math.ceil(sentences.length / 4)

	// Group the sentences into paragraphs
	let paragraphs = []
	for (let i = 0; i < 4; i++) {
		const start = i * sentencesPerParagraph
		const end = start + sentencesPerParagraph
		paragraphs[i] = sentences.slice(start, end).join(". ")
	}

	return paragraphs
}
