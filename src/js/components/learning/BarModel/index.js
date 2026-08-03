import {
	renderBarModel
} from "./render.js";

export function mountBarModel({ div, data, ui, handleComponentComplete, handleComponentBack, componentIndex = 0 }) {
	let stepIndex = 0;

	let { total, part1, part2 } = data.content;

	if (part1 + part2 !== total) {
		console.error(`BarModel salah: ${part1} + ${part2} bukan ${total}`);
		return;
	}

	if (total <= 0 || part1 <= 0 || part2 <= 0) {
		console.error("BarModel memerlukan nombor lebih daripada 0.");
		return;
	}

	let steps = [
		{
			text:
				`Ini ialah satu Whole yang mempunyai ${total} Lego.`,

			classes: [
				"show-whole"
			]
		},
		{
			text:
				`Mari kira semua Lego. Semuanya ada ${total} Lego.`,

			classes: [
				"show-whole",
				"count-cubes"
			]
		},
		{
			text:
				`Kita tandakan garisan selepas ${part1} Lego.`,

			classes: [
				"show-whole",
				"show-divider"
			]
		},
		{
			text:
				`Whole ${total} boleh dipecahkan kepada Part ${part1} dan Part ${part2}.`,

			classes: [
				"show-whole",
				"show-divider",
				"show-parts"
			]
		},
		{
			text:
				`${part1} tambah ${part2} sama dengan ${total}.`,

			classes: [
				"show-whole",
				"show-divider",
				"show-parts",
				"show-equation"
			]
		}
	];

	div.innerHTML = renderBarModel(data);

	ui.contentContainer.replaceChildren(div);

	let model = div.querySelector(".bar-model");
	let barRow = div.querySelector(".bar-row");
	let divider = div.querySelector(".bar-divider");
	let cubes = [...div.querySelectorAll(".bar-cube")];

	ui.btnContainer.classList.add("grid-2");

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");

	ui.btnBack.classList.remove("hidden");
	ui.btnNext.classList.remove("hidden");

	function positionDivider() {
		let lastPartOne = cubes[part1 - 1];

		let firstPartTwo = cubes[part1];

		if (!lastPartOne || !firstPartTwo) return

		let rowRect = barRow.getBoundingClientRect();
		let leftRect = lastPartOne.getBoundingClientRect();
		let rightRect = firstPartTwo.getBoundingClientRect();

		let position = (leftRect.right + rightRect.left) / 2 - rowRect.left;

		divider.style.left = `${position}px`;
	}

	function replayCountAnimation() {
		cubes.forEach(cube =>  cube.style.animation = "none")

		void model.offsetWidth;

		cubes.forEach((cube, index) => {
			cube.style.animation = "";

			cube.style.animationDelay = `${index * 0.15}s`;
		});
	}

	// function updateProgress() {
	// 	let current = stepIndex + 1;
	// 	let totalSteps = steps.length;

	// 	ui.textBar.textContent =
	// 		`${current}/${totalSteps} Slides`;

	// 	ui.barFill.style.width =
	// 		`${(current / totalSteps) * 100}%`;
	// }

	function updateButtons() {
		let firstSlide = componentIndex === 0 && stepIndex === 0;
		let lastSlide = stepIndex === steps.length - 1;

		ui.btnBack.disabled = firstSlide;

		ui.btnNext.textContent = lastSlide ? "FINISH" : "NEXT";
	}

	function showStep() {
		let step = steps[stepIndex];

		model.className = "bar-model";

		step.classes.forEach(className => model.classList.add(className));

		if (step.classes.includes("count-cubes")){
			replayCountAnimation();
		}

		ui.dialog.textContent = step.text;

		// updateProgress();
		updateButtons();
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
		if (stepIndex > 0) {
			stepIndex--;
			showStep();
			return;
		}

		handleComponentBack?.();
	}

	function handleResize() {
		positionDivider();
	}

	ui.btnNext.addEventListener("click",handleNext);
	ui.btnBack.addEventListener("click",handleBack);
	window.addEventListener("resize",handleResize);
	
	requestAnimationFrame(() => {
		positionDivider();
		showStep();
	});

	return function cleanup() {
		ui.btnNext.removeEventListener("click",handleNext);
		ui.btnBack.removeEventListener("click",handleBack);
		window.removeEventListener("resize",handleResize);};
}