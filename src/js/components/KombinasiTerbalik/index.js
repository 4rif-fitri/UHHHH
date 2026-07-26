import { renderKombinasiTerbalik } from "./render.js";

export function mountKombinasiTerbalik({ div, data, ui, handleComponentComplete }){
	
	div.innerHTML = renderKombinasiTerbalik(data)
	ui.contentContainer.replaceChildren(div)
	ui.btnNext.classList.remove("hidden")

	ui.dialog.innerHTML = data.text

	ui.btnNext.addEventListener("click", handleComponentComplete)
}