export function setupPick(callback, canPick, root) {
	let selectedElement = null;

	// Untuk pilihan biasa, guna btnAns.
	// Untuk langkah Pick, guna eqn.
	const buttons = root.querySelectorAll(
		root.querySelector(".btnAns")
			? ".btnAns"
			: ".eqn"
	);

	function handleClick(event) {
		if (!canPick()) return;

		const button = event.currentTarget;

		if (selectedElement === button) {
			button.classList.remove("higlight");

			selectedElement = null;
			callback(null, null);
			return;
		}

		buttons.forEach(item => {
			item.classList.remove("higlight");
		});

		button.classList.add("higlight");
		selectedElement = button;

		callback(
			Number(button.textContent.trim()),
			button
		);
	}

	buttons.forEach(button => {
		button.addEventListener("click", handleClick);
	});

	return function cleanup() {
		buttons.forEach(button => {
			button.removeEventListener(
				"click",
				handleClick
			);
		});
	};
}

export function defaultCheck(picked, data) {
	return Number(picked) === Number(data.answer);
}