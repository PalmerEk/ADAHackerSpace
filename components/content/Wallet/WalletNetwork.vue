<script setup>
	const wallet = useWallet();
</script>

<template>
	<div v-if="wallet?.network" class="wallet network">{{ wallet.network }}</div>
</template>
