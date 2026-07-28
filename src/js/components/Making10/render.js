export function renderMaking10(data) {
	console.log(data);

	let currentNumber = Number(data.content.nums[0]);

	let target = Number(data.content.target ?? 10);

	return `
		<div class="content grid-5 gap-1 making-boxes">
			${Array.from({ length: currentNumber },(_, index) => `
				<div class="box ${index < currentNumber ? "blue" : "empty-box"}"></div>
				`).join("")}
		</div>

		<div class="content grid-5">
			<h1 class="text-center blue">
				${currentNumber}
			</h1>

			<h1 class="text-center">
				${data.content.operator}
			</h1>

			<h1 class="eqn text-center yellow">?</h1>

			<h1 class="text-center">=</h1>

			<h1 class="text-center">${target}</h1>
		</div>

		<div class="options grid-2 full-card">
			${data.options.map(option => `
				<button
					type="button"
					class="option soft-box btnAns"
					data-value="${option}">
					<h2>${option}</h2>
				</button>
			`).join("")}
		</div>
	`;
}

export function renderAfterCorrect(data){
	let currentNumber = Number(data.content.nums[0]);
	let answer = Number(data.answer);

	return `
		${Array.from({ length: currentNumber }, (_, index) => `
			<div class="box ${index < currentNumber ? "blue" : "empty-box"}"></div>
			`).join("")}
		${Array.from({ length: answer }, (_, index) => `
			<div class="box ${index < currentNumber ? "yellow" : "empty-box"}"></div>
			`).join("")}
		`
}