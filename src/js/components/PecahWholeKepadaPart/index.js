import {
	renderPecahWholeKepadaPart
} from "./render.js";

export function mountPecahWholeKepadaPart({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let stepIndex = 0;

	const { part1, part2 } = data.content;
	const whole = part1.total + part2.total;

	const steps = [
		{
			text:
				`Semua ${whole} Lego ini ialah satu keseluruhan.`,

			showPart1: false,
			showPart2: false,
			showSummary: false
		},
		{
			text:
				`${part1.total} Lego menjadi bahagian pertama.`,

			showPart1: true,
			showPart2: false,
			showSummary: false
		},
		{
			text:
				`${part2.total} Lego menjadi bahagian kedua.`,

			showPart1: true,
			showPart2: true,
			showSummary: false
		},
		{
			text:
				`${whole} boleh dipecahkan kepada ${part1.total} dan ${part2.total}.`,

			showPart1: true,
			showPart2: true,
			showSummary: true
		}
	];

	div.innerHTML =
		renderPecahWholeKepadaPart(data);

	ui.contentContainer.replaceChildren(div);

	const part1Element =
		div.querySelector(".part-one");

	const part2Element =
		div.querySelector(".part-two");

	const summaryElement =
		div.querySelector(".pwp-summary");

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");
	ui.btnBack.classList.remove("hidden");
	ui.btnNext.classList.remove("hidden");

	function toggle(element, show) {
		element.classList.toggle(
			"hidden",
			!show
		);
	}

	function showStep() {
		const step = steps[stepIndex];

		ui.dialog.textContent = step.text;

		toggle(
			part1Element,
			step.showPart1
		);

		toggle(
			part2Element,
			step.showPart2
		);

		toggle(
			summaryElement,
			step.showSummary
		);

		ui.btnBack.disabled =
			stepIndex === 0;

		ui.btnNext.textContent =
			stepIndex === steps.length - 1
				? "FINISH"
				: "NEXT";
	}

	function handleNext() {
		if (stepIndex < steps.length - 1) {
			stepIndex++;
			showStep();
			return;
		}

		handleComponentComplete();
	}

	function handleBack() {
		if (stepIndex === 0) return;

		stepIndex--;
		showStep();
	}

	ui.btnNext.addEventListener(
		"click",
		handleNext
	);

	ui.btnBack.addEventListener(
		"click",
		handleBack
	);

	showStep();

	return function cleanup() {
		ui.btnNext.removeEventListener(
			"click",
			handleNext
		);

		ui.btnBack.removeEventListener(
			"click",
			handleBack
		);
	};
}