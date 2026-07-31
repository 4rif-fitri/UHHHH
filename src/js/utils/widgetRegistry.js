import { mountDiagramBox } from "../components/!DONE/DiagramBox/index.js";
import { mountKombinasi } from "../components/!DONE/Kombinasi/index.js";
import { mountKombinasiTerbalik } from "../components/!DONE/KombinasiTerbalik/index.js";
import { mountMemoryGame } from "../components/!DONE/MemoryGame/index.js";
import { mountPadankan } from "../components/!DONE/Padankan/index.js";
import { mountTeknikPelengkap10 } from "../components/!DONE/TeknikPelengkap10/index.js";
import { mountTrueFalse } from "../components/!DONE/TrueFalse/index.js";
import { renderLearnBaki, renderLearnGabung, renderLearnNeeded, renderLearnPecah, renderLearnPick, renderLearnSum, renderLearnSummery } from "../components/!DONE/TeknikPelengkap10/render.js";
import { mountLatihanPelengkap10 } from "../components/!DONE/LatihanPelengkap10/index.js";
import { renderBaki, renderGabung, renderNeeded, renderPecah, renderPick, renderSum, renderSummery } from "../components/!DONE/LatihanPelengkap10/render.js";
import { setupPick, defaultCheck } from "../components/!DONE/LatihanPelengkap10/logic.js";
import { updateContent } from "./helper.js";
import { mountNumpadQuiz } from "../components/!DONE/NumpadQuiz/index.js";
import { mountMaking10 } from "../components/!DONE/Making10/index.js";
import { mountChoiseQuiz } from "../components/!DONE/ChoiseQuiz/index.js";
import { mountKenaliNombor } from "../components/!DONE/KenaliNombor/index.js";
import { mountSusunNombor } from "../components/!DONE/SusunNombor/index.js";
import { mountNomborHilang } from "../components/!DONE/NomborHilang/index.js";
import { mountGabungKumpulan } from "../components/!DONE/GabungKumpulan/index.js";
import { mountTolakKumpulan } from "../components/!DONE/TolakKumpulan/index.js";
import { mountTolakPilihLego } from "../components/!DONE/TolakPilihLego/index.js";
import { mountTambahDragLego } from "../components/!DONE/TambahPilihLego/index.js";
import { mountPilihJumlahLego } from "../components/!DONE/PilihJumlahLego/index.js";
import { mountPilihAyatTambah } from "../components/!DONE/PilihAyatTambah/index.js";
import { mountPartPartWholeVisual } from "../components/!DONE/PartPartWholeVisual/index.js";
import { mountGabungPartWhole } from "../components/!DONE/GabungPartWhole/index.js";
import { mountPecahWholeKepadaPart } from "../components/!DONE/PecahWholeKepadaPart/index.js";
import { mountBarModel } from "../components/BarModel/index.js";
import { mountAnimationLearnPelengkap10 } from "../components/AnimationLearnPelengkap10/index.js";
import { mountAnimationLearnMake10 } from "../components/AnimationLearnMake10/index.js";
import { mountAnimationLearnPecahWhole } from "../components/!DONE/AnimationLearnPecahWhole/index.js";

function componentStyle(fileName) {
	return new URL(
		`../../stylee/components/${fileName}`,
		import.meta.url
	).href;
}

export const widgetRegistry = {
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

	Kombinasi: {
		mount: mountKombinasi,
		style: componentStyle("Kombinasi.css")
	},

	Padankan: {
		mount: mountPadankan,
		style: componentStyle("Padankan.css")
	},

	KombinasiTerbalik: {
		mount: mountKombinasiTerbalik,
		style: componentStyle("KombinasiTerbalik.css")
	},

	TrueFalse: {
		mount: mountTrueFalse,
		style: componentStyle("TrueFalse.css")
	},

	DiagramBox: {
		mount: mountDiagramBox,
		style: componentStyle("DiagramBox.css")
	},

	MemoryGame: {
		mount: mountMemoryGame,
		style: componentStyle("MemoryGame.css")
	},

	TeknikPelengkap10: {
		mount: mountTeknikPelengkap10,
		style: componentStyle("TeknikPelengkap10.css")

	},

	LatihanPelengkap10: {
		mount: mountLatihanPelengkap10,
		style: componentStyle("LatihanPelengkap10.css")
	},

	NumpadQuiz: {
		mount: mountNumpadQuiz,
		style: componentStyle("NumpadQuiz.css")
	},

	Making10: {
		mount: mountMaking10,
		style: componentStyle("Making10.css")
	},

	ChoiseQuiz: {
		mount: mountChoiseQuiz,
		style: componentStyle("ChoiseQuiz.css")
	},

	KenaliNombor: {
		mount: mountKenaliNombor,
		style: componentStyle("KenaliNombor.css")
	},

	SusunNombor: {
		mount: mountSusunNombor,
		style: componentStyle("SusunNombor.css")
	},

	NomborHilang: {
		mount: mountNomborHilang,
		style: componentStyle("NomborHilang.css")
	},

	GabungKumpulan: {
		mount: mountGabungKumpulan,
		style: componentStyle("GabungKumpulan.css")
	},

	TolakKumpulan: {
		mount: mountTolakKumpulan,
		style: componentStyle("TolakKumpulan.css")
	},

	TolakPilihLego: {
		mount: mountTolakPilihLego,
		style: componentStyle("TolakPilihLego.css")
	},

	TambahDragLego: {
		mount: mountTambahDragLego,
		style: componentStyle("TambahDragLego.css")
	},

	PilihJumlahLego: {
		mount: mountPilihJumlahLego,
		style: componentStyle("PilihJumlahLego.css")
	},
	PilihAyatTambah: {
		mount: mountPilihAyatTambah,
		style: componentStyle("PilihAyatTambah.css")
	},
	PartPartWholeVisual: {
		mount: mountPartPartWholeVisual,
		style: componentStyle("PartPartWholeVisual.css")
	},
	GabungPartWhole: {
		mount: mountGabungPartWhole,
		style: componentStyle("GabungPartWhole.css")
	},
	PecahWholeKepadaPart: {
		mount: mountPecahWholeKepadaPart,
		style: componentStyle("PecahWholeKepadaPart.css")
	},
	BarModel: {
		mount: mountBarModel,
		style: componentStyle("BarModel.css")
	},

	AnimationLearnMake10: {
		mount: mountAnimationLearnMake10,
		style: componentStyle(
			"AnimationLearnMake10.css"
		)
	},

	AnimationLearnPelengkap10: {
		mount: mountAnimationLearnPelengkap10,
		style: componentStyle(
			"AnimationLearnPelengkap10.css"
		)
	},
	AnimationLearnPecahWhole: {
		mount: mountAnimationLearnPecahWhole,
		style: componentStyle(
			"AnimationLearnPecahWhole.css"
		)
	},
};