export function renderChoiseQuiz(data) {
	const currentNumber =
		Number(data.content.nums[0]);

	const target =
		Number(data.content.target ?? 10);

	return `
		<div class="content grid-5">
			<h1 class="text-center blue">
				${currentNumber}
			</h1>

			<h1 class="text-center">
				${data.content.operator}
			</h1>

			<h1 class="eqn text-center yellow">
				?
			</h1>

			<h1 class="text-center">
				=
			</h1>

			<h1 class="text-center">
				${target}
			</h1>
		</div>

		<div class="options grid-2 full-card">
			${data.options.map(option => `
				<button
					type="button"
					class="option soft-box btnAns"
					data-value="${option}"
				>
					<h2>${option}</h2>
				</button>
			`).join("")}
		</div>
	`;
}