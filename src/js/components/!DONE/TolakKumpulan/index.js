import {
	renderTolakKumpulan
} from "./render.js";

export function mountTolakKumpulan({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let step = 0;
	let isBusy = false;

	const animations = [];
	const flyingCubes = [];
	const timers = [];

	let group1;
	let group1Container;
	let deleteContainer;
	let deleteFrame;
	let equation;
	let equationAnswer;

	function getElements() {
		group1 =
			div.querySelector(".group1");

		group1Container =
			div.querySelector(
				".group1-container"
			);

		deleteContainer =
			div.querySelector(
				".delete-container"
			);

		deleteFrame =
			div.querySelector(".deleteFrame");

		equation =
			div.querySelector("#equation");

		equationAnswer =
			div.querySelector(
				".equation-answer"
			);
	}

	function renderComponent() {
		div.innerHTML =
			renderTolakKumpulan(data);

		ui.contentContainer.replaceChildren(div);

		getElements();
	}

	function wait(milliseconds) {
		return new Promise(resolve => {
			const timer = setTimeout(
				resolve,
				milliseconds
			);

			timers.push(timer);
		});
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

	async function moveRemovedCubes() {
		isBusy = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const allCubes = [
			...group1.querySelectorAll(".cube")
		];

		/*
			Ambil cube dari bahagian paling akhir.
			Contoh 7 - 2: ambil cube ke-6 dan ke-7.
		*/
		const cubesToRemove =
			allCubes.slice(
				-data.content.remove
			);

		const targets = [
			...deleteFrame.querySelectorAll(
				".delete-target"
			)
		];

		ui.dialog.textContent =
			`Gerakkan ${data.content.remove} Lego ke tempat tolak.`;

		await Promise.all(
			cubesToRemove.map(
				(cube, index) => {
					return moveCube(
						cube,
						targets[index],
						index * 180
					);
				}
			)
		);

		ui.dialog.textContent =
			`${data.content.remove} Lego telah dikeluarkan.`;

		isBusy = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = false;
	}

	async function deleteRemovedCubes() {
		isBusy = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const removedCubes = [
			...deleteFrame.querySelectorAll(
				".cube"
			)
		];

		for (const cube of removedCubes) {
			cube.classList.add("deleting");

			await wait(350);

			cube.remove();
		}

		ui.dialog.textContent =
			"Sekarang mari kira berapa Lego yang tinggal.";

		isBusy = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = false;
	}

	async function countRemainingCubes() {
		isBusy = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const remainingCubes = [
			...group1.querySelectorAll(".cube")
		];

		for (
			let index = 0;
			index < remainingCubes.length;
			index++
		) {
			const cube = remainingCubes[index];

			const number =
				cube.querySelector(
					".cube-number"
				);

			number.textContent = index + 1;

			cube.classList.add("counting");

			ui.dialog.textContent =
				`Kira baki: ${index + 1}`;

			await wait(500);

			cube.classList.remove("counting");
			cube.classList.add("counted");
		}

		ui.dialog.textContent =
			`Tinggal ${remainingCubes.length} Lego.`;

		isBusy = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = false;
	}

	function showEquation() {
		equationAnswer.textContent =
			data.answer;

		equation.classList.add("show");

		ui.dialog.textContent =
			`${data.content.total} tolak ${data.content.remove} sama dengan ${data.answer}.`;

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
				`Kita bermula dengan ${data.content.total} Lego.`;

			step++;
			return;
		}

		if (step === 1) {
			group1Container.classList.remove(
				"focus-group"
			);

			deleteContainer.classList.add(
				"focus-delete"
			);

			ui.dialog.textContent =
				`Kita perlu menolak ${data.content.remove} Lego.`;

			step++;
			return;
		}

		if (step === 2) {
			await moveRemovedCubes();

			step++;
			return;
		}

		if (step === 3) {
			await deleteRemovedCubes();

			deleteContainer.classList.remove(
				"focus-delete"
			);

			step++;
			return;
		}

		if (step === 4) {
			group1Container.classList.add(
				"focus-group"
			);

			await countRemainingCubes();

			step++;
			return;
		}

		if (step === 5) {
			showEquation();

			step++;
			return;
		}

		if (step === 6) {
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

		timers.forEach(timer => {
			clearTimeout(timer);
		});

		timers.length = 0;

		step = 0;

		renderComponent();

		ui.dialog.textContent = data.text;

		ui.btnNext.textContent = "NEXT";
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

		timers.forEach(timer => {
			clearTimeout(timer);
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