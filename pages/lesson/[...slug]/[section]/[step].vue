<script setup>
	const route = useRoute();
	const lessonURL = route.params.slug.join("/");
	const section = route.params.section;
	const step = route.params.step;

	const { getLessonByURL } = useLessons();
	const lesson = await getLessonByURL(lessonURL);

	const overview = computed(() => lesson.overview);

	const sections = computed(() => {
		return Object.keys(lesson)
			.filter((k) => {
				return k !== "overview";
			})
			.map((k, i) => {
				const section = lesson[k];

				let mappedSection = {
					title: `Section ${i + 1}`,
					description: "",
					excerpt: null,
					_id: `section_${i + 1}`,
					steps: [],
				};

				if (section["overview"]) {
					mappedSection = section.overview;
					// mappedSection.title = section.overview.title;
					// mappedSection.description = section.overview.description;
					// mappedSection.excerpt = section.overview.excerpt;
					// mappedSection._id = section.overview._id;
				}

				mappedSection.steps = Object.keys(section)
					.filter((k) => {
						return k !== "overview";
					})
					.map((s, i) => {
						const step = section[s];
						return {
							title: step.title,
							description: step.description,
							excerpt: step.excerpt,
							_id: step._id,
						};
					});

				return mappedSection;
			});
	});

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
		<template #toc> <LessonTOC :sections="sections" :image="overview.image" /> </template>

		<article class="prose" v-show="content">
			<ContentRenderer :value="content">
				<ContentRendererMarkdown :value="content" />
			</ContentRenderer>
		</article>
	</NuxtLayout>
</template>
