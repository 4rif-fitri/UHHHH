import { renderMaking10 } from "./render.js";

export function mountMaking10({
	div,
	data,
	ui,
	handleComponentComplete
}) {
	let selectedValue = null;
	let selectedButton = null;
	let isLocked = false;
	let wrongTimeout = null;

	div.innerHTML = renderMaking10(data);

	ui.contentContainer.replaceChildren(div);
	ui.dialog.textContent = data.text;

	ui.btnContainer?.classList.remove("grid-2");

	ui.btnCheck.classList.remove("hidden");
	ui.btnNext.classList.add("hidden");
	ui.btnCheck.disabled = true;

	function handleOptionClick(event) {
		if (isLocked) return;

		const button =
			event.target.closest(".btnAns");

		if (!button) return;

		div.querySelectorAll(".btnAns")
			.forEach(item => {
				item.classList.remove(
					"higlight",
					"wrong"
				);
			});

		button.classList.add("higlight");

		selectedButton = button;
		selectedValue =
			Number(button.dataset.value);

		ui.btnCheck.disabled = false;

		ui.dialog.textContent = data.text;
		ui.dialog.style.color = "";
	}

	function handleCheck() {
		if (isLocked) return;
		if (selectedValue === null) return;

		const isCorrect =
			selectedValue === Number(data.answer);

		if (isCorrect) {
			handleCorrect();
			return;
		}

		handleWrong();
	}

	function handleCorrect() {
		isLocked = true;

		selectedButton.classList.remove(
			"higlight"
		);

		selectedButton.classList.add(
			"matched"
		);

		div.querySelector(".eqn")
			.textContent = data.answer;

		div.querySelectorAll(".empty-box")
			.forEach(box => {
				box.classList.add("yellow");
			});

		ui.dialog.textContent =
			"Betul! Nombor telah dilengkapkan menjadi 10.";

		ui.dialog.style.color =
			"#22a000";

		ui.btnCheck.classList.add("hidden");
		ui.btnNext.classList.remove("hidden");
	}

	function handleWrong() {
		isLocked = true;

		const wrongButton =
			selectedButton;

		wrongButton.classList.remove(
			"higlight"
		);

		wrongButton.classList.add(
			"wrong"
		);

		ui.dialog.textContent =
			"Salah. Cuba kira kotak yang masih kosong.";

		ui.dialog.style.color =
			"#e53935";

		ui.btnCheck.disabled = true;

		wrongTimeout = setTimeout(() => {
			wrongButton.classList.remove(
				"wrong"
			);

			selectedValue = null;
			selectedButton = null;
			isLocked = false;

			ui.dialog.textContent =
				data.text;

			ui.dialog.style.color = "";
		}, 500);
	}

	function handleNext() {
		if (!isLocked) return;

		ui.dialog.style.color = "";

		handleComponentComplete();
	}

	div.addEventListener(
		"click",
		handleOptionClick
	);

	ui.btnCheck.addEventListener(
		"click",
		handleCheck
	);

	ui.btnNext.addEventListener(
		"click",
		handleNext
	);

	return function cleanup() {
		clearTimeout(wrongTimeout);

		div.removeEventListener(
			"click",
			handleOptionClick
		);

		ui.btnCheck.removeEventListener(
			"click",
			handleCheck
		);

		ui.btnNext.removeEventListener(
			"click",
			handleNext
		);
	};
}