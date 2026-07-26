import { renderMemoryGame } from "./render.js"

export function mountMemoryGame({ div, data, ui, handleComponentComplete }) {
	div.innerHTML = renderMemoryGame (data)
	ui.contentContainer.replaceChildren(div)
	ui.btnNext.classList.remove("hidden")

	ui.dialog.innerHTML = data.text

	ui.btnNext.addEventListener("click", handleComponentComplete)

	let firstCard = null;
	let isLock = false;
	let matched = 0;
	let timeoutId = null;

	const totalPairs = data.content.length;

	function flip(card) {
		card.classList.add("flipped");

		card.querySelector(".innerCard").style.transform ="rotateY(180deg)";
	}

	function unflip(card) {
		card.classList.remove("flipped");

		card.querySelector(".innerCard").style.transform = "rotateY(0deg)";
	}

	function handleClick(event) {
		if (isLock) return;

		const card =
			event.target.closest(".card");

		if (!card ||card.disabled ||card === firstCard) {
			return;
		}

		flip(card);

		if (!firstCard) {
			firstCard = card;
			return;
		}

		isLock = true;

		const sameAnswer = firstCard.dataset.match === card.dataset.match;

		const differentType = firstCard.dataset.type !== card.dataset.type;

		if (sameAnswer && differentType) {
			firstCard.disabled = true;
			card.disabled = true;

			firstCard.classList.add("matched");
			card.classList.add("matched");

			matched++;
			firstCard = null;
			isLock = false;

			if (matched === totalPairs) {
				ui.dialog.textContent =
					"Semua pasangan ditemui!";

				ui.btnNext.classList.remove(
					"hidden"
				);
			}

			return;
		}

		const oldFirstCard = firstCard;

		timeoutId = setTimeout(() => {
			unflip(oldFirstCard);
			unflip(card);

			firstCard = null;
			isLock = false;
		}, 600);
	}

	function handleNext() {
		handleComponentComplete();
	}

	div.innerHTML = renderMemoryGame(data);

	ui.dialog.textContent = data.text;
	ui.btnNext.classList.add("hidden");
	ui.btnCheck.classList.add("hidden");

	div.addEventListener("click",handleClick);

	ui.btnNext.addEventListener("click",handleNext);

	return function cleanup() {
		clearTimeout(timeoutId);

		div.removeEventListener("click",handleClick);

		ui.btnNext.removeEventListener("click",handleNext);
	};
}