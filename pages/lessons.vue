<script setup>
	const { lessons } = useLessons();
</script>

<template>
	<h2>Current Lessons</h2>

	<v-container fluid>
		<v-row dense>
			<v-col v-for="lesson in lessons" :key="lesson.id" :cols="4">
				<LessonCard :lesson="lesson" />
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped></style>
