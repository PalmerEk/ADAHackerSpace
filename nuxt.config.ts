// https://v3.nuxtjs.org/api/configuration/nuxt.config
// import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
	ssr: false,
	modules: [
		"@nuxt/content",
		"@vueuse/nuxt",
		"@formkit/nuxt",
		"nuxt-icon",
		// async (options, nuxt) => {
		// 	nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
		// },
	],
	// extends: "@nuxt-themes/docus",
	// css: ["@/assets/styles/main.scss"],
	css: ["vuetify/lib/styles/main.sass", "@/assets/styles/main.scss"],

	content: {
		sources: {
			github: {
				prefix: "/lessons", // Prefix for routes used to query contents
				driver: "github", // Driver used to fetch contents (view unstorage documentation)
				//repo: "buildspace/buildspace-projects",
				// repo: "PalmerEk/jubilant-sniffle",
				// repo: "PalmerEk/expert-sniffle",
				repo: "PalmerEk/ADAHackerSpace-Lessons",
				branch: "main",
				ttl: 60,
			},
		},
		navigation: {
			fields: ["author", "publishedAt", "title", "description", "tags", "image", "level", "categories", "duration", "draft"],
		},
		ignores: ["LICENSE"],
		defaultLocale: "en",
		documentDriven: true,

		// https://content.nuxtjs.org/api/configuration
		highlight: {
			theme: {
				//default: "github-light",
				//dark: "github-dark",
				default: "github-dark",
				dark: "github-dark",
				light: "github-light",
			},
		},
	},
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
		},
	},
});
