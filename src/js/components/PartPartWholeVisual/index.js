import {
	renderPartPartWholeVisual
} from "./render.js";

export function mountPartPartWholeVisual({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const { part1, part2 } = data.content;
	const whole = part1 + part2;

	let stepIndex = 0;

	const steps = [
		{
			text:
				`Ini ialah satu keseluruhan yang mempunyai ${whole} cube.`,

			showTotal: true,
			showArrows: false,
			showParts: false,
			showSummary: false
		},
		{
			text:
				"Keseluruhan ini boleh dipecahkan kepada dua bahagian.",

			showTotal: true,
			showArrows: true,
			showParts: false,
			showSummary: false
		},
		{
			text:
				`Bahagian pertama mempunyai ${part1} cube dan bahagian kedua mempunyai ${part2} cube.`,

			showTotal: true,
			showArrows: true,
			showParts: true,
			showSummary: false
		}
	];

	div.innerHTML =
		renderPartPartWholeVisual(data);

	ui.contentContainer.replaceChildren(div);

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");
	ui.btnBack.classList.remove("hidden");
	ui.btnNext.classList.remove("hidden");

	const totalElement =
		div.querySelector(".whole-total");

	const arrowsElement =
		div.querySelector(".ppw-arrows");

	const partsElement =
		div.querySelector(".ppw-parts");

	const summaryElement =
		div.querySelector(".ppw-summary");

	function toggleElement(element, show) {
		element.classList.toggle(
			"hidden",
			!show
		);
	}

	function showStep() {
		const step = steps[stepIndex];

		ui.dialog.textContent = step.text;

		toggleElement(
			totalElement,
			step.showTotal
		);

		toggleElement(
			arrowsElement,
			step.showArrows
		);

		toggleElement(
			partsElement,
			step.showParts
		);

		toggleElement(
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