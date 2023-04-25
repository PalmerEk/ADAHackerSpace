<script setup>
	// todo: emit error and connected events

	const wallet = useWallet();
	const showHandleChooser = useState("showHandleChooser", () => false);

	const showError = computed({
		get() {
			return wallet.value?.error != null;
		},
		set(value) {
			wallet.value.reset();
		},
	});
</script>

<template>
	<!---Wallet - User / Connect-->
	<client-only>
		<v-snackbar v-model="showError" multi-line location="top right">
			{{ wallet.error }}
			(is wallet dapp connector enabled?) TODO: Add help link maybe based on wallet?

			<template v-slot:actions>
				<v-btn color="red" variant="text" @click="showError = false"> Close </v-btn>
			</template>
		</v-snackbar>

		<div class="d-flex justify-center align-center">
			<!-- Waiting to init wallets -->
			<v-progress-circular v-if="!wallet.isReady" indeterminate color="primary" />

			<!-- Connect to a wallet -->
			<v-menu v-if="wallet.isReady && !wallet.isConnected" open-on-hover>
				<template v-slot:activator="{ props }">
					<slot name="activator">
						<v-btn v-bind="props" append-icon="mdi-chevron-double-down" variant="tonal"> Connect Wallet </v-btn>
					</slot>
				</template>

				<CardanoWalletList />
			</v-menu>

			<v-menu v-if="wallet.isConnected">
				<template v-slot:activator="{ props }">
					<slot name="activator">
						<v-btn v-bind="props" style="text-transform: none" append-icon="mdi-chevron-double-down" variant="tonal">
							<span>
								<span v-if="wallet.balance !== null">
									{{ parseFloat(wallet.balance.toFixed(2)).toLocaleString() }} {{ wallet.currency_symbol }}
								</span>
								<v-progress-circular v-else indeterminate color="primary" />
								|
								<span v-if="wallet.ada_handle"><v-icon icon="mdi-currency-usd" style="color: #0cd15b" />{{ wallet.ada_handle }}</span>
								<span v-else>{{ wallet.changeAddress?.slice(0, 6) }}...{{ wallet.changeAddress?.slice(-6) }}</span>
							</span>
						</v-btn>
					</slot>
				</template>

				<CardanoWalletCard />
			</v-menu>
		</div>

		<CardanoChooseADAHandle v-model="showHandleChooser" />
	</client-only>
</template>
