import { renderAnimationLearnGabungPart } from "./render.js";

export function mountAnimationLearnGabungPart({div,data,ui,handleComponentComplete}) {
	let {
		part1,
		part2
	} = data.content;

	let whole =
		part1 + part2;

	let steps = [
		{
			text:
				`Bahagian pertama mempunyai ${part1} Lego.`
		},
		{
			text:
				`Bahagian kedua mempunyai ${part2} Lego.`
		},
		{
			text:
				"Mari gabungkan kedua-dua Part menjadi satu Whole."
		},
		{
			text:
				`Sekarang semuanya menjadi satu Whole yang mempunyai ${whole} Lego.`
		},
		{
			text:
				`${part1} tambah ${part2} sama dengan ${whole}.`
		}
	];

	let stepIndex = 0;
	let isAnimating = false;
	let isDestroyed = false;
	let renderVersion = 0;

	let animations = new Set();
	let flyingCubes = new Set();

	ui.btnContainer.classList.add("grid-2");

	ui.btnCheck?.classList.add("hidden");
	ui.btnContinue?.classList.add("hidden");

	ui.btnBack.classList.remove("hidden");
	ui.btnNext.classList.remove("hidden");

	function renderLayout() {
		renderVersion++;

		div.innerHTML = renderAnimationLearnGabungPart(data);

		ui.contentContainer.replaceChildren(div);
	}

	function getElements() {
		let part1Row = div.querySelector(".part1 > div");

		let part2Row = div.querySelector(".part2 > div");

		let wholeRow = div.querySelector(".whole > div");

		return { part1Row, part2Row, wholeRow,

			part1Cubes: [...part1Row.querySelectorAll(".cube")],
			part2Cubes: [...part2Row.querySelectorAll(".cube")],
			wholeTargets: [...wholeRow.querySelectorAll(".cube-target")]

		};
	}

	function addColours(elements) {
		elements.part1Cubes.forEach(cube => cube.classList.add("part-one-cube"));
		elements.part2Cubes.forEach(cube => cube.classList.add("part-two-cube"));
	}

	function highlightParts(elements) {
		
		[...elements.part1Cubes,...elements.part2Cubes]
			.forEach(cube => cube.classList.add("part-highlight"));

		elements.wholeTargets.forEach(targetElement => 
			targetElement.classList.add("target-active")
		);
	}

	function getDistance(source, targetElement) {
		let sourceRect = source.getBoundingClientRect();

		let targetRect = targetElement.getBoundingClientRect();

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

	function moveCube(source, targetElement, version) {
		
		return new Promise(resolve => {
			if (isDestroyed || version !== renderVersion) {
				resolve();
				return;
			}

			let { sourceRect, x, y } = getDistance(source,targetElement);

			let clone = source.cloneNode(true);

			clone.classList.remove("part-highlight");
			clone.classList.add("flying-part-cube");

			Object.assign(clone.style, {
				left: `${sourceRect.left}px`,
				top: `${sourceRect.top}px`,
				width: `${sourceRect.width}px`,
				height: `${sourceRect.height}px`
			});

			document.body.appendChild(clone);

			flyingCubes.add(clone);

			source.style.visibility = "hidden";

			targetElement.classList.add("target-active");

			let animation = clone.animate(
				[
					{
						transform:
							"translate3d(0, 0, 0) scale(1)"
					},
					{
						transform: `
							translate3d(
								${x * 0.5}px,
								${(y * 0.5) - 35}px,
								0
							)
							scale(1.12)
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
					duration: 800,
					easing:
						"cubic-bezier(0.22, 1, 0.36, 1)",
					fill: "forwards"
				}
			);

			animations.add(animation);

			function finishAnimation() {
				animations.delete(animation);
				flyingCubes.delete(clone);

				if (!isDestroyed && version === renderVersion && source.isConnected && targetElement.isConnected) {

					targetElement.classList.remove("target-active");
					source.classList.remove("part-highlight");
					source.classList.add("part-arrived");
					targetElement.appendChild(source);

					source.style.visibility = "";
				}

				clone.remove();
				resolve();
			}

			animation.onfinish = finishAnimation;

			animation.oncancel = () => {
				flyingCubes.delete(clone);
				clone.remove();
				resolve();
			};
		});
	}

	async function animateGabung(elements) {
		isAnimating = true;

		ui.btnNext.disabled = true;
		ui.btnBack.disabled = true;

		let version = renderVersion;

		let allCubes = [...elements.part1Cubes, ...elements.part2Cubes];

		for (let index = 0; index < allCubes.length; index++) {

			if (isDestroyed || version !== renderVersion) return

			await moveCube(allCubes[index], elements.wholeTargets[index], version);
		}

		if (isDestroyed || version !== renderVersion) return


		isAnimating = false;

		ui.btnNext.disabled = false;
		ui.btnBack.disabled = stepIndex === 0;
	}

	function placeCubesInstantly(elements) {
		let allCubes = [...elements.part1Cubes, ...elements.part2Cubes];

		allCubes.forEach((cube, index) => {
			cube.classList.remove("part-highlight");
			cube.classList.add("part-arrived");

			elements.wholeTargets[index].appendChild(cube);
		});
	}

	function cancelAnimations() {
		animations.forEach(animation => animation.cancel());
		animations.clear();

		flyingCubes.forEach(element => element.remove());
		flyingCubes.clear();

		isAnimating = false;
	}

	// function updateProgress() {
	// 	let current = stepIndex + 1;
	// 	let total = steps.length;

	// 	ui.textBar.textContent = `${current}/${total} Slides`;
	// 	ui.barFill.style.width = `${(current / total) * 100}%`;
	// }

	function updateButtons() {
		ui.btnBack.disabled = stepIndex === 0;
		ui.btnNext.textContent = stepIndex === steps.length - 1 ? "FINISH" : "NEXT";
	}

	async function showStep({ playAnimation = false } = {}) {
		cancelAnimations();
		renderLayout();

		let elements = getElements();

		addColours(elements);

		ui.dialog.textContent = steps[stepIndex].text;

		ui.dialog.style.color = "";

		if (stepIndex === 1) {
			/*
				Part kedua baru diperkenalkan.
				Highlight kumpulan oren sahaja.
			*/

			elements.part2Cubes.forEach(cube => {
				cube.classList.add(
					"part-highlight"
				);
			});
		}

		if (stepIndex === 2) {
			highlightParts(elements);
		}

		if (stepIndex >= 3) {
			if (playAnimation) {
				highlightParts(elements);
				await animateGabung(elements);
			} else {
				placeCubesInstantly(elements);
			}
		}

		// updateProgress();
		updateButtons();
	}

	async function handleNext() {
		if (isAnimating) return;

		if (stepIndex < steps.length - 1) {
			stepIndex++;

			await showStep({ playAnimation: stepIndex === 3 });

			return;
		}

		handleComponentComplete();
	}

	function handleBack() {
		if (isAnimating || stepIndex === 0) return

		stepIndex--;
		showStep();
	}

	ui.btnNext.addEventListener("click", handleNext);
	ui.btnBack.addEventListener("click", handleBack);

	showStep();

	return function cleanup() {
		isDestroyed = true;
		renderVersion++;

		cancelAnimations();

		ui.btnNext.removeEventListener("click", handleNext);
		ui.btnBack.removeEventListener("click", handleBack);
		ui.dialog.style.color = "";
	};
}