import {
	renderMaking10
} from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../../utils/helper.js";

export function mountMaking10({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let selectedValue = null;
	let selectedButton = null;
	let isLocked = false;
	let isCorrect = null;

	div.innerHTML = renderMaking10(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;
	ui.dialog.style.color = "";

	ui.btnContainer?.classList.remove("grid-2");

	ui.btnCheck.classList.remove("hidden");
	ui.btnContinue.classList.add("hidden");
	ui.btnNext?.classList.add("hidden");
	ui.btnBack?.classList.add("hidden");

	ui.btnCheck.disabled = true;

	function resetSelection() {
		div.querySelectorAll(".btnAns")
			.forEach(button => 
				button.classList.remove("higlight","wrong","matched"));

		selectedValue = null;
		selectedButton = null;
		isCorrect = null;

		ui.btnCheck.disabled = true;
	}

	function handleOptionClick(event) {
		if (isLocked) return;

		const button = event.target.closest(".btnAns");

		if (!button || !div.contains(button)) return

		div.querySelectorAll(".btnAns")
			.forEach(item => 
				item.classList.remove("higlight","wrong"));

		button.classList.add("higlight");

		selectedButton = button;
		selectedValue = Number(button.dataset.value);

		ui.btnCheck.disabled = false;

		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";
	}

	function handleCheck() {
		if (isLocked || selectedValue === null) return

		isCorrect = selectedValue === Number(data.answer);

		isLocked = true;

		selectedButton.classList.remove(
			"higlight"
		);

		if (!isCorrect) {
			selectedButton.classList.add("wrong");

			showWrong(ui);
			return;
		}

		selectedButton.classList.add("matched");

		showCorrect(ui);
	}

	function handleContinue() {
		if (isCorrect) {
			handleComponentComplete();
			return;
		}

		resetContentFooter(ui);

		isLocked = false;

		resetSelection();

		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";
	}

	div.addEventListener("click",handleOptionClick);
	ui.btnCheck.addEventListener("click",handleCheck);
	ui.btnContinue.addEventListener("click",handleContinue);
	
	return function cleanup() {
		div.removeEventListener("click",handleOptionClick);
		ui.btnCheck.removeEventListener("click",handleCheck);
		ui.btnContinue.removeEventListener("click",handleContinue);
		ui.dialog.style.color = "";
	};
}