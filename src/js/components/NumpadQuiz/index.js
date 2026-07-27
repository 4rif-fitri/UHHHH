import { renderNumpadQuiz, renderEquation } from "./render.js";

export function mountNumpadQuiz({div,data,ui,handleComponentComplete}) {
	let inputValue = "";
	let isLocked = false;

	div.innerHTML = `
		<div class="split">
			${renderEquation(data)}
			${renderNumpadQuiz()}
		</div>
	`;

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	const numpadContainer = div.querySelector(".numpadWrapper");
	const answerDisplay = div.querySelector(".eqn");
	const btnDelete = div.querySelector(".btnDel");
	const btnCheck = div.querySelector(".btnCheck");
	const btnNext = div.querySelector(".btnContinue");

	function updateAnswer() {
		answerDisplay.textContent = inputValue || "";

		btnCheck.disabled = inputValue === "";
	}

	function handleNumpad(event) {
		if (isLocked) return;

		const button = event.target.closest(".numpad");

		if (!button) return;

		const number = button.dataset.number;

		const maxDigits = data.maxDigits ?? String(data.answer).length;

		if (inputValue.length >= maxDigits) return;
		
		// Elakkan nilai seperti 01 atau 05
		if (inputValue === "0") {
			inputValue = number;
		} else {
			inputValue += number;
		}

		answerDisplay.style.color = "";
		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";

		updateAnswer();
	}

	function handleDelete() {
		if (isLocked) return;

		inputValue = inputValue.slice(0, -1);

		updateAnswer();
	}

	function handleCheck() {
		if (isLocked) return;
		if (inputValue === "") return;

		const selectedAnswer = Number(inputValue);

		const correctAnswer = Number(data.answer);

		const isCorrect = selectedAnswer === correctAnswer;

		if (isCorrect) {
			isLocked = true;

			answerDisplay.style.backgroundColor = "#58CC02";

			ui.dialog.textContent ="Betul! Syabas!";

			ui.dialog.style.color = "#22a000";

			btnCheck.classList.add("hidden");
			btnNext.classList.remove("hidden");

			lockNumpad(true);

			return;
		}

		// Salah: tidak tunjuk jawapan
		answerDisplay.style.color =
			"#e53935";

		ui.dialog.textContent =
			"Salah. Cuba lagi!";

		ui.dialog.style.color =
			"#e53935";

		inputValue = "";
		btnCheck.disabled = true;

		setTimeout(() => {
			if (isLocked) return;

			answerDisplay.textContent = "";
			answerDisplay.style.color = "";

			ui.dialog.textContent = data.text;
			ui.dialog.style.color = "";
		}, 500);
	}


	function lockNumpad(status) {
		div.querySelectorAll(".numpad, .btnDel")
		.forEach(button => {
			button.disabled = status;
		});
	}

	function handleNext() {
		if (!isLocked) return;
		ui.dialog.style.color = "#000";

		handleComponentComplete();
	}

	numpadContainer.addEventListener("click",handleNumpad);
	btnDelete.addEventListener("click",handleDelete);
	btnCheck.addEventListener("click",handleCheck);
	btnNext.addEventListener("click",handleNext);

	btnCheck.disabled = true;
	btnNext.classList.add("hidden");

	updateAnswer();

	return function cleanup() {
		numpadContainer.removeEventListener("click",handleNumpad);
		btnDelete.removeEventListener("click",handleDelete);
		btnCheck.removeEventListener("click",handleCheck);
		btnNext.removeEventListener("click",handleNext);
	};
}