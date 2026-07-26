export function renderLearnKombinasi(data) {
	return `
		<div class="content grid-3">
			<h1></h1>
			<h1 class="eqn text-center garisPecah2 primary">${data.content.whole}</h1>
			<h1></h1>
			<h1 class="pecah text-center secondary">${data.content.part[0]}</h1>
			<h1></h1>
			<h1 class="pecah text-center yellow">${data.content.part[1]}</h1>
		</div>

		<div class="content grid-5">
			<h1 class="text-center eqn primary">${data.content.whole}</h1>
			<h1 class="text-center">=</h1>
			<h1 class="text-center bulat secondary">${data.content.part[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="text-center bulat yellow">${data.content.part[1]}</h1>
		</div>

	`
}