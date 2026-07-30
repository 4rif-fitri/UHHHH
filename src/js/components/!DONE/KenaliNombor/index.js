import { renderKenaliNombor } from "./render.js";

export function mountKenaliNombor({ div, data, ui, handleComponentComplete }){
	
	div.innerHTML = renderKenaliNombor(data)
	ui.contentContainer.replaceChildren(div)
	ui.btnCheck.classList.add("hidden")
	ui.btnNext.classList.remove("hidden")

	ui.dialog.innerHTML = data.text

	ui.btnNext.addEventListener("click", handleComponentComplete)

	return function cleanup() {
		ui.btnNext.removeEventListener("click", handleComponentComplete)
	}
}