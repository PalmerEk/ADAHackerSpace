<script setup>
	defineProps({
		type: {
			type: String,
			default: "info",
		},
	});
</script>

<template>
	<span
		:class="`inline-block whitespace-nowrap rounded-full bg-${type}-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-${type}-700`"
	>
		<ContentSlot :use="$slots.default" unwrap="p" />
	</span>
</template>
