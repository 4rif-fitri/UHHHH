function createCubes(total, group) {
	return Array.from({ length: total },(_, index) => `
		<div class="cube"
			style="padding: 2rem"
			data-group="${group}"
			data-index="${index}">
		</div>`
	).join("");
}

export function renderPilihJumlahLego(data) {
	const {group1,group2,operator} = data.content;

	return `
		<div class="pilih-jumlah-lego">

			<div class="visual-equation">

				<div class="visual-group">
					<div class="lego-row">${createCubes(group1, 1)}</div>
					<!-- <div class="number-card">${group1}</div> -->

				</div>

				<h1>${operator}</h1>

				<div class="visual-group">
					<div class="lego-row">${createCubes(group2, 2)}</div>
					<!-- <div class="number-card">${group2}</div> -->
				
					</div>

				<h1 class="text-center">=</h1>

				<div class="number-card answer-box"></div>

			</div>

			<div class="options grid-2">
				${data.options.map(option => `
					<button type="button"
						class="option soft-box btnAns p-2"
						data-value="${option}">
						<h2>${option}</h2>
					</button>
				`).join("")}
			</div>

		</div>
	`;
}