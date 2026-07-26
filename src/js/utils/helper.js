export function shuffle(data) {
	let result = [...data];

	for (let i = result.length - 1; i > 0; i--) {
		let randomIndex = Math.floor(
			Math.random() * (i + 1)
		);

		[result[i], result[randomIndex]] = [
			result[randomIndex],
			result[i]
		];
	}

	return result;
}

export function showCorrect(ui) {
	ui.btnCheck.classList.add("hidden")
	ui.btnContinue.classList.remove("hidden")

	ui.footer.classList.add("soft-betul")
	ui.btnContinue.classList.add("betul")
	ui.footerText.classList.remove("hidden")
	ui.footerText.classList.add("textBetul")
	ui.footerText.textContent = "BETUL"

}

export function showWrong(ui) {
	ui.btnCheck.classList.add("hidden")
	ui.btnContinue.classList.remove("hidden")

	ui.btnContinue.textContent = "RETRY"

	ui.footer.classList.add("soft-salah")
	ui.btnContinue.classList.add("salah")
	ui.footerText.classList.remove("hidden")
	ui.footerText.classList.add("textSalah")
	ui.footerText.textContent = "SALAH"

}

export function resetContentFooter(ui) {
	ui.btnCheck.classList.remove("hidden")
	ui.btnContinue.classList.add("hidden")

	ui.btnContinue.textContent = "CONTINUE"

	ui.footer.classList.remove("soft-salah", "soft-betul")
	ui.btnContinue.classList.remove("salah", "betul")
	ui.footerText.classList.add("hidden")
	ui.footerText.classList.remove("textSalah", "textBetul")

}