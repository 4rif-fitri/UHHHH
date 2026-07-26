import { renderTrueFalse } from "./render.js";

export function mountTrueFalse({div,data,ui,handleComponentComplete}) {
	let choice = null;
	let selectedButton = null;
	let isLock = false;
	let timeoutId = null;

	function handleClick(event) {
		if (isLock) return;

		const button =
			event.target.closest(".btnAns");

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

			ui.dialog.textContent = "Betul!";
			ui.btnCheck.classList.add("hidden");
			ui.btnNext.classList.remove("hidden");

			return;
		}

		const wrongButton = selectedButton;

		wrongButton.classList.add("wrong");
		ui.dialog.textContent = "Salah, cuba lagi!";

		choice = null;
		selectedButton = null;

		timeoutId = setTimeout(() => {
			wrongButton.classList.remove("wrong");
			isLock = false;
		}, 400);
	}

	function handleNext() {
		handleComponentComplete();
	}

	div.innerHTML = renderTrueFalse(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	ui.btnCheck.classList.remove("hidden");
	ui.btnNext.classList.add("hidden");

	div.addEventListener("click", handleClick);
	ui.btnCheck.addEventListener("click", handleCheck);
	ui.btnNext.addEventListener("click", handleNext);

	return function cleanup() {
		clearTimeout(timeoutId);

		div.removeEventListener(
			"click",
			handleClick
		);

		ui.btnCheck.removeEventListener(
			"click",
			handleCheck
		);

		ui.btnNext.removeEventListener(
			"click",
			handleNext
		);
	};
}