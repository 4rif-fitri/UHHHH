export function renderKombinasiTerbalik(data) {
	return `
		<div class="content grid-3">
			<h1 class="pecah text-center secondary">${data.content.part[0]}</h1>
			<h1></h1>
			<h1 class="pecah text-center yellow">${data.content.part[1]}</h1>
			<h1></h1>
			<h1 class="eqn text-center garisPecah2Terbalik primary target">${data.content.whole}</h1>
			<h1></h1>
		</div>
		<br>

		<div class="content grid-5">
			<h1 class="text-center bulat secondary aspect-square">${data.content.part[0]}</h1>
			<h1 class="text-center aspect-square">+</h1>
			<h1 class="text-center bulat yellow aspect-square">${data.content.part[1]}</h1>
			<h1 class="text-center aspect-square">=</h1>
			<h1 class="text-center eqn primary target aspect-square">${data.content.whole}</h1>
		</div>
		<br>
	`
}