const wallet = useWallet();

// Kinda sucks in that it won't allow direct access since the wallet takes time to load and we don't want to block the UI.
export default defineNuxtRouteMiddleware((to) => {
	const { $config } = useNuxtApp();

	// TODO: Want to chedk for a specifc token instead of my ada handle.
	// TODO: Add something to wallet composable to lookup a token based on policy id.
	if (wallet.value.isReady && wallet.value.isConnected && wallet.value.ada_handle) {
		// console.log("Wallet is ready, connected, and has an ADA handle.", wallet.value.ada_handle);
		return true;
	} else {
		console.log("Access to admin area would be denied.");
		// return navigateTo("/");
		return true;
	}
});
