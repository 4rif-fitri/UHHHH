function shuffle(data) {
	const result = [...data];

	for (let index = result.length - 1; index > 0; index--) {
		const randomIndex = Math.floor(
			Math.random() * (index + 1)
		);

		[
			result[index],
			result[randomIndex]
		] = [
				result[randomIndex],
				result[index]
			];
	}

	return result;
}

function renderCubes(total) {
	return Array.from(
		{ length: Number(total) },
		(_, index) => `
			<div
				class="cube"
				data-index="${index + 1}"
			></div>
		`
	).join("");
}

function getMatchId(item) {
	return item.matchId ?? item.key;
}


function renderQuestion(item) {
	const matchId = getMatchId(item);

	const questionType =
		item.questionDisplay ??
		(item.type === "object" ? "cubes" : "text");

	if (questionType === "cubes") {
		return `
			<button
				type="button"
				class="padankan-cube-container boxSoalan soft-box flex-wrap"
				data-match-id="${matchId}"
			>
				${renderCubes(item.question)}
			</button>
		`;
	}

	return `
		<button
			type="button"
			class="boxSoalan soft-box"
			data-match-id="${matchId}"
		>
			<h1>${item.question}</h1>
		</button>
	`;
}

function renderAnswer(item) {
	const matchId = getMatchId(item);

	const answerType =
		item.answerDisplay ?? "text";

	if (answerType === "cubes") {
		return `
			<button
				type="button"
				class="padankan-cube-container boxJawapan soft-box flex-wrap"
				data-match-id="${matchId}"
			>
				${renderCubes(item.answer)}
			</button>
		`;
	}

	return `
		<button
			type="button"
			class="boxJawapan soft-box"
			data-match-id="${matchId}"
		>
			<h1>${item.answer}</h1>
		</button>
	`;
}

export function renderPadankan(data) {
	const answers = shuffle(data.content);

	return `
		<div class="grid-2 w-100 p-2 gap-3 padankan">

			<div class="left-content">
				${data.content
			.map(renderQuestion)
			.join("")}
			</div>

			<div class="right-content">
				${answers
			.map(renderAnswer)
			.join("")}
			</div>

		</div>
	`;
}