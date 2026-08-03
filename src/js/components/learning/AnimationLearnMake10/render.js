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

export function renderAnimationLearnMake10(data) {
	const {
		firstNumber,
		target = 10
	} = data.content;

	const needed =
		target - firstNumber;

	return `
		<div class="tambah-drag-lego">

			<div class="extra-area">
				<div class="extra-cubes">
					${createCubes(needed)}
				</div>
			</div>

			<div class="addition-frame col-5">
				${createCubes(firstNumber)}
				${createTargets(needed)}
			</div>

			<div class="addition-equation">

				<div class="number-box start-box">
					${firstNumber}
				</div>

				<h1>+</h1>

				<div class="number-box add-box">
					${needed}
				</div>

				<h1>=</h1>

				<div class="number-box answer-box">
					?
				</div>

			</div>

		</div>
	`;
}