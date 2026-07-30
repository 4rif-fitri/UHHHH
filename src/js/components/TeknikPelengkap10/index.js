export function mountTeknikPelengkap10({ div, data, ui, handleComponentComplete, registry }) {
	let questionIndex = 0;
	let stepIndex = 0;
	let steps = [];

	ui.btnContainer.classList.add("grid-2")

	function updateProgress() {
		const totalSteps =
			data.content.length * steps.length;

		const currentStep =
			(questionIndex * steps.length) +
			stepIndex +
			1;

		const percentage =
			(currentStep / totalSteps) * 100;

		ui.textBar.textContent =
			`${currentStep}/${totalSteps} Slides`;

		ui.barFill.style.width =
			`${percentage}%`;
	}

	function generateSteps(question) {
		const [a, b] = question.options;
		const besar = Math.max(a, b);
		const kecil = Math.min(a, b);
		const pelengkap = 10 - besar;
		const baki = kecil - pelengkap;
		const jumlah = besar + kecil;
		const content = {
			nums: [besar, kecil],
			pelengkap,
			baki,
			jumlah
		};

		return [
			{
				text: "Mari belajar teknik pelengkap 10 step by step",
				type: "LearnInit",
				content
			},
			{
				text: "Pilih nombor paling besar",
				type: "LearnPick",
				content
			},
			{
				text: `${besar} perlukan ${pelengkap} untuk jadi 10`,
				type: "LearnNeeded",
				content
			},
			{
				text: `${pelengkap} itu kita akan ambil dari ${kecil}`,
				type: "LearnPecah",
				content
			},
			{
				text: `${kecil} dipecahkan kepada ${pelengkap} dan ${baki}`,
				type: "LearnBaki",
				content
			},
			{
				text: `${besar} tambah ${pelengkap} akan dapat 10`,
				type: "LearnGabung",
				content
			},
			{
				text: `10 tambah ${baki} akan dapat ${jumlah}`,
				type: "LearnSum",
				content
			},
			{
				text: `${besar} tambah ${kecil} akan dapat ${jumlah}`,
				type: "LearnSummery",
				content
			}
		];
	}

	function loadQuestion() {
		steps = generateSteps(data.content[questionIndex]);
		stepIndex = 0;

		renderStep();
	}

	function renderStep() {
		const step = steps[stepIndex];
		const widget = registry[step.type];

		if (!widget?.render) {
			console.error(
				`Widget "${step.type}" tak dijumpai`
			);
			return;
		}

		div.innerHTML = widget.render(step);

		ui.dialog.textContent = step.text;
		ui.contentContainer.replaceChildren(div);

		updateProgress();
		updateButtons();
	}

	function updateButtons() {
		const first =
			questionIndex === 0 &&
			stepIndex === 0;

		const last =
			questionIndex ===
			data.content.length - 1 &&
			stepIndex ===
			steps.length - 1;

		ui.btnBack.disabled = first;

		ui.btnNext.textContent =
			last ? "FINISH" : "NEXT";
	}

	function handleNext() {
		if (stepIndex < steps.length - 1) {
			stepIndex++;
			renderStep();
			return;
		}

		if (questionIndex < data.content.length - 1) {
			questionIndex++;
			loadQuestion();
			return;
		}

		handleComponentComplete();
	}

	function handleBack() {
		if (stepIndex > 0) {
			stepIndex--;
			renderStep();
			return;
		}

		if (questionIndex > 0) {
			questionIndex--;

			steps = generateSteps(
				data.content[questionIndex]
			);

			stepIndex =
				steps.length - 1;

			renderStep();
		}
	}

	ui.btnNext.classList.remove("hidden");
	ui.btnBack.classList.remove("hidden");
	ui.btnCheck?.classList.add("hidden");

	ui.btnNext.addEventListener("click", handleNext);

	ui.btnBack.addEventListener("click", handleBack);

	loadQuestion();

	return function cleanup() {
		ui.btnNext.removeEventListener("click", handleNext);
		ui.btnBack.removeEventListener("click", handleBack);
	};
}