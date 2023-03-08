// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@vueuse/nuxt"],
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
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	runtimeConfig: {
		public: {
			ADA_USD_RATE: 0.34,
			POLICY_ADA_HANDLE: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a", // testnet 8d18d786e92776c824607fd8e193ec535c79dc61ea2405ddf3b09fe3
			GATEWAY_URL: "http://localhost:5000",
			GUN_RELAYS: ["http://localhost:4200/gun"],
		},
	},
});
