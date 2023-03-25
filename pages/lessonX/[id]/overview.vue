<script setup>
	definePageMeta({
		layout: "lesson",
	});

	const route = useRoute();
	const { isLoading, getLesson } = useLessons();
	const lesson = await getLesson(route.params.id);
</script>

<template>
	<!-- Should we require an overview page instead of first step?  I think so-->
	<main>
		<div>
			<div class="flex flex-row">
				<div class="basis-4/12">
					<TOC :lesson="lesson" :section="0" :step="0" />
				</div>

				<article class="prose basis-8/12 p-8 max-w-[100%]">
					<h1>{{ lesson.docket.sections[0].title }}</h1>
					<ContentRenderer :value="lesson.docket.sections[0].steps[0]" :excerpt="true" />
				</article>
			</div>
		</div>
	</main>

	<NuxtLink :to="`/lesson/${route.params.id}/step/0`">
		<button
			data-mdb-ripple="true"
			data-mdb-ripple-color="light"
			class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
		>
			Sound good, let's get started!
		</button>
	</NuxtLink>
</template>
