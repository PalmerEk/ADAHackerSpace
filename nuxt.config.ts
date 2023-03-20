// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@vueuse/nuxt", "@formkit/nuxt"],
	css: ["@/assets/css/tailwind.css"],
	content: {
		// https://content.nuxtjs.org/api/configuration
		highlight: {
			theme: {
				default: "material-palenight",
				dark: "github-dark",
			},
		},
		markdown: {
			toc: {
				depth: 5,
				searchDepth: 5,
			},
		},
	},
	formkit: {
		configFile: "./formkit.config.ts",
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
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
