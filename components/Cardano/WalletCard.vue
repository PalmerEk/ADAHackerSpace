<script setup>
	import { useClipboard, usePermission } from "@vueuse/core";

	const { isSupported: isClipboardSupported, copy, copied } = useClipboard();

	const wallet = useWallet();

	const copyHandle = () => {
		copy(`$${wallet.value.ada_handle}`);
	};

	const copyAddress = () => {
		copy(wallet.value.address);
	};

	const changeHandle = () => {
		// TODO: Available handles popup
		//wallet.value.setDefaultHandle()
		//wallet.value.changeHandle();
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
						<v-button v-if="wallet.ada_handles.length > 1" @click.prevent="changeHandle">
							<span v-if="wallet.ada_handle"><v-icon icon="mdi-currency-usd" style="color: #0cd15b" />Change</span>
						</v-button>
						<v-button v-if="isClipboardSupported" class="ml-2" @click="copyHandle">
							<v-icon v-if="!copied" icon="mdi-content-copy" />
							<span v-else>Copied!</span>
						</v-button>
					</div>
					<div v-else>
						{{ wallet.address?.slice(0, 6) }}...{{ wallet.address?.slice(-6) }}
						<v-button v-if="isClipboardSupported" class="ml-2" @click="copyAddress">
							<v-icon v-if="!copied" icon="mdi-content-copy" />
							<span v-else>Copied!</span>
						</v-button>
					</div>
				</div>
			</v-card-title>
			<v-card-actions>
				<v-btn color="primary" @click.prevent="wallet.disconnect">Disconnect</v-btn>
			</v-card-actions>
		</v-card>
	</client-only>
</template>
