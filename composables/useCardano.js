export const useCardano = createGlobalState(() => {
	const wasm = ref(null);

	import("@emurgo/cardano-serialization-lib-browser").then((csl) => {
		console.log("csl", csl);
		wasm.value = csl;
	});

	return wasm;
});
