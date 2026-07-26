export function shuffle(data) {
	let result = [...data];

	for (let i = result.length - 1; i > 0; i--) {
		let randomIndex = Math.floor(
			Math.random() * (i + 1)
		);

		[result[i], result[randomIndex]] = [
			result[randomIndex],
			result[i]
		];
	}

	return result;
}