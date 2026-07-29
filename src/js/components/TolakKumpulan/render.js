function createCubes(total) {
	return Array.from(
		{ length: total },
		(_, index) => {
			return `
				<div class="cube-target">
					<div
						class="cube"
						data-index="${index}"
					>
						<span class="cube-number"></span>
					</div>
				</div>
			`;
		}
	).join("");
}

function createDeleteTargets(total) {
	return Array.from(
		{ length: total },
		() => {
			return `
				<div class="delete-target">
					<span class="delete-icon">×</span>
				</div>
			`;
		}
	).join("");
}

export function renderTolakKumpulan(data) {
	const {
		total,
		remove,
		operator = "-"
	} = data.content;

	return `
		<div class="output-wrapper">

			<section class="group1-container">
				<h2>
					Kumpulan Asal: ${total}
				</h2>

				<div class="group1 sourceFrame">
					${createCubes(total)}
				</div>
			</section>

			<section class="delete-container">
				<h2>
					Tempat Tolak: ${remove}
				</h2>

				<div class="deleteFrame">
					${createDeleteTargets(remove)}
				</div>
			</section>

			<hr>

			<section
				class="content grid-5 equation"
				id="equation"
			>
				<h1 class="text-center blue">
					${total}
				</h1>

				<h1 class="text-center">
					${operator}
				</h1>

				<h1 class="text-center yellow">
					${remove}
				</h1>

				<h1 class="text-center">=</h1>

				<h1
					class="text-center equation-answer"
				>
					?
				</h1>
			</section>

		</div>
	`;
}