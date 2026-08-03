export function renderNumpadQuiz() {
	return `
<section class="numpadContainer">
	<div class="numpadWrapper">
		${[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(number => `
				<button class="soft-box numpad"
					data-number="${number}">
					${number}
				</button>
			`).join("")}
		<button class="soft-box btnDel">DEL</button>
		<button class="soft-box btnCheck" disabled>CHECK</button>
		<button class="soft-box btnContinue hidden">NEXT</button>
	</div>
</section>
	`;
}

export function renderEquation(data) {
	const { nums, operator } = data.content;
	const totalColumns = (nums.length * 2) + 1;
	console.log(data);
	console.log(totalColumns);
	
	const equation = nums
		.map((number, index) => {
			const operatorHtml =
				index < nums.length - 1
					? `<h1>${operator}</h1>`
					: "";

			return `
				<h1>${number}</h1>
				${operatorHtml}
			`;
		})
		.join("");

	return `
		<section>
			<div class="lineEqn" style="grid-template-columns: repeat(${totalColumns}, 1fr);">
				${equation}
				<h1>=</h1>
				<h1 class="eqn">?</h1>
			</div>
		</section>
	`;
}