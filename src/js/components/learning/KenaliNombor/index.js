import { renderKenaliNombor } from "./render.js";

export function mountKenaliNombor({ div, data, ui, handleComponentComplete, handleComponentBack }){
	
	div.innerHTML = renderKenaliNombor(data)
	ui.contentContainer.replaceChildren(div)
	ui.btnCheck.classList.add("hidden")
	
	ui.btnBack.classList.remove("hidden")
	ui.btnNext.classList.remove("hidden")

	ui.dialog.innerHTML = data.text

	ui.btnNext.addEventListener("click", handleComponentComplete)
	ui.btnBack.addEventListener("click", handleComponentBack)

	return function cleanup() {
		ui.btnNext.removeEventListener("click", handleComponentComplete)
		ui.btnBack.removeEventListener("click", handleComponentBack)
	}
}