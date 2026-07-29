function createCubes(total, group) {
	return Array.from({ length: total },(_, index) => {
			return `
				<div class="cube-target">
					<div
						class="cube"
						data-group="${group}"
						data-index="${index}"
					>
						<span class="cube-number"></span>
					</div>
				</div>
			`;
		}
	).join("");
}

function createTargets(total) {
	return Array.from({ length: total },
		() => `<div class="cube-target"></div>` 
	).join("");
}

export function renderGabungKumpulan(data) {
	const { group1, group2, operator = "+" } = data.content;
	const total = group1 + group2;

	return `
		<div class="output-wrapper">

			<section class="group1-container">
				<h2>
					Kumpulan 1
				</h2>

				<div class="group1 sourceFrame">
					${createCubes(group1, 1)}
				</div>
			</section>

			<section class="group2-container">
				<h2>
					Kumpulan 2
				</h2>

				<div class="group2 sourceFrame">
					${createCubes(group2, 2)}
				</div>
			</section>

			<br>
			<hr>

			<section class="merge-group">
				<h2>Kumpulan Gabung</h2>

				<div class="merge targetFrame">
					${createTargets(total)}
				</div>
			</section>

			<br>
			<hr>

			<section class="content grid-5 equation" id="equation">
				<h1 class="text-center square blue">${group1}</h1>
				<h1 class="text-center square">${operator}</h1>
				<h1 class="text-center square yellow">${group2}</h1>
				<h1 class="text-center square">=</h1>
				<h1 class="text-center square eqn equation-answer"></h1>
			</section>

		</div>
	`;
}