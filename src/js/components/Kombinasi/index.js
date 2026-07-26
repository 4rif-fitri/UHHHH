import { renderLearnKombinasi } from "./render.js";

export function mountKombinasi({ div, data, ui, handleComponentComplete }){
	
	div.innerHTML = renderLearnKombinasi(data)
	ui.contentContainer.replaceChildren(div)
	ui.btnNext.classList.remove("hidden")

	ui.dialog.innerHTML = data.text

	ui.btnNext.addEventListener("click", handleComponentComplete)
}