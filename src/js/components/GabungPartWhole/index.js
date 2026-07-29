import {
	renderGabungPartWhole
} from "./render.js";

export function mountGabungPartWhole({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let stepIndex = 0;

	const { part1, part2 } = data.content;

	const whole =
		part1.total + part2.total;

	const steps = [
		{
			text:
				`Bahagian pertama mempunyai ${part1.total} objek.`,

			showPart1: true,
			showPart2: false,
			showArrows: false,
			showWhole: false,
			showSummary: false
		},
		{
			text:
				`Bahagian kedua mempunyai ${part2.total} objek.`,

			showPart1: true,
			showPart2: true,
			showArrows: false,
			showWhole: false,
			showSummary: false
		},
		{
			text:
				"Mari gabungkan kedua-dua bahagian.",

			showPart1: true,
			showPart2: true,
			showArrows: true,
			showWhole: false,
			showSummary: false
		},
		{
			text:
				`Sekarang semuanya menjadi ${whole} objek.`,

			showPart1: true,
			showPart2: true,
			showArrows: true,
			showWhole: true,
			showSummary: false
		},
		{
			text:
				`${part1.total} tambah ${part2.total} sama dengan ${whole}.`,

			showPart1: true,
			showPart2: true,
			showArrows: true,
			showWhole: true,
			showSummary: true
		}
	];

	div.innerHTML =
		renderGabungPartWhole(data);

	ui.contentContainer.replaceChildren(div);

	const part1Element =
		div.querySelector(".part-one");

	const part2Element =
		div.querySelector(".part-two");

	const arrowsElement =
		div.querySelector(".gpw-arrows");

	const wholeElement =
		div.querySelector(".gpw-whole");

	const summaryElement =
		div.querySelector(".gpw-summary");

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
			arrowsElement,
			step.showArrows
		);

		toggle(
			wholeElement,
			step.showWhole
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