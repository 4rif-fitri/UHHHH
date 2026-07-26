export function renderDiagramBox(data) {
	return `
		<div class="content grid-5 gap-1">

			${Array.from({ length: data.content.nombor })
			.map(() => `<div class="box"></div>`).join("")}
			
			${data.content.showAnswer ?
			Array.from({ length: data.content.pelengkap })
				.map(() => `<div class="box yellow"></div>`).join("")
			: ""
		}
		</div>

		<div class="content grid-5">
			<h1 class="text-center blue">${data.content.nombor}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center yellow">${data.content.showAnswer ? data.content.pelengkap : ""}</h1>
			<h1 class="text-center">=</h1>
			<h1 class="text-center">10</h1>
		</div>
	`
}