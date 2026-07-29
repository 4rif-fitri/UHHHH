function createCubes(part) {
	return Array.from(
		{ length: part.total },
		() => `
			<div class="cube cube-${part.color}"></div>
		`
	).join("");
}

export function renderPecahWholeKepadaPart(data) {
	const { part1, part2 } = data.content;
	const whole = part1.total + part2.total;

	return `
		<div class="pwp-wrapper">

			<!-- WHOLE SEBELAH KIRI -->
			<section class="pwp-whole">
				<h2>Whole</h2>

				<div class="whole-group group-one">
					${createCubes(part1)}
				</div>

				<div class="whole-group group-two">
					${createCubes(part2)}
				</div>

				<p class="whole-count">
					Whole = ${whole}
				</p>
			</section>

			<!-- PART SEBELAH KANAN -->
			<div class="pwp-parts">

				<section class="pwp-part part-one hidden">
					<h2>Part</h2>

					<div class="part-cubes">
						${createCubes(part1)}
					</div>

					<p>
						Part = ${part1.total}
					</p>
				</section>

				<section class="pwp-part part-two hidden">
					<h2>Part</h2>

					<div class="part-cubes">
						${createCubes(part2)}
					</div>

					<p>
						Part = ${part2.total}
					</p>
				</section>

			</div>

			<div class="pwp-summary hidden">
				<h2>
					${whole} =
					${part1.total} +
					${part2.total}
				</h2>
			</div>

		</div>
	`;
}