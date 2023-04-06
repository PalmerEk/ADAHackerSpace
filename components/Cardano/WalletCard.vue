<script setup>
	import { useClipboard } from "@vueuse/core";

	const { isSupported: isClipboardSupported, copy, copied } = useClipboard();
	const showHandleChooser = useState("showHandleChooser", () => false);

	const wallet = useWallet();

	const copyHandle = () => {
		copy(`$${wallet.value.ada_handle}`);
	};

	const copyAddress = () => {
		copy(wallet.value.address);
	};
</script>

<!-- TODO: Add link to explorer https://cardanoscan.io/address/${addr} (preview.cardanoscan.io / preprod.cardanoscan.io) -->
<!-- TODO: Add copy address as well as handle?  Or maybe copy is always address (resolved handle) -->
<template>
	<!---Wallet - User / Connect-->
	<client-only>
		<v-card>
			<v-card-title>
				<v-avatar size="40">
					<v-img :alt="wallet.wallet?.name" :src="wallet.wallet?.icon"></v-img>
				</v-avatar>
				<div class="ml-4">
					<div class="font-weight-bold">{{ wallet.wallet?.name }}</div>
					<div class="font-weight-light">{{ wallet.network }}</div>
					<div v-if="wallet.ada_handle">
						${{ wallet.ada_handle }}
						<v-btn v-if="wallet.ada_handles.length > 1" variant="text" @click="showHandleChooser = true">
							<span v-if="wallet.ada_handle"><v-icon icon="mdi-currency-usd" style="color: #0cd15b" />Change</span>
						</v-btn>

						<v-btn v-if="isClipboardSupported" variant="text" @click="copyHandle">
							<v-icon v-if="!copied" icon="mdi-content-copy" />
							<span v-else>Copied!</span>
						</v-btn>
					</div>
					<div v-else>
						{{ wallet.changeAddress?.slice(0, 6) }}...{{ wallet.changeAddress?.slice(-6) }}
						<v-btn v-if="wallet.ada_handles.length > 1" variant="text" @click="showHandleChooser = true">
							<v-icon icon="mdi-currency-usd" style="color: #0cd15b" />ADAHandle
						</v-btn>

						<v-btn v-if="isClipboardSupported" variant="text" @click="copyAddress">
							<v-icon v-if="!copied" icon="mdi-content-copy" />
							<span v-else>Copied!</span>
						</v-btn>
					</div>
				</div>
			</v-card-title>
			<v-card-actions>
				<v-btn color="primary" @click.prevent="wallet.disconnect">Disconnect</v-btn>
			</v-card-actions>
		</v-card>
	</client-only>
</template>
