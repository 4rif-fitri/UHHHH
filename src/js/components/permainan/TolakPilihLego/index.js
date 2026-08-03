import {
	renderTolakPilihLego
} from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../../utils/helper.js";

export function mountTolakPilihLego({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const state = {
		removedCubes: [],
		selectedAnswer: null,
		selectedButton: null,
		phase: "selecting"
	};

	div.innerHTML =
		renderTolakPilihLego(data);

	ui.contentContainer.replaceChildren(div);

	const answerSection =
		div.querySelector(".answer-section");

	const answerBox =
		div.querySelector(".answer-box");

	function updateRemovedCubes() {
		const selectedTotal =
			state.removedCubes.length;

		ui.dialog.textContent =
			`${selectedTotal}/${data.content.remove} Lego dipilih untuk dibuang.`;

		if (
			selectedTotal ===
			data.content.remove
		) {
			state.phase = "answering";

			answerSection.classList.remove(
				"hidden"
			);

			ui.btnCheck.classList.remove(
				"hidden"
			);

			ui.dialog.textContent =
				`${data.content.remove} Lego telah dibuang. Berapa yang tinggal?`;
		}
	}

	function handleCubeClick(event) {
		if (state.phase !== "selecting") {
			return;
		}

		const cube =
			event.target.closest(".lego-remove");

		if (!cube) return;

		const isSelected =
			cube.classList.contains(
				"selected-remove"
			);

		if (isSelected) {
			cube.classList.remove(
				"selected-remove"
			);

			state.removedCubes =
				state.removedCubes.filter(
					element => element !== cube
				);

			updateRemovedCubes();
			return;
		}

		if (
			state.removedCubes.length >=
			data.content.remove
		) {
			return;
		}

		cube.classList.add(
			"selected-remove"
		);

		state.removedCubes.push(cube);

		updateRemovedCubes();
	}

	function handleAnswerClick(event) {
		if (state.phase !== "answering") {
			return;
		}

		const button =
			event.target.closest(".btnAns");

		if (!button) return;

		div.querySelectorAll(".btnAns")
			.forEach(element => {
				element.classList.remove(
					"selected",
					"wrong",
					"matched"
				);
			});

		button.classList.add("selected");

		state.selectedButton = button;

		state.selectedAnswer =
			Number(button.dataset.value);
	}

	function handleCheck() {
		if (state.phase !== "answering") {
			return;
		}

		if (state.selectedAnswer === null) {
			ui.dialog.textContent =
				"Sila pilih satu jawapan.";

			return;
		}

		const isCorrect =
			Number(state.selectedAnswer) ===
			Number(data.answer);

		if (isCorrect) {
			state.phase = "review-correct";

			state.selectedButton.classList.remove(
				"selected"
			);

			state.selectedButton.classList.add(
				"matched"
			);

			answerBox.textContent =
				data.answer;

			showCorrect(ui);

			ui.dialog.textContent =
				`Betul! ${data.content.total} tolak ${data.content.remove} sama dengan ${data.answer}.`;

			return;
		}

		state.phase = "review-wrong";

		state.selectedButton.classList.remove(
			"selected"
		);

		state.selectedButton.classList.add(
			"wrong"
		);

		showWrong(ui);

		ui.dialog.textContent =
			"Salah. Cuba pilih jawapan lain.";
	}

	function handleContinue() {
		if (
			state.phase ===
			"review-correct"
		) {
			resetContentFooter(ui);

			handleComponentComplete();
			return;
		}

		if (
			state.phase ===
			"review-wrong"
		) {
			resetContentFooter(ui);

			state.selectedButton?.classList.remove(
				"wrong",
				"selected"
			);

			state.selectedAnswer = null;
			state.selectedButton = null;
			state.phase = "answering";

			ui.dialog.textContent =
				"Pilih semula jawapan yang betul.";

			ui.btnCheck.classList.remove(
				"hidden"
			);

			ui.btnContinue.classList.add(
				"hidden"
			);
		}
	}

	function cleanup() {
		div.removeEventListener(
			"click",
			handleCubeClick
		);

		answerSection.removeEventListener(
			"click",
			handleAnswerClick
		);

		ui.btnCheck.removeEventListener(
			"click",
			handleCheck
		);

		ui.btnContinue.removeEventListener(
			"click",
			handleContinue
		);
	}

	resetContentFooter(ui);

	ui.dialog.textContent = data.text;

	ui.btnCheck.classList.add("hidden");
	ui.btnContinue.classList.add("hidden");
	ui.btnBack?.classList.add("hidden");
	ui.btnNext?.classList.add("hidden");

	div.addEventListener(
		"click",
		handleCubeClick
	);

	answerSection.addEventListener(
		"click",
		handleAnswerClick
	);

	ui.btnCheck.addEventListener(
		"click",
		handleCheck
	);

	ui.btnContinue.addEventListener(
		"click",
		handleContinue
	);

	return cleanup;
}