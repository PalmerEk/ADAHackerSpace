<script setup>
	const props = defineProps({
		tabs: {
			type: Array,
			default: [],
		},
	});

	const currentTab = ref(props.tabs[0]);
</script>

<template>
	<v-tabs v-model="currentTab" bg-color="transparent" color="basil" grow>
		<v-tab v-for="tab in tabs" :key="tab" :value="tab">
			{{ tab }}
		</v-tab>
	</v-tabs>

	<v-window v-model="currentTab">
		<v-window-item v-for="tab in tabs" :key="tab" :value="tab">
			<v-card flat>
				<v-card-text>
					<ContentSlot :use="$slots[tab]" unwrap="p" />
				</v-card-text>
			</v-card>
		</v-window-item>
	</v-window>
</template>
