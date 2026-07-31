import {
	renderAnimationLearnPelengkap10
} from "./render.js";

export function mountAnimationLearnPelengkap10({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const {
		firstNumber,
		secondNumber,
		target = 10
	} = data.content;

	const needed =
		target - firstNumber;

	const remainder =
		secondNumber - needed;

	const finalAnswer =
		firstNumber + secondNumber;

	if (
		needed < 0 ||
		needed > secondNumber
	) {
		throw new Error(
			`Data tidak sesuai: ${firstNumber} + ` +
			`${secondNumber}, target ${target}.`
		);
	}

	const steps = [
		{
			text:
				`Kita mempunyai ${firstNumber} Lego dan ${secondNumber} Lego.`
		},
		{
			text:
				`${firstNumber} perlukan ${needed} Lego lagi untuk menjadi ${target}.`
		},
		{
			text:
				`Gerakkan ${needed} daripada ${secondNumber} Lego ke petak kosong.`
		},
		{
			text:
				`Sekarang terdapat ${target} Lego dan baki ${remainder} Lego.`
		},
		{
			text:
				`${target} tambah ${remainder} sama dengan ${finalAnswer}. ` +
				`Jadi, ${firstNumber} tambah ${secondNumber} sama dengan ${finalAnswer}.`
		}
	];

	let stepIndex = 0;
	let isAnimating = false;
	let isDestroyed = false;
	let renderVersion = 0;

	const activeAnimations = new Set();
	const flyingCubes = new Set();

	ui.btnContainer.classList.add("grid-2");

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");

	ui.btnBack.classList.remove("hidden");
	ui.btnNext.classList.remove("hidden");

	function renderLayout() {
		renderVersion++;

		div.innerHTML =
			renderAnimationLearnPelengkap10(data);

		ui.contentContainer.replaceChildren(div);
	}

	function getElements() {
		return {
			leftContainer:
				div.querySelector(
					".cubee-container-left"
				),

			rightContainer:
				div.querySelector(
					".cubee-container-right"
				),

			targets: [
				...div.querySelectorAll(
					".cubee-container-left .cube-target"
				)
			],

			sourceCubes: [
				...div.querySelectorAll(
					".cubee-container-right .cube"
				)
			],

			equationFirst:
				div.querySelector(
					".equation-first"
				),

			equationSecond:
				div.querySelector(
					".equation-second"
				),

			equationAnswer:
				div.querySelector(
					".equation-answer"
				)
		};
	}

	function getDistance(source, targetElement) {
		const sourceRect =
			source.getBoundingClientRect();

		const targetRect =
			targetElement.getBoundingClientRect();

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

	function moveCube(
		source,
		targetElement,
		delay,
		version
	) {
		return new Promise(resolve => {
			if (
				isDestroyed ||
				version !== renderVersion
			) {
				resolve();
				return;
			}

			const {
				sourceRect,
				x,
				y
			} = getDistance(
				source,
				targetElement
			);

			const clone =
				source.cloneNode(true);

			clone.classList.add(
				"flying-cube"
			);

			Object.assign(clone.style, {
				left: `${sourceRect.left}px`,
				top: `${sourceRect.top}px`,
				width: `${sourceRect.width}px`,
				height: `${sourceRect.height}px`
			});

			document.body.appendChild(clone);

			flyingCubes.add(clone);

			source.style.visibility = "hidden";

			targetElement.classList.add(
				"active"
			);

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
								${(y * 0.5) - 40}px,
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
					duration: 850,
					delay,
					easing:
						"cubic-bezier(0.22, 1, 0.36, 1)",
					fill: "forwards"
				}
			);

			activeAnimations.add(animation);

			function finishAnimation() {
				activeAnimations.delete(animation);
				flyingCubes.delete(clone);

				if (
					!isDestroyed &&
					version === renderVersion &&
					source.isConnected &&
					targetElement.isConnected
				) {
					targetElement.classList.remove(
						"active"
					);

					source.classList.remove(
						"cube-to-move"
					);

					source.classList.add(
						"cube-arrived"
					);

					targetElement.appendChild(source);

					source.style.visibility = "";
				}

				clone.remove();
				resolve();
			}

			animation.onfinish =
				finishAnimation;

			animation.oncancel = () => {
				flyingCubes.delete(clone);
				clone.remove();
				resolve();
			};
		});
	}

	function cancelAnimations() {
		activeAnimations.forEach(animation => {
			animation.cancel();
		});

		activeAnimations.clear();

		flyingCubes.forEach(cube => {
			cube.remove();
		});

		flyingCubes.clear();

		isAnimating = false;
	}

	function highlightMovement(elements) {
		elements.targets.forEach(targetElement => {
			targetElement.classList.add(
				"active"
			);
		});

		elements.sourceCubes
			.slice(0, needed)
			.forEach(cube => {
				cube.classList.add(
					"cube-to-move"
				);
			});
	}

	function placeCubesWithoutAnimation(elements) {
		const cubesToMove =
			elements.sourceCubes.slice(0, needed);

		cubesToMove.forEach((cube, index) => {
			cube.classList.remove(
				"cube-to-move"
			);

			elements.targets[index]
				.appendChild(cube);
		});

		elements.rightContainer
			.querySelectorAll(".cube")
			.forEach(cube => {
				cube.classList.add(
					"cube-remain"
				);
			});
	}

	async function moveNeededCubes(elements) {
		isAnimating = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const version = renderVersion;

		const cubesToMove =
			elements.sourceCubes.slice(0, needed);

		for (
			let index = 0;
			index < cubesToMove.length;
			index++
		) {
			if (
				isDestroyed ||
				version !== renderVersion
			) {
				return;
			}

			await moveCube(
				cubesToMove[index],
				elements.targets[index],
				0,
				version
			);
		}

		if (
			isDestroyed ||
			version !== renderVersion
		) {
			return;
		}

		elements.rightContainer
			.querySelectorAll(".cube")
			.forEach(cube => {
				cube.classList.add(
					"cube-remain"
				);
			});

		isAnimating = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled =
			stepIndex === 0;
	}

	function updateEquation(elements) {
		if (stepIndex < 3) {
			elements.equationFirst.textContent =
				firstNumber;

			elements.equationSecond.textContent =
				secondNumber;

			elements.equationAnswer.textContent =
				"?";

			return;
		}

		elements.equationFirst.textContent =
			target;

		elements.equationSecond.textContent =
			remainder;

		elements.equationAnswer.textContent =
			stepIndex === 4
				? finalAnswer
				: "?";

		if (stepIndex === 4) {
			elements.equationAnswer
				.parentElement
				.classList.add("matched");
		}
	}

	function updateProgress() {
		const current = stepIndex + 1;
		const total = steps.length;

		ui.textBar.textContent =
			`${current}/${total} Slides`;

		ui.barFill.style.width =
			`${(current / total) * 100}%`;
	}

	function updateButtons() {
		ui.btnBack.disabled =
			stepIndex === 0;

		ui.btnNext.textContent =
			stepIndex === steps.length - 1
				? "FINISH"
				: "NEXT";
	}

	/*
		Setiap kali NEXT atau BACK:
		1. Render semula layout yang sama.
		2. Bina keadaan berdasarkan stepIndex.
		3. Animasi hanya dimainkan apabila masuk step 2.
	*/
	async function showStep({
		playAnimation = false
	} = {}) {
		cancelAnimations();
		renderLayout();

		const elements = getElements();

		ui.dialog.textContent =
			steps[stepIndex].text;

		ui.dialog.style.color = "";

		if (stepIndex === 1) {
			highlightMovement(elements);
		}

		if (stepIndex >= 2) {
			if (playAnimation) {
				await moveNeededCubes(elements);
			} else {
				placeCubesWithoutAnimation(elements);
			}
		}

		updateEquation(elements);
		updateProgress();
		updateButtons();
	}

	async function handleNext() {
		if (isAnimating) return;

		if (stepIndex < steps.length - 1) {
			stepIndex++;

			await showStep({
				playAnimation:
					stepIndex === 2
			});

			return;
		}

		handleComponentComplete();
	}

	function handleBack() {
		if (
			isAnimating ||
			stepIndex === 0
		) {
			return;
		}

		stepIndex--;
		showStep();
	}

	ui.btnNext.addEventListener(
		"click",
		handleNext
	);

	ui.btnBack.addEventListener(
		"click",
		handleBack
	);

	showStep();

	return function cleanup() {
		isDestroyed = true;
		renderVersion++;

		cancelAnimations();

		ui.btnNext.removeEventListener(
			"click",
			handleNext
		);

		ui.btnBack.removeEventListener(
			"click",
			handleBack
		);

		ui.dialog.style.color = "";
	};
}