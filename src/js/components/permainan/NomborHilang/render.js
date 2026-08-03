export function renderNomborHilang(data) {
	const {
		sequence,
		options
	} = data.content;

	return `
		<div class="kecil-besar">
			<p class="text1">Kecil</p>
			<div class="arrow"></div>
			<p class="text2">Besar</p>
		</div>

		<div class="container-drop-susun">
			${sequence.map(number => {
		if (number === null) {
			return `
						<div class="box-drop-susun"></div>
					`;
		}

		return `
					<div class="box-drag-susun fixed-card">
						${number}
					</div>
				`;
	}).join("")}
		</div>

		<h3>Seret kad ke petak kosong</h3>

		<div class="container-kad-susun">
			${options.map(number => `
				<div
					class="box-drag-susun"
					data-value="${number}"
				>
					${number}
				</div>
			`).join("")}
		</div>
	`;
}