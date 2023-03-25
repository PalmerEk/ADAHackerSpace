<script setup>
	defineProps({
		type: {
			type: String,
			default: "info",
		},
	});

	const DoSomething = () => {
		console.log("DoSomething");
	};
</script>

<template>
	<v-btn :color="type" @click="DoSomething">
		<ContentSlot :use="$slots.default" unwrap="p" />
	</v-btn>
</template>
