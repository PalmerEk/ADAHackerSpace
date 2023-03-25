<script setup>
	defineProps({
		format: {
			type: Boolean,
			default: () => false,
		},
	});
	const wallet = useWallet();
</script>

<template>
	<div v-if="wallet?.balance" class="wallet balance">
		{{ format ? `${parseFloat(wallet.balance.toFixed(2)).toLocaleString()} ${wallet.currency_symbol}` : wallet.balance }}
	</div>
</template>
