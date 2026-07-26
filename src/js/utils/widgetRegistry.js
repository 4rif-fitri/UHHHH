import { mountKombinasi } from "../components/Kombinasi/index.js";
import { mountPadankan } from "../components/Padankan/index.js";

export let widgetRegistry = {
	Kombinasi:{
		mount: mountKombinasi
	},
	Padankan:{
		mount: mountPadankan
	}
}