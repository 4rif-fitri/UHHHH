export function renderTrueFalse(data) {
	return `
		<div class="content grid-5">
			<h1>${data.content.nums[0]}</h1>
			<h1>+</h1>
			<h1>${data.content.nums[1]}</h1>
			<h1>=</h1>
			<h1>${data.content.nums[2]}</h1>
		</div>

		<div class="options grid-2">
			${data.options.map(option => `
				<button
					class="option soft-box btnAns"
					data-status="${option}"
				>
					<h2>${option}</h2>
				</button>
			`).join("")}
		</div>
	`;
}
