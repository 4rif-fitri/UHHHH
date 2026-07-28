export function renderKenaliNombor(data) {
	return `
		<div class="cubes-container">
			${Array.from({ length: data.content.number }, (_, index) => `
				<div class="cube" data-index="${index+1}"></div>
			`).join("")}
		</div>

		<div class="textHuruf">
			<h1>${data.content.number}</h1>
			<article>
				<h2>${data.content.numberName.malay}</h2>
				<h2>${data.content.numberName.english}</h2>
			</article>
		</div>
	`
}