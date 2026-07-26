function shuffle(data) {
	return [...data].sort(
		() => Math.random() - 0.5
	);
}

export function renderMemoryGame(data) {
	const deck = data.content.flatMap(
		(item, index) => [
			{
				id: `${index}-question`,
				type: "question",
				value: item.question,
				match: item.answer
			},
			{
				id: `${index}-answer`,
				type: "answer",
				value: item.answer,
				match: item.answer
			}
		]
	);

	return `
		<div class="memory-container grid-4">
			${shuffle(deck).map((card,idx) => `
				<button
					class="card"
					data-id="${card.id}"
					data-type="${card.type}"
					data-match="${card.match}"
				>
					<div class="innerCard">

						<div class="back">
							<h2>${card.value}</h2>
						</div>

						<div class="front">
							<h1>${idx % 2 === 1 ? "📗" : "📙"}</h1>
						</div>

					</div>
				</button>
			`).join("")}
		</div>
	`;
}