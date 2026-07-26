export function renderPadankan(data) {
	const answers = [...data.content]
		.sort(() => Math.random() - 0.5);

	return `
		<div class="grid-2 w-100 gap-3 p-2 padankan">

			<div class="left-content">
				${data.content.map(item => `
					<button
						class="boxSoalan soft-box"
						data-answer="${item.answer}"
					>
						<h1>${item.question}</h1> 
					</button>
				`).join("")}
			</div>

			<div class="right-content">
				${answers.map(item => `
					<button
						class="boxJawapan soft-box"
						data-value="${item.answer}"
					>
						<h1>${item.answer}</h1>
					</button>
				`).join("")}
			</div>

		</div>
	`;
}