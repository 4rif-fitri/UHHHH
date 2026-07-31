function createCubes(total) {
	return Array.from(
		{ length: total },
		() => `
		<div class="cube-target s">
			<div class="cube s"></div>
		</div>`
	).join("");
}

function createTargets(total) {
	return Array.from(
		{ length: total },
		() => `<div class="cube-target s"></div>`
	).join("");
}

export function renderAnimationLearnPecahWhole(data) {
	const {
		part1,
		part2
	} = data.content;

	const whole =
		part1 + part2;

	return `
		<div class="whole-container">

			<div class="whole double-arrow">
				<h2>Whole</h2>

				<div>
					${createCubes(whole)}
				</div>
			</div>

		</div>

		<div class="part-container">

			<div class="part1">
				<div>
					${createTargets(part1)}
				</div>

				<h2>Part</h2>
			</div>

			<div class="part2">
				<div>
					${createTargets(part2)}
				</div>

				<h2>Part</h2>
			</div>

		</div>
	`;
}