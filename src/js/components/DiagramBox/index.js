import { renderDiagramBox } from "./render.js";

export function mountDiagramBox({ div, data, ui, handleComponentComplete }){
	
	div.innerHTML = renderDiagramBox(data)
	ui.contentContainer.replaceChildren(div)
	ui.btnNext.classList.remove("hidden")

	ui.dialog.innerHTML = data.text

	ui.btnNext.addEventListener("click", handleComponentComplete)

	return function cleanup() {
		ui.btnNext.removeEventListener("click", handleComponentComplete)
	}
}