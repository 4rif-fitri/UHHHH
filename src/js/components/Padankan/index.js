import { renderPadankan } from "./render.js";

export function mountPadankan({ div, data, ui, handleComponentComplete }) {

	let state = {
		selectedQuestion: null,
		selectedAnswer: null,
		matchedPairs: 0,
	}
	let totalPairs = data.content.length;
	
	function finishComponent() {
		ui.dialog.innerHTML = data.text = `Semua pasangan berjaya ditemui dalam ` + `${state.attempts} percubaan.`, "correct";
		
		ui.btnNext.classList.remove("hidden")
	}

	function resetSelection() {
		state.selectedQuestion = null;
		state.selectedAnswer = null;
		state.isLocked = false;
	}

	function handleCorrect(question, answer) {
		question.classList.remove("selected");
		answer.classList.remove("selected");

		question.classList.add("matched");
		answer.classList.add("matched");

		question.disabled = true;
		answer.disabled = true;

		state.matchedPairs++;

		resetSelection();

		if (state.matchedPairs === totalPairs) {
			finishComponent();
		}
	}

	function handleWrong(question, answer) {
		question.classList.add("wrong");
		answer.classList.add("wrong");

		state.timeoutId = setTimeout(() => {
			question.classList.remove("selected", "wrong");
			answer.classList.remove("selected", "wrong");

			resetSelection();

		}, 300);
	}


	function checkPair() {
		let question = state.selectedQuestion;
		let answer = state.selectedAnswer;

		if (!question || !answer) return;
		if (state.isLocked) return;

		state.isLocked = true;
		state.attempts++;
		
		console.log(question.dataset.key == answer.dataset.key);
		
		if (question.dataset.key == answer.dataset.key) {
			handleCorrect(question, answer);
		} else {
			handleWrong(question, answer);
		}
	}

	function selectQuestion(element) {
		state.selectedQuestion?.classList.remove("selected");

		state.selectedQuestion = element;
		element.classList.add("selected");

		checkPair();
	}

	function selectAnswer(element) {
		state.selectedAnswer?.classList.remove("selected");

		state.selectedAnswer = element;
		element.classList.add("selected");


		checkPair();
	}

	function handleClick(event) {
		let question = event.target.closest(".boxSoalan");
		let answer = event.target.closest(".boxJawapan");

		if (question && div.contains(question) && !question.disabled) {
			selectQuestion(question);
			return;
		}

		if (answer && div.contains(answer) && !answer.disabled) {
			selectAnswer(answer);
		}
	}


	div.innerHTML = renderPadankan(data)
	ui.contentContainer.replaceChildren(div)

	div.addEventListener("click", handleClick);
	ui.btnNext.classList.add("hidden")
	ui.btnContainer.classList.remove("grid-2") 
	ui.dialog.innerHTML = data.text
	ui.btnBack.classList.add("hidden")

	ui.btnNext.addEventListener("click", handleComponentComplete)

	return function cleanup() {
		ui.btnNext.removeEventListener("click", handleComponentComplete)
	}
}
