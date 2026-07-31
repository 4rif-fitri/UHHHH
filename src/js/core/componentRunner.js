import { widgetRegistry } from "../utils/widgetRegistry.js"

export function runComponents(data) {

	let ui = {
		textBar: document.querySelector(".text-bar"),
		barFill: document.querySelector(".barFill"),
		dialog: document.querySelector(".dialog p"),
		contentContainer: document.querySelector(".contentContainer"),
		footer: document.querySelector("footer"),
		footerText: document.querySelector("footer .textContainer h2"),
		footerDes: document.querySelector("footer .textContainer p"),
		btnContainer: document.querySelector(".btnContainer"),
		btnContinue: document.querySelector(".btnContinue"),
		btnCheck: document.querySelector(".btnCheck"),
		btnBack: document.querySelector(".btnBack"),
		btnNext: document.querySelector(".btnNext"),
	}

	const state = {
		index: 0,
		currentData: null,
		currentComponent: null,
		phase: "rendering",
		// currentResult: null,
		results: [],
		cleanup: null,
		totalSlide: null,

	};

	function loadComponentStyle(component) {
		if (!component.style) {
			return Promise.resolve();
		}

		const oldStyle = document.querySelector(
			`link[data-component-style="${component.style}"]`
		);

		if (oldStyle) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			const link = document.createElement("link");

			link.rel = "stylesheet";
			link.href = component.style;
			link.dataset.componentStyle =
				component.style;

			link.onload = resolve;
			link.onerror = reject;

			document.head.appendChild(link);
		});
	}

	function handleComponentComplete() {
		state.index++;

		if (state.index >= data.length) {
			console.log("Semua selesai");
			return;
		}

		state.cleanup?.();
		state.cleanup = null;
		main();
	}

	function handleComponentBack() {
		if (state.index <= 0) return;

		state.index--;

		state.cleanup?.();
		state.cleanup = null;

		main();
	}

	function updateProgress() {
		let current = state.index + 1
		let total = state.totalSlide
		let persentage = (current / total) * 100

		ui.textBar.textContent = `${current}/` + `${total} Slides`;
		ui.barFill.style.width = `${persentage}%`;
	}

	async function main() {
		state.currentData = data[state.index];
		state.totalSlide = data.length;

		if (!state.currentData) return;

		updateProgress();

		state.cleanup?.();
		state.cleanup = null;

		const component = widgetRegistry[state.currentData.type];

		if (!component?.mount) {
			console.error(`Component "${state.currentData.type}" tidak dijumpai`);
			return;
		}

		await loadComponentStyle(component);

		const div = document.createElement("div");
		div.classList.add("output","w-100");

		state.cleanup = component.mount({div, data: state.currentData, ui, handleComponentComplete, registry: widgetRegistry, handleComponentBack});
	}
	main()


}