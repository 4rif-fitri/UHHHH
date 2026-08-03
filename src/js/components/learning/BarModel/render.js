function createCubes(total, part1) {
	return Array.from(
		{ length: total },
		(_, index) => {
			const groupClass =
				index < part1
					? "part-one-cube"
					: "part-two-cube";

			const startClass =
				index === part1
					? "part-two-start"
					: "";

			return `
				<div
					class="
						cube
						bar-cube
						${groupClass}
						${startClass}
					"
					data-number="${index + 1}"
					style="
						animation-delay:
						${index * 0.15}s;
					"
				>
					<span>${index + 1}</span>
				</div>
			`;
		}
	).join("");
}

export function renderBarModel(data) {
	const {
		total,
		part1,
		part2
	} = data.content;

	return `
		<div class="bar-model">

			<h2 class="whole-label">
				Whole: ${total}
			</h2>

			<div class="bar-row">
				${createCubes(total, part1)}

				<div class="bar-divider"></div>
			</div>

			<div
				class="part-labels"
				style="
					grid-template-columns:
					${part1}fr ${part2}fr;
				"
			>
				<div class="part-label part-one">
					<h2>Part</h2>
					<p>${part1} Lego</p>
				</div>

				<div class="part-label part-two">
					<h2>Part</h2>
					<p>${part2} Lego</p>
				</div>
			</div>

			<div class="bar-equation">
				<span
					class="
						part-number
						blue-number
					"
				>
					${part1}
				</span>

				<span>+</span>

				<span
					class="
						part-number
						yellow-number
					"
				>
					${part2}
				</span>

				<span>=</span>

				<span class="whole-number">
					${total}
				</span>
			</div>

		</div>
	`;
}