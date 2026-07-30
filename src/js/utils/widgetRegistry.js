import { mountDiagramBox } from "../components/DiagramBox/index.js";
import { mountKombinasi } from "../components/!DONE/Kombinasi/index.js";
import { mountKombinasiTerbalik } from "../components/!DONE/KombinasiTerbalik/index.js";
import { mountMemoryGame } from "../components/!DONE/MemoryGame/index.js";
import { mountPadankan } from "../components/!DONE/Padankan/index.js";
import { mountTeknikPelengkap10 } from "../components/!DONE/TeknikPelengkap10/index.js";
import { mountTrueFalse } from "../components/!DONE/TrueFalse/index.js";
import { 	renderLearnBaki,renderLearnGabung,renderLearnNeeded,renderLearnPecah,renderLearnPick,renderLearnSum,renderLearnSummery} from "../components/!DONE/TeknikPelengkap10/render.js";
import { mountLatihanPelengkap10 } from "../components/!DONE/LatihanPelengkap10/index.js";
import { renderBaki, renderGabung, renderNeeded, renderPecah, renderPick, renderSum, renderSummery } from "../components/!DONE/LatihanPelengkap10/render.js";
import { setupPick, defaultCheck } from "../components/!DONE/LatihanPelengkap10/logic.js";
import { updateContent } from "./helper.js";
import { mountNumpadQuiz } from "../components/NumpadQuiz/index.js";
import { mountMaking10 } from "../components/!DONE/Making10/index.js";
import { mountChoiseQuiz } from "../components/ChoiseQuiz/index.js";
import { mountKenaliNombor } from "../components/!DONE/KenaliNombor/index.js";
import { mountSusunNombor } from "../components/!DONE/SusunNombor/index.js";
import { mountNomborHilang } from "../components/!DONE/NomborHilang/index.js";
import { mountGabungKumpulan } from "../components/GabungKumpulan/index.js";
import { mountTolakKumpulan } from "../components/TolakKumpulan/index.js";
import { mountTolakPilihLego } from "../components/TolakPilihLego/index.js";
import { mountTambahDragLego } from "../components/TambahPilihLego/index.js";
import { mountPilihJumlahLego } from "../components/PilihJumlahLego/index.js";
import { mountPilihAyatTambah } from "../components/PilihAyatTambah/index.js";
import { mountPartPartWholeVisual } from "../components/PartPartWholeVisual/index.js";
import { mountGabungPartWhole } from "../components/GabungPartWhole/index.js";
import { mountPecahWholeKepadaPart } from "../components/PecahWholeKepadaPart/index.js";

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
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			updateContent(document.querySelector(".dialog p"), `${currentData.content.nums[0]} ialah nombor paling besar`)
		},
		check: defaultCheck
	},

	Needed: {
		render: renderNeeded,
		setup: setupPick,
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			updateContent(document.querySelector(".dialog p"), `${currentData.content.nums[0]} perlukan ${currentData.content.pelengkap} untuk jadi 10`)

		},
		check: defaultCheck
	},

	Pecah: {
		render: renderPecah,
		setup: setupPick,
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			updateContent(document.querySelector(".dialog p"), `${currentData.content.pelengkap} itu kita akan ambil dari ${currentData.content.nums[1]}`)
		},
		check: defaultCheck
	},

	Baki: {
		render: renderBaki,
		setup: setupPick,
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			updateContent(document.querySelector(".dialog p"), `${currentData.content.nums[1]} dipecahkan kepada ${currentData.content.pelengkap} dan ${currentData.content.baki}`)
		},
		check: defaultCheck
	},

	Gabung: {
		render: renderGabung,
		setup: setupPick,
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			updateContent(document.querySelector(".dialog p"), `${currentData.content.nums[0]} tambah ${currentData.content.pelengkap} akan dapat ${currentData.content.nums[0] + currentData.content.pelengkap}`)
		},
		check: defaultCheck
	},

	Sum: {
		render: renderSum,
		setup: setupPick,
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			updateContent(document.querySelector(".dialog p"), `10 tambah ${currentData.content.baki} akan dapat ${currentData.answer}`)

		},
		check: defaultCheck
	},

	Summery: {
		render: renderSummery,
		setup: setupPick,
		afterCorrect: function (selectedValue, currentData, selectedElement) {
			console.log(currentData);

			updateContent(document.querySelector(".dialog p"), `${currentData.content.nums[0]} tambah ${currentData.content.nums[1]} akan dapat ${currentData.answer}`)

		},
		check: defaultCheck
	},
	NumpadQuiz: {
		mount: mountNumpadQuiz
	},
	Making10:{
		mount: mountMaking10
	},
	ChoiseQuiz: {
		mount: mountChoiseQuiz
	},
	KenaliNombor: {
		mount: mountKenaliNombor
	},
	SusunNombor: {
		mount: mountSusunNombor
	},
	NomborHilang: {
		mount: mountNomborHilang
	},
	GabungKumpulan: {
		mount: mountGabungKumpulan
	},
	TolakKumpulan: {
		mount: mountTolakKumpulan
	},
	TolakPilihLego: {
		mount: mountTolakPilihLego
	},
	TambahDragLego: {
		mount: mountTambahDragLego
	},
	PilihJumlahLego: {
		mount: mountPilihJumlahLego
	},
	PilihAyatTambah: {
		mount: mountPilihAyatTambah
	},
	PartPartWholeVisual: {
		mount: mountPartPartWholeVisual
	},
	GabungPartWhole: {
		mount: mountGabungPartWhole
	},
	PecahWholeKepadaPart: {
		mount: mountPecahWholeKepadaPart
	}
};