function createCubes(total) {
	return Array.from(
		{ length: total },
		() => `<div class="cube"></div>`
	).join("");
}

function createTargets(total) {
	return Array.from(
		{ length: total },
		() => `<div class="cube-target"></div>`
	).join("");
}

export function renderAnimationLearnPelengkap10(data) {
	const {
		firstNumber,
		secondNumber,
		target = 10
	} = data.content;

	const needed =
		target - firstNumber;

	return `
		<div class="soalan-container">
			<div class="soalan-num1">
				<h1>${firstNumber}</h1>
			</div>

			<h1>+</h1>

			<div class="soalan-num2">
				<h1>${secondNumber}</h1>
			</div>
		</div>

		<div class="cubee-container">

			<div class="cubee-container-left">
				${createCubes(firstNumber)}
				${createTargets(needed)}
			</div>

			<div class="cubee-container-right">
				${createCubes(secondNumber)}
			</div>

		</div>

		<br><br>

		<div class="soalan-container col-5">

			<div class="soalan-num1">
				<h1 class="equation-first">
					${firstNumber}
				</h1>
			</div>

			<h1>+</h1>

			<div class="soalan-num2">
				<h1 class="equation-second">
					${secondNumber}
				</h1>
			</div>

			<h1>=</h1>

			<div class="soalan-num2">
				<h1 class="equation-answer">?</h1>
			</div>

		</div>
	`;
}