// plugins/vuetify.js
import { createVuetify } from "vuetify";

import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { md3 } from "vuetify/blueprints";

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		icons: {
			defaultSet: "mdi",
			aliases,
			sets: {
				fa,
				mdi,
			},
		},
		theme: {
			defaultTheme: "dark",
		},
		blueprint: md3,
	});

	nuxtApp.vueApp.use(vuetify);
});
