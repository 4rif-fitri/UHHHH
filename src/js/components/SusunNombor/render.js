export function renderSusunNombor(data) {
	const numbers = data.content.numbers;

	return `
		<div class="kecil-besar">
			<p class="text1">Kecil</p>
			<div class="arrow"></div>
			<p class="text2">Besar</p>
		</div>

		<div class="container-drop-susun">
			${numbers.map(() => `
				<div class="box-drop-susun"></div>
			`).join("")}
		</div>

		<h3>Seret kad ke ruang kosong</h3>

		<div class="container-kad-susun">
			${numbers.map(number => `
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