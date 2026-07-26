import { mountDiagramBox } from "../components/DiagramBox/index.js";
import { mountKombinasi } from "../components/Kombinasi/index.js";
import { mountKombinasiTerbalik } from "../components/KombinasiTerbalik/index.js";
import { mountMemoryGame } from "../components/MemoryGame/index.js";
import { mountPadankan } from "../components/Padankan/index.js";
import { mountTrueFalse } from "../components/TrueFalse/index.js";

export let widgetRegistry = {
	Kombinasi:{
		mount: mountKombinasi
	},
	Padankan:{
		mount: mountPadankan
	},
	KombinasiTerbalik:{
		mount: mountKombinasiTerbalik
	},
	TrueFalse:{
		mount: mountTrueFalse
	},
	DiagramBox:{
		mount: mountDiagramBox
	},
	MemoryGame:{
		mount: mountMemoryGame
	}
}