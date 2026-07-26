export function renderLearnBaki(data) {
	return `
		<div class="content grid-5">
			<h1 class="eqn text-center yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center garisPecah2">${data.content.nums[1]}</h1>
			<h1></h1>
			<h1></h1>
			<h1></h1>
			<h1 class="pecah text-center">${data.content.pelengkap}</h1>
			<h1></h1>
			<h1 class="pecah text-center">${data.content.baki}</h1>
		</div>
	`
}

export function renderLearnGabung(data) {
	return `
		<div class="content grid-4">
			<h1 class="eqn text-center redLine yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center garisPecah2">${data.content.nums[1]}</h1>
			<h1></h1>
			<h1></h1>
			<h1 class="pecah text-center arraowDorn">${data.content.pelengkap}</h1>
			<h1></h1>
			<h1 class="pecah text-center">${data.content.baki}</h1>
			<h1 class="hasil eqn">${data.content.pelengkap + data.content.nums[0]}</h1>
		</div>
	`
}

export function renderLearnNeeded(data) {
	return `
		<div class="content grid-5">
			<h1 class="eqn text-center yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center">${data.content.pelengkap}</h1>
			<h1 class="text-center">=</h1>
			<h1 class="text-center">${data.content.nums[0] + data.content.pelengkap}</h1>
		</div>
	`
}

export function renderLearnPecah(data) {
	return `
		<div class="content grid-3">
			<h1 class="eqn text-center yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center garisPecah1">${data.content.nums[1]}</h1>
			<h1></h1>
			<h1 class="pecah text-center">${data.content.pelengkap}</h1>
		</div>
	`
}

export function renderLearnPick(data) {
	return `
		<div class="content grid-3">
			<h1 class="eqn text-center yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center">${data.content.nums[1]}</h1>
		</div>
	`
}

export function renderLearnSum(data) {
	return `
		<div class="content grid-6">
			<h1 class="eqn text-center redLine yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="eqn text-center garisPecah2">${data.content.nums[1]}</h1>
			<h1></h1>
			<h1></h1>
			<h1></h1>
			<h1></h1>
			<h1 class="pecah text-center arraowDorn">${data.content.pelengkap}</h1>
			<h1></h1>
			<h1 class="pecah text-center arraowDownRight">${data.content.baki}</h1>
			<h1></h1>
			<h1></h1>
			<h1 class="hasil text-center eqn">${data.content.pelengkap + data.content.nums[0]}</h1>
			<h1 class="text-center col-span-2">+</h1>
			<h1 class="eqn text-center">${data.content.baki}</h1>
			<h1 class="ans text-center">=</h1>
			<h1 class="ans text-center">${data.content.jumlah}</h1>
		</div>

	`
}

export function renderLearnSummery(data) {
	return `
		<div class="content grid-5">
			<h1 class="text-center yellow">${data.content.nums[0]}</h1>
			<h1 class="text-center">+</h1>
			<h1 class="text-center">${data.content.nums[1]}</h1>
			<h1 class=" text-center">=</h1>
			<h1 class="eqn text-center ans">${data.content.jumlah}</h1>
		</div>
	`
}
