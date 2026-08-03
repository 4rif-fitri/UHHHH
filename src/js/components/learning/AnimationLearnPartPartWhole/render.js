function createPartCubes(total) {
	return Array.from(
		{ length: total },
		() => `
			<div class="cube-target s">
				<div class="cube s"></div>
			</div>
		`
	).join("");
}

function createWholeTargets(total) {
	return Array.from(
		{ length: total },
		() => `<div class="cube-target s"></div>`
	).join("");
}

export function renderAnimationLearnGabungPart(data) {
	const {
		part1,
		part2
	} = data.content;

	const whole =
		part1 + part2;

	return `
		<div class="part-container">

			<div class="part1">
				<h2>Part</h2>

				<div>
					${createPartCubes(part1)}
				</div>
			</div>

			<div class="part2">
				<h2>Part</h2>

				<div>
					${createPartCubes(part2)}
				</div>
			</div>

		</div>

		<div class="whole-container-bawah">

			<div class="whole double-arrow-invers">
				<div>
					${createWholeTargets(whole)}
				</div>

				<h2>Whole</h2>
			</div>

		</div>
	`;
}