<script setup>
	defineProps({
		type: {
			type: String,
			default: "info",
		},
		title: {
			type: String,
			default: () => null,
		},
		icon: {
			type: String,
			default: () => null,
		},
	});
</script>

<template>
	<v-chip :title="title" :icon="icon" :color="type">
		<ContentSlot :use="$slots.default" unwrap="p" />
	</v-chip>
</template>
