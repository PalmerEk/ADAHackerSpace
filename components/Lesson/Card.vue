<script setup lang="ts">
	import { Lesson } from '~/interfaces/Lesson.interface'

	const props = defineProps<{
		lesson: Lesson
	}>()

	// We really just want the overview
	const overview = computed(() => {
		return props.lesson.children[0]
	})
</script>

<template>
	<v-card class="mx-auto" max-width="400">
		<v-img class="align-end text-white" height="200" :src="overview.image" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
			<v-card-title>{{ overview.title }}</v-card-title>
		</v-img>

		<!-- TODO: link to author -->
		<v-card-subtitle class="mt-3">Author: {{ overview.author }}</v-card-subtitle>

		<v-card-text>
			<p class="mb-3">{{ overview.description }}</p>

			<!-- TODO: Filter by tag -->
			<v-chip-group>
				<v-chip v-for="tag in overview.tags" :key="tag">{{ tag }}</v-chip>
			</v-chip-group>

			<!-- TODO: Filter by category -->
			<v-chip-group>
				<v-chip v-for="category in overview.categories" :key="category">{{ category }}</v-chip>
			</v-chip-group>

			<v-row class="mt-3">
				<v-col>
					<div class="text-center bg-primary px-2 py-1 rounded">
						<div class="text-overline">duration</div>
						<div class="text-h6">{{ overview.duration }}</div>
					</div>
				</v-col>

				<v-col>
					<!-- TODO: Filter by level -->
					<div class="text-center bg-primary py-1 rounded">
						<div class="text-overline">minutes level</div>
						<div class="text-h6">{{ overview.level }}</div>
					</div>
				</v-col>
			</v-row>
		</v-card-text>

		<v-card-actions>
			<v-btn class="custom-button" color="primary" :to="`/overview${overview._path}`"> View Build </v-btn>
		</v-card-actions>
	</v-card>
</template>

<style scoped lang="scss">
	.custom-button {
		position: absolute;
		bottom: 10px;
		left: 10px;
	}
</style>
