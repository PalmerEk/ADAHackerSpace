<script setup>
	const route = useRoute();
	const lessonURL = route.params.slug.join("/");
	const section = route.params.section;
	const step = route.params.step;

	const { getLessonByURL } = useLessons();
	const lesson = await getLessonByURL(lessonURL);

	const content = computed(() => {
		let content = null;
		Object.keys(lesson)
			.filter((k) => {
				return k !== "overview";
			})
			.map((k, i) => {
				const section = lesson[k];
				if (section.overview.title === route.params.section) {
					Object.keys(section).map((k) => {
						const step = section[k];
						if (step.title === route.params.step) {
							content = step;
						}
					});
				}
			});
		return content;
	});
</script>

<template>
	<NuxtLayout name="lesson">
		<template #toc> <LessonTOC :lesson="lesson" :currentSection="section" :currentStep="step" /> </template>

		<article v-show="content" class="prose">
			<ContentRenderer :value="content" />
		</article>
	</NuxtLayout>
</template>
