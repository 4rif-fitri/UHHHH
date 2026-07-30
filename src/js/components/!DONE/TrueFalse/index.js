import { resetContentFooter, showCorrect, showWrong } from "../../../utils/helper.js";
import { renderTrueFalse } from "./render.js";

export function mountTrueFalse({ div, data, ui, handleComponentComplete }) {
	let choice = null;
	let selectedButton = null;
	let isLock = false;

	function handleClick(event) {
		if (isLock) return;

		const button = event.target.closest(".btnAns");

		if (!button) return;

		div.querySelectorAll(".btnAns")
			.forEach(btn => {
				btn.classList.remove("selected");
			});

		button.classList.add("selected");

		selectedButton = button;
		choice = button.dataset.status;
	}

	function handleCheck() {
		if (choice === null || isLock) return;
		isLock = true;

		selectedButton.classList.remove("selected");

		if (choice === data.answer) {
			selectedButton.classList.add("matched");
			showCorrect(ui)
			return;
		}

		selectedButton.classList.add("wrong");
		showWrong(ui)
	}

	function handleContinue() {
		if (choice === data.answer) {
			handleComponentComplete();

		} else {
			isLock = false
			selectedButton.classList.remove("wrong");
		}

		resetContentFooter(ui)
	}


	div.innerHTML = renderTrueFalse(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	ui.btnCheck.classList.remove("hidden");
	ui.btnNext.classList.add("hidden");

	div.addEventListener("click", handleClick);
	ui.btnCheck.addEventListener("click", handleCheck);
	ui.btnContinue.addEventListener("click", handleContinue)

	return function cleanup() {
		div.removeEventListener("click", handleClick);
		ui.btnCheck.removeEventListener("click", handleCheck);
		ui.btnContinue.removeEventListener("click", handleContinue)
	};
}