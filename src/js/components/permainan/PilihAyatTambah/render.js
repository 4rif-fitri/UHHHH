function createCubes(total, className) {
	return Array.from(
		{ length: total },
		() => `
			<div class="ayat-cube ${className}">
				<div class="cube-circle"></div>
			</div>
		`
	).join("");
}

export function renderPilihAyatTambah(data) {
	const { group1, group2 } = data.content;

	return `
		<div class="pilih-ayat-tambah">

			<div class="cube-equation">
				<div class="cube-row">
					${createCubes(
		group1,
		"cube-group-one"
	)}

					${createCubes(
		group2,
		"cube-group-two"
	)}
				</div>
			</div>

			<div class="options grid-2">
				${data.options.map(option => `
					<button
						type="button"
						class="option soft-box btnAns"
						data-value="${option}"
					>
						<h2>${option}</h2>
					</button>
				`).join("")}
			</div>

		</div>
	`;
}