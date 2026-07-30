import {
	renderTambahDragLego
} from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../../utils/helper.js";

export function mountTambahDragLego({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const state = {
		added: 0,

		selectedAnswer: null,
		selectedButton: null,

		phase: "adding",

		drag: null
	};

	div.innerHTML =
		renderTambahDragLego(data);

	ui.contentContainer.replaceChildren(div);

	const extraContainer =
		div.querySelector(".extra-cubes");

	const answerSection =
		div.querySelector(".answer-section");

	const answerBox =
		div.querySelector(".answer-box");

	function clearDropHighlight() {
		div.querySelectorAll(
			".add-target.drop-active"
		).forEach(target => {
			target.classList.remove(
				"drop-active"
			);
		});
	}

	function findDropTarget(x, y) {
		const element =
			document.elementFromPoint(x, y);

		if (!element) return null;

		const target =
			element.closest(".add-target");

		if (!target) return null;

		if (!div.contains(target)) {
			return null;
		}

		if (target.classList.contains("filled")) {
			return null;
		}

		return target;
	}

	function startDrag(event) {
		if (state.phase !== "adding") {
			return;
		}

		if (state.drag !== null) {
			return;
		}

		if (
			event.pointerType === "mouse" &&
			event.button !== 0
		) {
			return;
		}

		const cube =
			event.target.closest(".extra-cube");

		if (!cube) return;

		event.preventDefault();

		const rect =
			cube.getBoundingClientRect();

		const clone =
			cube.cloneNode(true);

		clone.classList.add("dragging-cube");

		Object.assign(clone.style, {
			position: "fixed",
			left: `${rect.left}px`,
			top: `${rect.top}px`,
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			margin: "0",
			pointerEvents: "none",
			zIndex: "9999"
		});

		document.body.appendChild(clone);

		cube.style.visibility = "hidden";

		state.drag = {
			source: cube,
			clone,
			pointerId: event.pointerId,

			offsetX:
				event.clientX - rect.left,

			offsetY:
				event.clientY - rect.top,

			dropTarget: null
		};
	}

	function moveDrag(event) {
		if (!state.drag) return;

		if (
			event.pointerId !==
			state.drag.pointerId
		) {
			return;
		}

		event.preventDefault();

		const {
			clone,
			offsetX,
			offsetY
		} = state.drag;

		clone.style.left =
			`${event.clientX - offsetX}px`;

		clone.style.top =
			`${event.clientY - offsetY}px`;

		clearDropHighlight();

		const target = findDropTarget(
			event.clientX,
			event.clientY
		);

		state.drag.dropTarget = target;

		target?.classList.add(
			"drop-active"
		);
	}

	function finishAdding() {
		if (
			state.added <
			data.content.add
		) {
			const remaining =
				data.content.add -
				state.added;

			ui.dialog.textContent =
				`Tambah ${remaining} Lego lagi.`;

			return;
		}

		state.phase = "answering";

		answerSection.classList.remove(
			"hidden"
		);

		ui.btnCheck.classList.remove(
			"hidden"
		);

		ui.dialog.textContent =
			"Sekarang terdapat berapa Lego semuanya?";
	}

	function endDrag(event) {
		if (!state.drag) return;

		if (
			event.pointerId !==
			state.drag.pointerId
		) {
			return;
		}

		const {
			source,
			clone,
			dropTarget
		} = state.drag;

		clearDropHighlight();

		if (dropTarget) {
			source.classList.remove(
				"extra-cube"
			);

			source.classList.add(
				"added-cube"
			);

			source.style.visibility = "";

			dropTarget.appendChild(source);

			dropTarget.classList.add(
				"filled"
			);

			state.added++;

			ui.dialog.textContent =
				`${state.added} Lego telah ditambah.`;
		} else {
			source.style.visibility = "";

			ui.dialog.textContent =
				"Seret Lego ke dalam petak kosong.";
		}

		clone.remove();

		state.drag = null;

		finishAdding();
	}

	function cancelDrag(event) {
		if (!state.drag) return;

		if (
			event.pointerId !==
			state.drag.pointerId
		) {
			return;
		}

		state.drag.source.style.visibility = "";

		state.drag.clone.remove();

		clearDropHighlight();

		state.drag = null;
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
				`Betul! ${data.content.start} tambah ${data.content.add} sama dengan ${data.answer}.`;

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
		if (state.drag) {
			state.drag.source.style.visibility = "";
			state.drag.clone.remove();
			state.drag = null;
		}

		extraContainer.removeEventListener(
			"pointerdown",
			startDrag
		);

		document.removeEventListener(
			"pointermove",
			moveDrag
		);

		document.removeEventListener(
			"pointerup",
			endDrag
		);

		document.removeEventListener(
			"pointercancel",
			cancelDrag
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

	extraContainer.addEventListener(
		"pointerdown",
		startDrag
	);

	document.addEventListener(
		"pointermove",
		moveDrag,
		{ passive: false }
	);

	document.addEventListener(
		"pointerup",
		endDrag
	);

	document.addEventListener(
		"pointercancel",
		cancelDrag
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