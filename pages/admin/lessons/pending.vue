<script setup>
	definePageMeta({
		middleware: "auth-admin",
	});

	// TODO: Get pending lessons
	// List of pending lessons (Where do we get these... gun.js?)
	// allow preview of pending lesson
	// allow approve/reject pending lesson
	const { lessons } = useLessons();

	const approveLesson = (lesson) => {
		console.log("TODO: Mint and remove from pending");
	};

	const rejectLesson = (lesson) => {
		console.log("TODO: Remove from pending");
	};

	const previewLesson = (lesson) => {
		console.log("TODO: Preview Lesson");
	};
</script>

<template>
	<section class="mb-32 text-gray-800 text-center lg:text-left">
		<h2 class="text-3xl font-bold mb-12 text-center">Pending Lessons Placeholder</h2>

		<div class="grid lg:grid-cols-3 gap-x-6 lg:gap-x-12">
			<div v-for="lesson in lessons" :key="lesson.fingerprint">
				<LessonCard :lesson="lesson" />
				<button
					type="button"
					class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
					@click="approveLesson(lesson)"
				>
					Approve
				</button>
				<button
					type="button"
					class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
					@click="rejectLesson(lesson)"
				>
					Reject
				</button>

				<button
					type="button"
					class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
					@click="previewLesson(lesson)"
				>
					Preview
				</button>
			</div>
		</div>
	</section>
</template>
