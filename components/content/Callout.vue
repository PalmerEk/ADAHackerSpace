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
	<v-expansion-panels>
		<v-expansion-panel :color="type">
			<v-expansion-panel-title>
				{{ title }}
				<template v-slot:actions>
					<Icon v-if="icon" :name="icon" size="2em" />
				</template>
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<ContentSlot :use="$slots.default" unwrap="p" />
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
</template>
