import { renderPadankan } from "./render.js";

export function mountPadankan({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const state = {
		selectedQuestion: null,
		selectedAnswer: null,
		matchedPairs: 0,
		attempts: 0,
		isLocked: false,
		timeoutId: null
	};

	const totalPairs = data.content.length;

	function finishComponent() {
		ui.dialog.textContent =
			`Semua pasangan berjaya ditemui dalam ${state.attempts} percubaan.`;

		ui.btnNext.classList.remove("hidden");
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

	function getMatchId(element) {
		// Support data-match-id dan data-key lama
		return element.dataset.matchId ??
			element.dataset.key;
	}

	function checkPair() {
		const question = state.selectedQuestion;
		const answer = state.selectedAnswer;

		if (!question || !answer || state.isLocked) {
			return;
		}

		state.isLocked = true;
		state.attempts++;

		const isCorrect =
			getMatchId(question) === getMatchId(answer);

		if (isCorrect) {
			handleCorrect(question, answer);
		} else {
			handleWrong(question, answer);
		}
	}

	function selectQuestion(element) {
		if (state.isLocked) return;

		state.selectedQuestion?.classList.remove("selected");

		state.selectedQuestion = element;
		element.classList.add("selected");

		checkPair();
	}

	function selectAnswer(element) {
		if (state.isLocked) return;

		state.selectedAnswer?.classList.remove("selected");

		state.selectedAnswer = element;
		element.classList.add("selected");

		checkPair();
	}

	function handleClick(event) {
		const question =
			event.target.closest(".boxSoalan");

		const answer =
			event.target.closest(".boxJawapan");

		if (
			question &&
			div.contains(question) &&
			!question.disabled
		) {
			selectQuestion(question);
			return;
		}

		if (
			answer &&
			div.contains(answer) &&
			!answer.disabled
		) {
			selectAnswer(answer);
		}
	}

	// UI asal — tidak diubah
	div.innerHTML = renderPadankan(data);
	ui.contentContainer.replaceChildren(div);

	div.addEventListener("click", handleClick);
	ui.btnNext.classList.add("hidden");
	ui.btnContainer.classList.remove("grid-2");
	ui.dialog.innerHTML = data.text;
	ui.btnBack.classList.add("hidden");
	ui.btnCheck.classList.add("hidden");

	ui.btnNext.addEventListener(
		"click",
		handleComponentComplete
	);

	return function cleanup() {
		clearTimeout(state.timeoutId);

		div.removeEventListener(
			"click",
			handleClick
		);

		ui.btnNext.removeEventListener(
			"click",
			handleComponentComplete
		);
	};
}