import {
	renderGabungKumpulan
} from "./render.js";

export function mountGabungKumpulan({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let step = 0;
	let isBusy = false;

	const animations = [];
	const flyingCubes = [];

	let group1;
	let group2;
	let group1Container;
	let group2Container;
	let mergeGroup;
	let targetFrame;
	let equation;
	let equationAnswer;

	function getElements() {
		group1 =
			div.querySelector(".group1");

		group2 =
			div.querySelector(".group2");

		group1Container =
			div.querySelector(
				".group1-container"
			);

		group2Container =
			div.querySelector(
				".group2-container"
			);

		mergeGroup =
			div.querySelector(".merge-group");

		targetFrame =
			div.querySelector(".targetFrame");

		equation =
			div.querySelector("#equation");

		equationAnswer =
			div.querySelector(
				".equation-answer"
			);
	}

	function renderComponent() {
		div.innerHTML =
			renderGabungKumpulan(data);

		ui.contentContainer.replaceChildren(div);

		getElements();
	}

	function getDistance(source, target) {
		const sourceRect =
			source.getBoundingClientRect();

		const targetRect =
			target.getBoundingClientRect();

		return {
			sourceRect,

			x:
				targetRect.left +
				targetRect.width / 2 -
				(
					sourceRect.left +
					sourceRect.width / 2
				),

			y:
				targetRect.top +
				targetRect.height / 2 -
				(
					sourceRect.top +
					sourceRect.height / 2
				)
		};
	}

	function moveCube(source, target, delay) {
		return new Promise(resolve => {
			const {
				sourceRect,
				x,
				y
			} = getDistance(source, target);

			const clone =
				source.cloneNode(true);

			clone.classList.add(
				"flying-counter"
			);

			Object.assign(clone.style, {
				left: `${sourceRect.left}px`,
				top: `${sourceRect.top}px`,
				width: `${sourceRect.width}px`,
				height: `${sourceRect.height}px`
			});

			document.body.appendChild(clone);

			flyingCubes.push(clone);

			source.style.visibility = "hidden";
			target.classList.add("active");

			const animation = clone.animate(
				[
					{
						transform:
							"translate3d(0, 0, 0) scale(1)"
					},
					{
						transform: `
							translate3d(
								${x * 0.5}px,
								${(y * 0.5) - 50}px,
								0
							)
							scale(1.15)
						`
					},
					{
						transform: `
							translate3d(
								${x}px,
								${y}px,
								0
							)
							scale(1)
						`
					}
				],
				{
					duration: 900,
					delay,
					easing:
						"cubic-bezier(0.22, 1, 0.36, 1)",
					fill: "forwards"
				}
			);

			animations.push(animation);

			animation.onfinish = () => {
				target.classList.remove("active");

				target.appendChild(source);

				source.style.visibility = "";

				clone.remove();

				resolve();
			};
		});
	}

	async function mergeCubes() {
		isBusy = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const cubes = [
			...group1.querySelectorAll(".cube"),
			...group2.querySelectorAll(".cube")
		];

		const targets = [
			...targetFrame.querySelectorAll(
				".cube-target"
			)
		];

		if (cubes.length !== targets.length) {
			console.error(
				"Jumlah cube dan target tidak sama."
			);

			isBusy = false;
			return;
		}

		ui.dialog.textContent =
			"Semua Lego sedang digabungkan.";

		await Promise.all(
			cubes.map((cube, index) => {
				return moveCube(
					cube,
					targets[index],
					index * 140
				);
			})
		);

		ui.dialog.textContent =
			"Semua Lego telah digabungkan.";

		isBusy = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = false;
	}

	function wait(milliseconds) {
		return new Promise(resolve => {
			setTimeout(resolve, milliseconds);
		});
	}

	async function countCubes() {
		isBusy = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const cubes = [
			...targetFrame.querySelectorAll(".cube")
		];

		for (
			let index = 0;
			index < cubes.length;
			index++
		) {
			const cube = cubes[index];

			let number =
				cube.querySelector(".cube-number");

			// Cipta span jika HTML asal tak mempunyainya
			if (!number) {
				number =
					document.createElement("span");

				number.classList.add(
					"cube-number"
				);

				cube.appendChild(number);
			}

			number.textContent = index + 1;

			cube.classList.add("counting");

			ui.dialog.textContent =
				`Kira Lego: ${index + 1}`;

			await wait(500);

			cube.classList.remove("counting");
			cube.classList.add("counted");
		}

		ui.dialog.textContent =
			`Semuanya ada ${cubes.length} Lego.`;

		isBusy = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = false;
	}

	function showEquation() {
		equationAnswer.textContent =
			data.answer;

		equation.classList.add("show");

		ui.dialog.textContent =
			`${data.content.group1} tambah ${data.content.group2} sama dengan ${data.answer}.`;

		ui.btnNext.textContent =
			"SELESAI";
	}

	async function handleNext() {
		if (isBusy) return;

		if (step === 0) {
			group1Container.classList.add(
				"focus-group"
			);

			ui.dialog.textContent =
				`Kumpulan 1 mempunyai ${data.content.group1} Lego.`;

			step++;
			return;
		}

		if (step === 1) {
			group1Container.classList.remove(
				"focus-group"
			);

			group2Container.classList.add(
				"focus-group"
			);

			ui.dialog.textContent =
				`Kumpulan 2 mempunyai ${data.content.group2} Lego.`;

			step++;
			return;
		}

		if (step === 2) {
			group2Container.classList.remove(
				"focus-group"
			);

			mergeGroup.classList.add(
				"focus-group"
			);

			await mergeCubes();

			step++;
			return;
		}

		if (step === 3) {
			await countCubes();

			step++;
			return;
		}

		if (step === 4) {
			showEquation();

			step++;
			return;
		}

		if (step === 5) {
			handleComponentComplete();
		}
	}

	function resetActivity() {
		if (isBusy) return;

		animations.forEach(animation => {
			animation.cancel();
		});

		animations.length = 0;

		flyingCubes.forEach(cube => {
			cube.remove();
		});

		flyingCubes.length = 0;

		step = 0;
		isBusy = false;

		renderComponent();

		ui.dialog.textContent =
			data.text;

		ui.btnNext.textContent =
			"NEXT";

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = true;
	}

	function cleanup() {
		animations.forEach(animation => {
			animation.cancel();
		});

		flyingCubes.forEach(cube => {
			cube.remove();
		});

		ui.btnNext.removeEventListener(
			"click",
			handleNext
		);

		ui.btnBack.removeEventListener(
			"click",
			resetActivity
		);
	}

	renderComponent();

	ui.dialog.textContent = data.text;

	ui.btnCheck.classList.add("hidden");
	ui.btnContinue.classList.add("hidden");

	ui.btnNext.classList.remove("hidden");
	ui.btnBack.classList.remove("hidden");

	ui.btnNext.textContent = "NEXT";

	ui.btnBack.disabled = true;

	ui.btnNext.addEventListener(
		"click",
		handleNext
	);

	ui.btnBack.addEventListener(
		"click",
		resetActivity
	);

	return cleanup;
}