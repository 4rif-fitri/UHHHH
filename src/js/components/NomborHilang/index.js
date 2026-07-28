import {
	renderNomborHilang
} from "./render.js";

export function mountNomborHilang({div,data,ui,handleComponentComplete}){
	let dragState = null;
	let isLocked = false;

	div.innerHTML = renderNomborHilang(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;
	ui.dialog.style.color = "";

	let txt1 = document.querySelector(".text1")
	let txt2 = document.querySelector(".text2")
	if (data.content.direction == "ascending") {
		txt1.textContent = "Kecil"
		txt2.textContent = "Besar"
	} else {
		txt1.textContent = "Besar"
		txt2.textContent = "Kecil"
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

		if (slot && div.contains(slot)) {
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
		if (isLocked || event.button !== 0) {
			return;
		}

		const card = event.target.closest(
			".box-drag-susun"
		);

		if (!card) return;

		// Nombor dalam susunan tidak boleh diseret
		if (card.classList.contains("fixed-card")) {
			return;
		}

		event.preventDefault();

		const rect = card.getBoundingClientRect();

		dragState = {
			card,
			pointerId: event.pointerId,

			offsetX:
				event.clientX - rect.left,

			offsetY:
				event.clientY - rect.top,

			originalParent: card.parentElement,
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

		if (
			dropTarget === dropSlot
		) {
			// Jika slot sudah ada kad, pulangkan kad lama
			const previousCard = dropSlot.querySelector(
				".box-drag-susun"
			);

			if (previousCard) {
				tray.appendChild(previousCard);
			}

			dropSlot.appendChild(card);
		} else if (
			dropTarget === tray
		) {
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

		const selectedCard = dropSlot.querySelector(
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

		const isCorrect =
			selectedValue === Number(data.answer);

		if (!isCorrect) {
			ui.dialog.textContent =
				"Salah. Cuba nombor lain!";

			ui.dialog.style.color = "#e53935";

			selectedCard.classList.add("wrong");

			setTimeout(() => {
				selectedCard.classList.remove("wrong");
			}, 400);

			return;
		}

		isLocked = true;

		ui.dialog.textContent =
			"Betul! Susunan nombor telah lengkap.";

		ui.dialog.style.color = "#22a000";

		dropSlot.classList.add("matched");

		ui.btnCheck.classList.add("hidden");
		ui.btnContinue.classList.remove("hidden");
	}

	function handleContinue() {
		if (!isLocked) return;

		handleComponentComplete();
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

		// Elakkan kad tertinggal dalam body
		if (dragState?.card) {
			clearDragStyle(dragState.card);
			tray.appendChild(dragState.card);
		}

		ui.dialog.style.color = "";
	};
}