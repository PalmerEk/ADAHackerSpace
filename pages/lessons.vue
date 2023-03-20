<script setup>
	const { lessons, isLoading } = useLessons();
</script>

<template>
	<section class="mb-32 text-gray-800 text-center lg:text-left">
		<h2 class="text-3xl font-bold mb-12 text-center">Current Lessons</h2>

		<div v-if="!isLoading" class="grid lg:grid-cols-3 gap-x-6 lg:gap-x-12">
			<div v-for="lesson in lessons" :key="lesson.fingerprint">
				<LessonCard :lesson="lesson" />
			</div>
		</div>
	</section>
</template>

<style scoped></style>
