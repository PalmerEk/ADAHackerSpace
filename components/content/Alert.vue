<script setup>
	defineProps({
		type: {
			type: String,
			default: "info",
		},
	});
</script>

<template>
	<div :class="`mb-4 rounded-lg text-base bg-${type}-100 py-5 px-6 text-${type}-600`" role="alert">
		<ContentSlot :use="$slots.default" unwrap="p" />
	</div>
</template>
