<script setup>
	const props = defineProps({
		hash: {
			type: String,
		},
	});

	const wallet = useWallet();
	const txHash = ref(props.hash);
	const tx = ref(null);
	const network = await wallet.value.fetchNetwork();
	const loading = ref(false);

	const lookupTx = async () => {
		if (!txHash.value) return;
		loading.value = true;
		tx.value = await $fetch(`/api/${network}/txs/${txHash.value}`);
		loading.value = false;
	};

	onMounted(async () => {
		lookupTx();
	});
</script>

<template>
	<div>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-title>
					<div v-if="txHash">
						{{ txHash }}
					</div>
					<div v-else>
						<v-text-field v-model="txHash" clearable label="Tx Hash" variant="underlined" @blur="lookupTx"></v-text-field>
					</div>
					<template v-slot:actions>
						<Icon name="cryptocurrency:ada" size="2em" />
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<div v-if="loading">Loading...</div>
					TODO: Style this
					{{ tx }}
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>
