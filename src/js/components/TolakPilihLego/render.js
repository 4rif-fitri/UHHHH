function createCubes(total) {
	return Array.from(
		{ length: total },
		(_, index) => {
			return `
				<button
					type="button"
					class="cube lego-remove"
					data-index="${index}"
				>
					<span class="remove-symbol">×</span>
				</button>
			`;
		}
	).join("");
}

function createOptions(options) {
	return options.map(option => {
		return `
			<button
				type="button"
				class="option soft-box btnAns"
				data-value="${option}"
			>
				<h2>${option}</h2>
			</button>
		`;
	}).join("");
}

export function renderTolakPilihLego(data) {
	const {
		total,
		remove,
		operator = "-"
	} = data.content;

	return `
		<div class="tolak-pilih-lego">

			<div class="lego-container">
				${createCubes(total)}
			</div>

			<div class="tolak-equation">
				<div class="number-box total-box">
					${total}
				</div>

				<h1>${operator}</h1>

				<div class="number-box remove-box">
					${remove}
				</div>

				<h1>=</h1>

				<div class="number-box answer-box">
					?
				</div>
			</div>

			<div class="answer-section hidden">
				<h3>Pilih jumlah Lego yang tinggal</h3>

				<div class="options">
					${createOptions(data.options)}
				</div>
			</div>

		</div>
	`;
}