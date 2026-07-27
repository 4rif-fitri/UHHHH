import {
	showWrong,
	showCorrect,
	resetContentFooter
} from "../../utils/helper.js";

export function mountLatihanPelengkap10({ div, data, ui, handleComponentComplete, registry }) {
	let questionIndex = 0;
	let stepIndex = 0;
	let steps = [];

	let selectedValue = null;
	let selectedElement = null;
	let isLocked = false;

	ui.btnContainer.classList.remove("grid-2")


	function createOptions(answer) {
		const options = new Set([answer]);

		while (options.size < 3) {
			const offset =
				Math.floor(Math.random() * 5) - 2;

			const option = answer + offset;

			if (option >= 0) {
				options.add(option);
			}
		}

		return [...options]
			.sort(() => Math.random() - 0.5);
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
				text: "_ ialah nombor paling besar",
				type: "Pick",
				content,
				options: [besar, kecil],
				answer: besar
			},
			{
				text: `${besar} perlukan _ untuk jadi 10?`,
				type: "Needed",
				content,
				options: createOptions(pelengkap),
				answer: pelengkap
			},
			{
				text: `${pelengkap} itu kita akan ambil dari _`,
				type: "Pecah",
				content,
				options: createOptions(kecil),
				answer: kecil
			},
			{
				text: `${kecil} dipecahkan kepada ${pelengkap} dan _`,
				type: "Baki",
				content,
				options: createOptions(baki),
				answer: baki
			},
			{
				text: `${besar} tambah ${pelengkap} akan dapat _`,
				type: "Gabung",
				content,
				options: createOptions(10),
				answer: 10
			},
			{
				text: `10 tambah ${baki} akan dapat _`,
				type: "Sum",
				content,
				options: createOptions(jumlah),
				answer: jumlah
			},
			{
				text: `${besar} tambah ${kecil} akan dapat _`,
				type: "Summery",
				content,
				options: createOptions(jumlah),
				answer: jumlah
			}
		];
	}

	function updateProgress() {
		const total =
			data.content.length * steps.length;

		const current =
			(questionIndex * steps.length) +
			stepIndex +
			1;

		ui.textBar.textContent =
			`${current}/${total} Questions`;

		ui.barFill.style.width =
			`${(current / total) * 100}%`;
	}

	function renderStep() {
		const currentData = steps[stepIndex];
		const widget = registry[currentData.type];

		if (!widget?.render) {
			console.error(
				`Widget "${currentData.type}" tidak dijumpai`
			);
			return;
		}

		selectedValue = null;
		selectedElement = null;
		isLocked = false;

		resetContentFooter(ui);

		div.innerHTML = widget.render(currentData);
		ui.contentContainer.replaceChildren(div);

		ui.dialog.textContent = currentData.text;

		ui.btnCheck.classList.remove("hidden");
		ui.btnContinue.classList.add("hidden");
		ui.btnBack?.classList.add("hidden");
		ui.btnNext?.classList.add("hidden");

		widget.setup?.(
			(value, element) => {
				if (isLocked) return;

				selectedValue = value;
				selectedElement = element;
			},
			() => !isLocked,
			div
		);

		updateProgress();
	}

	function loadQuestion() {
		steps = generateSteps(data.content[questionIndex]);

		stepIndex = 0;
		renderStep();
	}

	function handleCheck() {
		if (selectedValue === null || isLocked) {
			return;
		}

		const currentData = steps[stepIndex];
		const widget = registry[currentData.type];

		isLocked = true;

		const isCorrect = widget.check ? 
			widget.check(selectedValue, currentData) 
			: Number(selectedValue) === Number(currentData.answer);

		if (isCorrect) {
			showCorrect(ui);

			const answerPlace = div.querySelector(".tempatKosong");
			console.log(answerPlace);
			
			if (answerPlace) {
				answerPlace.textContent = currentData.answer;
			}

			widget.afterCorrect?.(selectedValue,currentData,selectedElement);
		} else {
			showWrong(ui);
		}
	}

	function handleContinue() {
		const currentData = steps[stepIndex];

		const isCorrect =
			Number(selectedValue) ===
			Number(currentData.answer);

		resetContentFooter(ui);

		if (!isCorrect) {
			isLocked = false;
			selectedValue = null;
			selectedElement = null;

			div.querySelectorAll(".btnAns")
				.forEach(button => {
					button.classList.remove("higlight");
				});

			return;
		}

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

	ui.btnCheck.addEventListener("click",handleCheck);
	ui.btnContinue.addEventListener("click",handleContinue);

	loadQuestion();

	return function cleanup() {
		ui.btnCheck.removeEventListener("click",handleCheck);
		ui.btnContinue.removeEventListener("click",handleContinue);
	};
}