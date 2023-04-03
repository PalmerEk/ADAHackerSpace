import { resolve } from "path";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const moduleExclude = (match) => {
	const m = (id) => id.indexOf(match) > -1;
	return {
		name: `exclude-${match}`,
		resolveId(id) {
			if (m(id)) return id;
		},
		load(id) {
			if (m(id)) return `export default {}`;
		},
	};
};

export default defineConfig({
	cacheDir: resolve(__dirname, ".vite"),
	plugins: [moduleExclude("text-encoding"), wasm(), topLevelAwait()],
	optimizeDeps: {
		include: [],
	},
});
