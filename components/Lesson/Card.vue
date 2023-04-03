<script setup>
	const props = defineProps({
		lesson: {
			type: Object,
			required: true,
		},
	});

	// We really just want the overview
	const overview = computed(() => {
		return props.lesson.children[0];
	});
</script>

<template>
	<v-card class="mx-auto" max-width="400">
		<v-img class="align-end text-white" height="200" :src="overview.image" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
			<v-card-title>{{ overview.title }}</v-card-title>
		</v-img>

		<v-card-text>
			<p>{{ overview.description }}</p>

			<!-- TODO: Filter by tag -->
			<v-chip-group>
				<v-chip v-for="tag in overview.tags" :key="tag">{{ tag }}</v-chip>
			</v-chip-group>

			<!-- TODO: Filter by category -->
			<v-chip-group>
				<v-chip v-for="category in overview.categories" :key="category">{{ category }}</v-chip>
			</v-chip-group>

			<div>duration: {{ overview.duration }}</div>

			<!-- TODO: Filter by level -->
			<div>minutes level: {{ overview.level }}</div>

			<!-- TODO: link to author -->
			<div>author: {{ overview.author }}</div>

			<hr />
		</v-card-text>

		<v-card-actions>
			<v-btn color="success" :to="`/overview${overview._path}`"> View Build </v-btn>
		</v-card-actions>
	</v-card>
</template>
