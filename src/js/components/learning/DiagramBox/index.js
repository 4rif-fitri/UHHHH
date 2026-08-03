import { renderDiagramBox } from "./render.js";

export function mountDiagramBox({
	div,
	data,
	ui,
	handleComponentComplete,
	handleComponentBack
}) {
	div.innerHTML = renderDiagramBox(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	ui.btnContainer.classList.add("grid-2");

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");

	ui.btnNext.classList.remove("hidden");
	ui.btnBack.classList.remove("hidden");

	function handleNext() {
		handleComponentComplete();
	}

	function handleBack() {
		handleComponentBack();
	}

	ui.btnNext.addEventListener(
		"click",
		handleNext
	);

	ui.btnBack.addEventListener(
		"click",
		handleBack
	);

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