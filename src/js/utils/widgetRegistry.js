import { mountDiagramBox } from "../components/DiagramBox/index.js";
import { mountKombinasi } from "../components/Kombinasi/index.js";
import { mountKombinasiTerbalik } from "../components/KombinasiTerbalik/index.js";
import { mountMemoryGame } from "../components/MemoryGame/index.js";
import { mountPadankan } from "../components/Padankan/index.js";
import { mountTeknikPelengkap10 } from "../components/TeknikPelengkap10/index.js";
import { mountTrueFalse } from "../components/TrueFalse/index.js";

import {
	renderLearnBaki,
	renderLearnGabung,
	renderLearnNeeded,
	renderLearnPecah,
	renderLearnPick,
	renderLearnSum,
	renderLearnSummery
} from "../components/TeknikPelengkap10/render.js";

export const widgetRegistry = {
	Kombinasi: {
		mount: mountKombinasi
	},

	Padankan: {
		mount: mountPadankan
	},

	KombinasiTerbalik: {
		mount: mountKombinasiTerbalik
	},

	TrueFalse: {
		mount: mountTrueFalse
	},

	DiagramBox: {
		mount: mountDiagramBox
	},

	MemoryGame: {
		mount: mountMemoryGame
	},

	// Komponen induk
	TeknikPelengkap10: {
		mount: mountTeknikPelengkap10
	},

	// Renderer langkah dalaman
	LearnPick: {
		render: renderLearnPick
	},

	LearnNeeded: {
		render: renderLearnNeeded
	},

	LearnPecah: {
		render: renderLearnPecah
	},

	LearnBaki: {
		render: renderLearnBaki
	},

	LearnGabung: {
		render: renderLearnGabung
	},

	LearnSum: {
		render: renderLearnSum
	},

	LearnSummery: {
		render: renderLearnSummery
	}
};