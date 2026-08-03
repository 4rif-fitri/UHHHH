function createCubes(total, color) {
	return Array.from(
		{ length: total },
		() => `
			<div class="ppw-cube ${color}">
				<div class="cube-circle"></div>
			</div>
		`
	).join("");
}

export function renderPartPartWholeVisual(data) {
	const { part1, part2 } = data.content;
	const whole = part1 + part2;

	return `
		<div class="ppw-wrapper">

			<section class="ppw-whole">
				<h2>Whole</h2>
				<p class="whole-total hidden">
					Jumlah keseluruhan ialah
					<strong>${whole}</strong>
				</p>
				<div class="ppw-box whole-box">
					<div class="cube-row">
						${createCubes(
		part1,
		"blue-cube"
	)}

						${createCubes(
		part2,
		"red-cube"
	)}
					</div>
				</div>


			</section>

			<div class="ppw-arrows hidden"></div>

			<div class="ppw-parts hidden">

				<section class="part-one">
					<div class="ppw-box">
						<div class="cube-row">
							${createCubes(
		part1,
		"blue-cube"
	)}
						</div>
					</div>

					<h2>Part: ${part1}</h2>
				</section>

				<section class="part-two">
					<div class="ppw-box">
						<div class="cube-row">
							${createCubes(
		part2,
		"red-cube"
	)}
						</div>
					</div>

					<h2>Part: ${part2}</h2>
				</section>

			</div>

			<div class="ppw-summary hidden">
				<h2>
					${part1} + ${part2} = ${whole}
				</h2>

				<p>
					Dua bahagian membentuk satu
					keseluruhan.
				</p>
			</div>

		</div>
	`;
}