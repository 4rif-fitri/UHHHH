function createStartCubes(total) {
	return Array.from(
		{ length: total },
		() => {
			return `
				<div class="addition-slot filled">
					<div class="cube start-cube"></div>
				</div>
			`;
		}
	).join("");
}

function createTargets(total) {
	return Array.from(
		{ length: total },
		(_, index) => {
			return `
				<div
					class="addition-slot add-target"
					data-target-index="${index}"
				></div>
			`;
		}
	).join("");
}

function createExtraCubes(total) {
	return Array.from(
		{ length: total },
		(_, index) => {
			return `
				<div
					class="cube extra-cube"
					data-extra-index="${index}"
				></div>
			`;
		}
	).join("");
}

function createOptions(options) {
	return options.map(option => {
		return `
			<button
				type="button"
				class="option soft-box btnAns p-2"
				data-value="${option}"
			>
				<h2>${option}</h2>
			</button>
		`;
	}).join("");
}

export function renderTambahDragLego(data) {
	const {
		start,
		add,
		operator = "+"
	} = data.content;

	return `
		<div class="tambah-drag-lego">

			<p class="drag-instruction">
				Seret Lego hijau ke petak kosong
			</p>

			<div class="addition-frame">
				${createStartCubes(start)}
				${createTargets(add)}
			</div>

			<div class="extra-area">
				<h3>Lego tambahan</h3>

				<div class="extra-cubes">
					${createExtraCubes(add)}
				</div>
			</div>

			<div class="addition-equation">
				<div class="number-box start-box">
					${start}
				</div>

				<h1>${operator}</h1>

				<div class="number-box add-box">
					${add}
				</div>

				<h1>=</h1>

				<div class="number-box answer-box">
					?
				</div>
			</div>

			<div class="answer-section hidden">
				<h3>Pilih jumlah semua Lego</h3>
				<br>
				<div class="options">
					${createOptions(data.options)}
				</div>
			</div>

		</div>
	`;
}