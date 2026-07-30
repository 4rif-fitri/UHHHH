import {
	renderPilihAyatTambah
} from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../../utils/helper.js";

export function mountPilihAyatTambah({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const state = {
		selectedValue: null,
		selectedButton: null,
		phase: "answering"
	};

	div.innerHTML =
		renderPilihAyatTambah(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	ui.btnCheck.classList.remove("hidden");
	ui.btnContinue.classList.add("hidden");
	ui.btnBack?.classList.add("hidden");
	ui.btnNext?.classList.add("hidden");

	function handleSelect(event) {
		if (state.phase !== "answering") {
			return;
		}

		const button =
			event.target.closest(".btnAns");

		if (!button || !div.contains(button)) {
			return;
		}

		div.querySelectorAll(".btnAns")
			.forEach(item => {
				item.classList.remove("selected");
			});

		button.classList.add("selected");

		state.selectedButton = button;
		state.selectedValue =
			button.dataset.value;
	}

	function handleCheck() {
		if (
			state.phase !== "answering" ||
			state.selectedValue === null
		) {
			ui.dialog.textContent =
				"Pilih satu jawapan dahulu.";
			return;
		}

		const isCorrect =
			state.selectedValue.trim() ===
			String(data.answer).trim();

		state.selectedButton.classList.remove(
			"selected"
		);

		if (isCorrect) {
			state.phase = "review-correct";

			state.selectedButton.classList.add(
				"matched"
			);

			ui.dialog.textContent =
				"Betul! 3 tambah 1 sama dengan 4.";

			showCorrect(ui);
			return;
		}

		state.phase = "review-wrong";

		state.selectedButton.classList.add(
			"wrong"
		);

		ui.dialog.textContent =
			"Salah. Cuba kira semua cube sekali lagi.";

		showWrong(ui);
	}

	function handleContinue() {
		resetContentFooter(ui);

		if (state.phase === "review-correct") {
			handleComponentComplete();
			return;
		}

		state.selectedButton?.classList.remove(
			"wrong",
			"selected"
		);

		state.selectedValue = null;
		state.selectedButton = null;
		state.phase = "answering";

		ui.dialog.textContent = data.text;

		ui.btnCheck.classList.remove("hidden");
		ui.btnContinue.classList.add("hidden");
	}

	div.addEventListener(
		"click",
		handleSelect
	);

	ui.btnCheck.addEventListener(
		"click",
		handleCheck
	);

	ui.btnContinue.addEventListener(
		"click",
		handleContinue
	);

	return function cleanup() {
		div.removeEventListener(
			"click",
			handleSelect
		);

		ui.btnCheck.removeEventListener(
			"click",
			handleCheck
		);

		ui.btnContinue.removeEventListener(
			"click",
			handleContinue
		);

		resetContentFooter(ui);
	};
}