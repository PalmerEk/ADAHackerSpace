<script setup>
	defineProps({
		icon: {
			type: String,
			default: () => null,
		},
		href: {
			type: String,
			required: true,
		},
	});
</script>

<template>
	<v-btn :href="href" target="_blank">
		<ContentSlot :use="$slots.default" unwrap="p" />
	</v-btn>
</template>
