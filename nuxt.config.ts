// https://v3.nuxtjs.org/api/configuration/nuxt.config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
	ssr: false,
	modules: [
		"@nuxt/content",
		"@vueuse/nuxt",
		"@formkit/nuxt",
		"nuxt-icon",
		async (options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
		},
	],
	// extends: "@nuxt-themes/docus",
	css: ["@/assets/styles/main.scss"],
	content: {
		// https://content.nuxtjs.org/api/configuration
		highlight: {
			theme: {
				//default: "github-light",
				//dark: "github-dark",
				default: "dark-plus",
				dark: "dark-plus",
				light: "light-plus",
				sepia: "monokai",
			},
		},
	},

	// | 'dark-plus'
	// | 'dracula-soft'
	// | 'dracula'
	// | 'github-dark-dimmed'
	// | 'github-dark'
	// | 'github-light'
	// | 'hc_light'
	// | 'light-plus'
	// | 'material-theme-darker'
	// | 'material-theme-lighter'
	// | 'material-theme-ocean'
	// | 'material-theme-palenight'
	// | 'material-theme'
	// | 'min-dark'
	// | 'min-light'
	// | 'monokai'
	// | 'nord'
	// | 'one-dark-pro'
	// | 'poimandres'
	// | 'rose-pine-dawn'
	// | 'rose-pine-moon'
	// | 'rose-pine'
	// | 'slack-dark'
	// | 'slack-ochin'
	// | 'solarized-dark'
	// | 'solarized-light'
	// | 'vitesse-dark'
	// | 'vitesse-light'

	formkit: {
		configFile: "./formkit.config.ts",
	},
	postcss: {
		plugins: {
			autoprefixer: {},
		},
	},
	build: {
		transpile: ["vuetify"],
	},
	runtimeConfig: {
		BLOCKFROST_MAINNET_PROJECT_ID: process.env.BLOCKFROST_MAINNET_PROJECT_ID,
		BLOCKFROST_PREPROD_PROJECT_ID: process.env.BLOCKFROST_PREPROD_PROJECT_ID,
		BLOCKFROST_PREVIEW_PROJECT_ID: process.env.BLOCKFROST_PREVIEW_PROJECT_ID,

		LESSONS_MAINNET_POLICY_ID: process.env.LESSONS_MAINNET_POLICY_ID,
		LESSONS_PREPROD_POLICY_ID: process.env.LESSONS_PREPROD_POLICY_ID,
		LESSONS_PREVIEW_POLICY_ID: process.env.LESSONS_PREVIEW_POLICY_ID,

		// TODO: add preview/preprod/mainnet ada handles policy ids
		public: {
			POLICY_ADA_HANDLE: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a", // testnet 8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3
			GUN_RELAYS: ["http://localhost:4200/gun"],
		},
	},
});
