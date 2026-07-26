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
	renderLearnSummery,
} from "../components/TeknikPelengkap10/render.js";

import { mountLatihanPelengkap10 } from "../components/LatihanPelengkap10/index.js";
import { renderBaki, renderGabung, renderNeeded, renderPecah, renderPick, renderSum, renderSummery } from "../components/LatihanPelengkap10/render.js";
import { setupPick, defaultCheck } from "../components/LatihanPelengkap10/logic.js";

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

	TeknikPelengkap10: {
		mount: mountTeknikPelengkap10
	},

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
	},

	LatihanPelengkap10: {
		mount: mountLatihanPelengkap10
	},

	Pick: {
		render: renderPick,
		setup: setupPick,
		check: defaultCheck
	},

	Needed: {
		render: renderNeeded,
		setup: setupPick,
		check: defaultCheck
	},

	Pecah: {
		render: renderPecah,
		setup: setupPick,
		check: defaultCheck
	},

	Baki: {
		render: renderBaki,
		setup: setupPick,
		check: defaultCheck
	},

	Gabung: {
		render: renderGabung,
		setup: setupPick,
		check: defaultCheck
	},

	Sum: {
		render: renderSum,
		setup: setupPick,
		check: defaultCheck
	},

	Summery: {
		render: renderSummery,
		setup: setupPick,
		check: defaultCheck
	}
};