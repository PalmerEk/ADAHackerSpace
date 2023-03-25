<script setup>
	const wallet = useWallet();
</script>

<template>
	<div v-if="wallet?.changeAddress" class="wallet changeAddress">{{ wallet.changeAddress }}</div>
</template>
