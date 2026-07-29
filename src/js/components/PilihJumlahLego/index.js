import {
	renderPilihJumlahLego
} from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../utils/helper.js";

export function mountPilihJumlahLego({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let selectedValue = null;
	let selectedButton = null;
	let isCorrect = false;
	let isLocked = false;

	div.innerHTML =
		renderPilihJumlahLego(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	ui.btnCheck.classList.remove("hidden");
	ui.btnContinue.classList.add("hidden");
	ui.btnBack?.classList.add("hidden");
	ui.btnNext?.classList.add("hidden");

	function handleSelect(event) {
		if (isLocked) return;

		const button =
			event.target.closest(".btnAns");

		if (!button || !div.contains(button)) {
			return;
		}

		div.querySelectorAll(".btnAns")
			.forEach(item => {
				item.classList.remove(
					"selected",
					"wrong"
				);
			});

		button.classList.add("selected");

		selectedButton = button;
		selectedValue =
			Number(button.dataset.value);
	}

	function handleCheck() {
		if (
			selectedValue === null ||
			isLocked
		) {
			ui.dialog.textContent =
				"Pilih satu jawapan dahulu.";
			return;
		}

		isLocked = true;

		isCorrect =
			selectedValue === Number(data.answer);

		if (isCorrect) {
			selectedButton.classList.remove(
				"selected"
			);

			selectedButton.classList.add(
				"matched"
			);

			div.querySelector(
				".answer-box"
			).textContent = data.answer;

			ui.dialog.textContent =
				"Betul! Kedua-dua kumpulan berjumlah " +
				data.answer + ".";

			showCorrect(ui);
			return;
		}

		selectedButton.classList.remove(
			"selected"
		);

		selectedButton.classList.add("wrong");

		ui.dialog.textContent =
			"Salah. Cuba kira semula semua Lego.";

		showWrong(ui);
	}

	function handleContinue() {
		resetContentFooter(ui);

		if (isCorrect) {
			handleComponentComplete();
			return;
		}

		selectedButton?.classList.remove(
			"wrong",
			"selected"
		);

		selectedButton = null;
		selectedValue = null;
		isCorrect = false;
		isLocked = false;

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