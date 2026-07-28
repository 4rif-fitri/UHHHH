export function renderPadankan(data) {
	const answers = [...data.content]
		.sort(() => Math.random() - 0.5);

	return `
		<div class="grid-2 w-100 p-2 gap-3 padankan">

			<div class="left-content">
				${data.content.map(item =>  {
					console.log(item);
					
					if (item.type === "object")
						return `
						<div class="padankan-cube-container boxSoalan soft-box" data-key="${item.key}">
							${Array.from({ length: item.question }, (_, index) => `
								<div class="cube" data-index="${index + 1}"></div>
							`).join("")}
						</div>
						`
					else
						return `<button class="boxSoalan soft-box"
								data-answer="${item.answer}"
								data-key="${item.key}">
								<h1>${item.question}</h1> 
							</button>`
				}
			).join("")}
			</div>

			<div class="right-content">

					${answers.map(item => `
					<button
						class="boxJawapan soft-box"
						data-value="${item.answer}"
						data-key="${item.key}"
					>
						<h1>${item.answer}</h1>
					</button>
				`).join("")}
			</div>

		</div>
	`;
}