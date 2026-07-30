// function createCubes(part) {
// 	return Array.from(
// 		{ length: part.total },
// 		(_, index) => `
// 			<div
// 				class="cube cube-${part.color}"
// 				data-index="${index}"
// 			>
// 				<span class="cube-count">
// 					${index + 1}
// 				</span>
// 			</div>
// 		`
// 	).join("");
// }

function createCubes(part) {
	return Array.from(
		{ length: part.total },
		() => `
			<div
				class="cube cube-${part.color}"
			></div>
		`
	).join("");
}

export function renderGabungPartWhole(data) {
	const { part1, part2 } = data.content;

	const whole =
		part1.total + part2.total;

	return `
		<div class="gpw-wrapper">

			<div class="gpw-parts">

				<section class="gpw-part part-one">
					<h2>Part</h2>

					<div class="gpw-box">
						<div class="gpw-cube-row">
							${createCubes(part1)}
						</div>
					</div>

					<p class="part-count">
						${part1.total}
					</p>
				</section>

				<section class="gpw-part part-two">
					<h2>Part</h2>

					<div class="gpw-box">
						<div class="gpw-cube-row">
							${createCubes(part2)}
						</div>
					</div>

					<p class="part-count">
						${part2.total}
					</p>
				</section>

			</div>

			<div class="hidden"></div>

			<br><br><br>
			
			<section class="gpw-whole hidden gpw-arrows">
				<div class="gpw-box whole-box">
					<div class="gpw-cube-row">
						${createCubes(part1)}
						${createCubes(part2)}
					</div>
				</div>

				<h2>Whole</h2>
			</section>

			<div class="gpw-summary hidden">
				<h2>
					${part1.total} +
					${part2.total} =
					${whole}
				</h2>

				<p>
					Dua bahagian digabungkan menjadi
					satu keseluruhan.
				</p>
			</div>

		</div>
	`;
}