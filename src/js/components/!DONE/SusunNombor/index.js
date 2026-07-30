import { renderSusunNombor } from "./render.js";

import {
	showCorrect,
	showWrong,
	resetContentFooter
} from "../../../utils/helper.js";

export function mountSusunNombor({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let dragState = null;
	let isLocked = false;
	let isCorrect = null;

	div.innerHTML = renderSusunNombor(data);
	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	let tray = div.querySelector(".container-kad-susun");

	let slots = [...div.querySelectorAll(".box-drop-susun")];

	let txt1 = div.querySelector(".text1");
	let txt2 = div.querySelector(".text2");

	ui.btnCheck.classList.remove("hidden");
	ui.btnContinue.classList.add("hidden");
	ui.btnBack?.classList.add("hidden");
	ui.btnNext?.classList.add("hidden");

	if (data.content.direction === "ascending") {
		txt1.textContent = "Kecil";
		txt2.textContent = "Besar";
	} else {
		txt1.textContent = "Besar";
		txt2.textContent = "Kecil";
	}

	function clearHighlight() {
		div.querySelectorAll(".drop-active")
			.forEach(element => {
				element.classList.remove("drop-active");
			});
	}

	function findDropTarget(x, y) {
		let element = document.elementFromPoint(x, y);

		if (!element) return null;

		let slot = element.closest(".box-drop-susun");

		if (slot && div.contains(slot) && !slot.querySelector(".box-drag-susun")) {
			return slot;
		}

		let trayTarget = element.closest(".container-kad-susun");

		if ( trayTarget && div.contains(trayTarget)) {
			return trayTarget;
		}

		return null;
	}

	function startDrag(event) {
		if (isLocked || event.button !== 0) return

		let card = event.target.closest(".box-drag-susun");

		if (!card || !div.contains(card)) return

		event.preventDefault();

		let rect = card.getBoundingClientRect();

		dragState = {
			card,
			pointerId: event.pointerId,

			offsetX:event.clientX - rect.left,
			offsetY: event.clientY - rect.top,

			originalParent: card.parentElement,
			originalNextSibling: card.nextElementSibling,
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
		if (!dragState || event.pointerId !== dragState.pointerId) {
			return;
		
		}

		let {card,offsetX,offsetY} = dragState;

		card.style.left = `${event.clientX - offsetX}px`;

		card.style.top = `${event.clientY - offsetY}px`;

		clearHighlight();

		let target = findDropTarget(event.clientX,event.clientY);

		dragState.dropTarget = target;

		target?.classList.add("drop-active");
	}

	function returnCard() {
		let {card,originalParent,originalNextSibling} = dragState;

		if (originalNextSibling && originalNextSibling.parentElement === originalParent) {
			originalParent.insertBefore(card,originalNextSibling);

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
		if (!dragState || event.pointerId !== dragState.pointerId) {
			return;
		}

		let { card, dropTarget } = dragState;

		clearHighlight();

		if (dropTarget?.classList.contains("box-drop-susun")) {
			dropTarget.appendChild(card);

		} else if (dropTarget?.classList.contains("container-kad-susun")) {
			tray.appendChild(card);

		} else {
			returnCard();
		
		}

		clearDragStyle(card);
		dragState = null;
	}

	function getSelectedValues() {

		return slots.map(slot => {
			let card = slot.querySelector(".box-drag-susun");
			return card ? Number(card.dataset.value) : null;
		});
	}

	function handleCheck() {
		if (isLocked) return;

		let selectedValues = getSelectedValues();

		if (selectedValues.includes(null)) {
			ui.dialog.textContent = "Isi semua ruang terlebih dahulu.";

			ui.dialog.style.color = "#e53935";
			return;
		}

		isCorrect = selectedValues.every(
			(value, index) =>
				value === Number(data.answer[index])
		);

		isLocked = true;

		if (!isCorrect) {
			showWrong(ui);
			return;
		}

		showCorrect(ui);

		slots.forEach(slot => slot.classList.add("matched"));
	}

	function handleContinue() {
		resetContentFooter(ui);

		if (isCorrect) {
			handleComponentComplete();
			return;
		}

		isLocked = false;
		isCorrect = null;

		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";

		slots.forEach(slot => {
			let card = slot.querySelector(".box-drag-susun");

			if (card) tray.appendChild(card);

			slot.classList.remove("matched","wrong","drop-active");
		});
	}

	document.addEventListener("pointerdown",startDrag);
	document.addEventListener("pointermove",moveDrag);
	document.addEventListener("pointerup",endDrag);
	document.addEventListener("pointercancel",endDrag);
	ui.btnCheck.addEventListener("click",handleCheck);
	ui.btnContinue.addEventListener("click",handleContinue);

	return function cleanup() {
		document.removeEventListener("pointerdown",startDrag);
		document.removeEventListener("pointermove",moveDrag);
		document.removeEventListener("pointerup",endDrag);
		document.removeEventListener("pointercancel",endDrag);
		ui.btnCheck.removeEventListener("click",handleCheck);
		ui.btnContinue.removeEventListener("click",handleContinue);

		clearHighlight();

		if (dragState?.card) {
			clearDragStyle(dragState.card);
			tray.appendChild(dragState.card);
			dragState = null;
		}

		ui.dialog.style.color = "";
	};
}