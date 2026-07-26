import { mountKombinasi } from "../components/Kombinasi/index.js";
import { mountKombinasiTerbalik } from "../components/KombinasiTerbalik/index.js";
import { mountPadankan } from "../components/Padankan/index.js";

export let widgetRegistry = {
	Kombinasi:{
		mount: mountKombinasi
	},
	Padankan:{
		mount: mountPadankan
	},
	KombinasiTerbalik:{
		mount: mountKombinasiTerbalik
	}
}