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
	<button
		@click="DoSomething"
		type="button"
		:class="`inline-block rounded bg-${type} px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-${type}-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-${type}-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-${type}-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]`"
	>
		<ContentSlot :use="$slots.default" unwrap="p" />
	</button>
</template>
