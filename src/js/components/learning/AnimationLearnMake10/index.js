import {
	renderAnimationLearnMake10
} from "./render.js";

export function mountAnimationLearnMake10({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	const {
		firstNumber,
		target = 10
	} = data.content;

	const needed =
		target - firstNumber;

	if (
		needed < 0 ||
		firstNumber > target
	) {
		throw new Error(
			`${firstNumber} tidak boleh digunakan untuk membina ${target}.`
		);
	}

	const steps = [
		{
			text:
				`Kita mempunyai ${firstNumber} Lego.`
		},
		{
			text:
				`${firstNumber} perlukan ${needed} Lego lagi untuk menjadi ${target}.`
		},
		{
			text:
				`Gerakkan ${needed} Lego ke petak kosong.`
		},
		{
			text:
				`Sekarang semuanya menjadi ${target} Lego.`
		},
		{
			text:
				`${firstNumber} tambah ${needed} sama dengan ${target}.`
		}
	];

	let stepIndex = 0;
	let isAnimating = false;
	let isDestroyed = false;
	let renderVersion = 0;

	const animations = new Set();
	const flyingCubes = new Set();

	ui.btnContainer.classList.add("grid-2");

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");

	ui.btnBack.classList.remove("hidden");
	ui.btnNext.classList.remove("hidden");

	function renderLayout() {
		renderVersion++;

		div.innerHTML =
			renderAnimationLearnMake10(data);

		ui.contentContainer.replaceChildren(div);
	}

	function getElements() {
		return {
			extraCubes: [
				...div.querySelectorAll(
					".extra-cubes .cube"
				)
			],

			targets: [
				...div.querySelectorAll(
					".addition-frame .cube-target"
				)
			],

			answerBox:
				div.querySelector(
					".answer-box"
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
				"drop-active"
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
								${(y * 0.5) - 45}px,
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
					easing:
						"cubic-bezier(0.22, 1, 0.36, 1)",
					fill: "forwards"
				}
			);

			animations.add(animation);

			function finishAnimation() {
				animations.delete(animation);
				flyingCubes.delete(clone);

				if (
					!isDestroyed &&
					version === renderVersion &&
					source.isConnected &&
					targetElement.isConnected
				) {
					targetElement.classList.remove(
						"drop-active"
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
		animations.forEach(animation => {
			animation.cancel();
		});

		animations.clear();

		flyingCubes.forEach(element => {
			element.remove();
		});

		flyingCubes.clear();
		isAnimating = false;
	}

	function highlightCubes(elements) {
		elements.extraCubes.forEach(cube => {
			cube.classList.add(
				"cube-to-move"
			);
		});

		elements.targets.forEach(targetElement => {
			targetElement.classList.add(
				"drop-active"
			);
		});
	}

	function placeCubesInstantly(elements) {
		elements.extraCubes.forEach(
			(cube, index) => {
				cube.classList.remove(
					"cube-to-move"
				);

				cube.classList.add(
					"cube-arrived"
				);

				elements.targets[index]
					.appendChild(cube);
			}
		);
	}

	async function animateCubes(elements) {
		isAnimating = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		const version = renderVersion;

		for (
			let index = 0;
			index < elements.extraCubes.length;
			index++
		) {
			if (
				isDestroyed ||
				version !== renderVersion
			) {
				return;
			}

			await moveCube(
				elements.extraCubes[index],
				elements.targets[index],
				version
			);
		}

		if (
			isDestroyed ||
			version !== renderVersion
		) {
			return;
		}

		isAnimating = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled =
			stepIndex === 0;
	}

	// function updateProgress() {
	// 	const current = stepIndex + 1;
	// 	const total = steps.length;

	// 	ui.textBar.textContent =
	// 		`${current}/${total} Slides`;

	// 	ui.barFill.style.width =
	// 		`${(current / total) * 100}%`;
	// }

	function updateButtons() {
		ui.btnBack.disabled =
			stepIndex === 0;

		ui.btnNext.textContent =
			stepIndex === steps.length - 1
				? "FINISH"
				: "NEXT";
	}

	async function showStep({
		playAnimation = false
	} = {}) {
		cancelAnimations();
		renderLayout();

		const elements = getElements();

		ui.dialog.textContent =
			steps[stepIndex].text;

		if (stepIndex === 1) {
			highlightCubes(elements);
		}

		if (stepIndex >= 2) {
			if (playAnimation) {
				await animateCubes(elements);
			} else {
				placeCubesInstantly(elements);
			}
		}

		elements.answerBox.textContent =
			stepIndex >= 3
				? target
				: "?";

		if (stepIndex >= 3) {
			elements.answerBox.classList.add(
				"matched"
			);
		}

		// updateProgress();
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
	};
}