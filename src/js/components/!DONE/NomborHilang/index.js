import {
	renderNomborHilang
} from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../utils/helper.js";

export function mountNomborHilang({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let dragState = null;
	let isLocked = false;
	let isCorrect = null;

	div.innerHTML = renderNomborHilang(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;
	ui.dialog.style.color = "";

	const txt1 = div.querySelector(".text1");
	const txt2 = div.querySelector(".text2");

	if (data.content.direction === "ascending") {
		txt1.textContent = "Kecil";
		txt2.textContent = "Besar";
	} else {
		txt1.textContent = "Besar";
		txt2.textContent = "Kecil";
	}

	const tray = div.querySelector(
		".container-kad-susun"
	);

	const dropSlot = div.querySelector(
		".box-drop-susun"
	);

	ui.btnCheck.classList.remove("hidden");
	ui.btnContinue.classList.add("hidden");
	ui.btnBack?.classList.add("hidden");
	ui.btnNext?.classList.add("hidden");

	function clearHighlight() {
		dropSlot.classList.remove("drop-active");
		tray.classList.remove("drop-active");
	}

	function findDropTarget(x, y) {
		const element =
			document.elementFromPoint(x, y);

		if (!element) return null;

		const slot = element.closest(
			".box-drop-susun"
		);

		if (
			slot &&
			div.contains(slot)
		) {
			return slot;
		}

		const trayTarget = element.closest(
			".container-kad-susun"
		);

		if (
			trayTarget &&
			div.contains(trayTarget)
		) {
			return trayTarget;
		}

		return null;
	}

	function startDrag(event) {
		if (
			isLocked ||
			event.button !== 0
		) {
			return;
		}

		const card = event.target.closest(
			".box-drag-susun"
		);

		if (
			!card ||
			!div.contains(card)
		) {
			return;
		}

		// Kad nombor dalam barisan tidak boleh diseret
		if (card.classList.contains("fixed-card")) {
			return;
		}

		event.preventDefault();

		const rect =
			card.getBoundingClientRect();

		dragState = {
			card,
			pointerId: event.pointerId,

			offsetX:
				event.clientX - rect.left,

			offsetY:
				event.clientY - rect.top,

			originalParent:
				card.parentElement,

			originalNextSibling:
				card.nextElementSibling,

			dropTarget: null
		};

		card.classList.add("dragging");

		Object.assign(card.style, {
			position: "fixed",
			left: `${rect.left}px`,
			top: `${rect.top}px`,
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			margin: "0",
			pointerEvents: "none",
			zIndex: "9999"
		});

		document.body.appendChild(card);
	}

	function moveDrag(event) {
		if (
			!dragState ||
			event.pointerId !== dragState.pointerId
		) {
			return;
		}

		const {
			card,
			offsetX,
			offsetY
		} = dragState;

		card.style.left =
			`${event.clientX - offsetX}px`;

		card.style.top =
			`${event.clientY - offsetY}px`;

		clearHighlight();

		const target = findDropTarget(
			event.clientX,
			event.clientY
		);

		dragState.dropTarget = target;

		target?.classList.add("drop-active");
	}

	function returnOriginalCard() {
		const {
			card,
			originalParent,
			originalNextSibling
		} = dragState;

		if (
			originalNextSibling &&
			originalNextSibling.parentElement ===
			originalParent
		) {
			originalParent.insertBefore(
				card,
				originalNextSibling
			);
		} else {
			originalParent.appendChild(card);
		}
	}

	function clearDragStyle(card) {
		card.classList.remove("dragging");

		card.style.position = "";
		card.style.left = "";
		card.style.top = "";
		card.style.width = "";
		card.style.height = "";
		card.style.margin = "";
		card.style.pointerEvents = "";
		card.style.zIndex = "";
	}

	function endDrag(event) {
		if (
			!dragState ||
			event.pointerId !== dragState.pointerId
		) {
			return;
		}

		const {
			card,
			dropTarget
		} = dragState;

		clearHighlight();

		if (dropTarget === dropSlot) {
			/*
				Jika slot sudah mempunyai kad,
				pulangkan kad lama ke tray.
			*/
			const previousCard =
				dropSlot.querySelector(
					".box-drag-susun"
				);

			if (
				previousCard &&
				previousCard !== card
			) {
				previousCard.classList.remove(
					"wrong"
				);

				tray.appendChild(previousCard);
			}

			dropSlot.appendChild(card);
		} else if (dropTarget === tray) {
			tray.appendChild(card);
		} else {
			returnOriginalCard();
		}

		clearDragStyle(card);
		dragState = null;

		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";
	}

	function handleCheck() {
		if (isLocked) return;

		const selectedCard =
			dropSlot.querySelector(
				".box-drag-susun"
			);

		if (!selectedCard) {
			ui.dialog.textContent =
				"Seret satu kad ke petak kosong.";

			ui.dialog.style.color = "#e53935";
			return;
		}

		const selectedValue = Number(
			selectedCard.dataset.value
		);

		isCorrect =
			selectedValue === Number(data.answer);

		// Selepas CHECK, drag dikunci
		isLocked = true;

		if (!isCorrect) {
			selectedCard.classList.add("wrong");

			showWrong(ui);
			return;
		}

		dropSlot.classList.add("matched");

		showCorrect(ui);
	}

	function handleContinue() {
		/*
			Jawapan betul:
			pergi ke component seterusnya.
		*/
		if (isCorrect) {
			handleComponentComplete();
			return;
		}

		/*
			Jawapan salah:
			butang CONTINUE bertindak sebagai RETRY.
		*/
		const selectedCard =
			dropSlot.querySelector(
				".box-drag-susun"
			);

		// Pulangkan kad salah ke tray
		if (selectedCard) {
			selectedCard.classList.remove(
				"wrong",
				"matched"
			);

			tray.appendChild(selectedCard);
		}

		dropSlot.classList.remove(
			"matched",
			"wrong",
			"drop-active"
		);

		resetContentFooter(ui);

		isLocked = false;
		isCorrect = null;

		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";
	}

	document.addEventListener(
		"pointerdown",
		startDrag
	);

	document.addEventListener(
		"pointermove",
		moveDrag
	);

	document.addEventListener(
		"pointerup",
		endDrag
	);

	document.addEventListener(
		"pointercancel",
		endDrag
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
		document.removeEventListener(
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
			endDrag
		);

		ui.btnCheck.removeEventListener(
			"click",
			handleCheck
		);

		ui.btnContinue.removeEventListener(
			"click",
			handleContinue
		);

		clearHighlight();

		// Elakkan kad tertinggal dalam body
		if (dragState?.card) {
			clearDragStyle(dragState.card);
			tray.appendChild(dragState.card);
			dragState = null;
		}

		ui.dialog.style.color = "";
	};
}