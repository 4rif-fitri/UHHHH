function createCubes(total, group) {
	return Array.from(
		{ length: total },
		(_, index) => {
			return `
				<div class="cube-target">
					<div
						class="cube"
						data-group="${group}"
					>
						<span class="cube-number">
							${index + 1}
						</span>
					</div>
				</div>
			`;
		}
	).join("");
}

function createTargets(total) {
	return Array.from(
		{ length: total },
		() => {
			return `
				<div class="cube-target"></div>
			`;
		}
	).join("");
}

export function renderGabungKumpulan(data) {
	// const { group1, group2, operator } = data.content;
	// const total = group1 + group2;

	// return `
	// 	<div class="output-wrapper">

	// 		<section class="group-container group1-container">
	// 			<h2>Kumpulan 1</h2>

	// 			<div class="group1 source-group">
	// 				${createCubes(group1, 1)}
	// 			</div>
	// 		</section>

	// 		<section class="group-container group2-container">
	// 			<h2>Kumpulan 2</h2>

	// 			<div class="group2 source-group">
	// 				${createCubes(group2, 2)}
	// 			</div>
	// 		</section>

	// 		<section class="merge-group">
	// 			<h2>Kumpulan Gabung</h2>

	// 			<div class="merge target-frame">
	// 				${createTargets(total)}
	// 			</div>
	// 		</section>

	// 		<section class="content grid-5" id="equation">
	// 			<h1 class="text-center blue">${group1}</h1>
	// 			<h1 class="text-center">${operator}</h1>
	// 			<h1 class="eqn text-center yellow">${group2}</h1>
	// 			<h1 class="text-center">=</h1>
	// 			<h1 class="text-center eqn equation-answer"></h1>
	// 		</section>

	// 	</div>
	// `;

	return `
		<div class="output-wrapper">

		<section class="group1-container">
			<h2>Kumpulan 1</h2>
			<div class="group1 sourceFrame">
				<div class="cube-target">
					<div class="cube"></div>
				</div>
				<div class="cube-target">
					<div class="cube"></div>
				</div>
				<div class="cube-target">
					<div class="cube"></div>
				</div>
			</div>
		</section>

		<section class="group2-container">
			<h2>Kumpulan 2</h2>
			<div class="group2 sourceFrame">
				<div class="cube-target">
					<div class="cube"></div>
				</div>
				<div class="cube-target">
					<div class="cube"></div>
				</div>
				<div class="cube-target">
					<div class="cube"></div>
				</div>
			</div>
		</section>
		<br>
		<hr>
		<section class="merge-group">
			<h2>Kumpulan Gabung</h2>
			<span class="cube-number"></span>
			<div class="merge targetFrame">
				<div class="cube-target"></div>
				<div class="cube-target"></div>
				<div class="cube-target"></div>
				<div class="cube-target"></div>
				<div class="cube-target"></div>
				<div class="cube-target"></div>
			</div>
		</section>
		<br>
		<hr>
		<section class="content grid-5" id="equation">
			<h1 class="text-center blue">5</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center yellow">5</h1>
			<h1 class="text-center">=</h1>
			<h1 class="text-center eqn"></h1>
		</section>
	</div>
	`
}