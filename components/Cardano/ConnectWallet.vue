<script setup>
	// todo: emit error and connected events
	// todo: add slot to override rendering of the wallet button
	// todo: add slot to override rendering of the wallet menu

	const wallet = useWallet();
	const showHandleChooser = useState("showHandleChooser", () => false);
</script>

<template>
	<!---Wallet - User / Connect-->
	<client-only>
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
