<script setup>
	const route = useRoute();
	const lessonURL = route.params.slug.join("/");
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
</script>

<template>
	<NuxtLayout name="lesson">
		<template #toc> <LessonTOC :lesson="lesson" /> </template>

		<h1>{{ overview.title }}</h1>
		<v-img :src="overview.image" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px" cover> </v-img>

		<ul>
			<li v-for="section in sections" :key="section._id">
				<h2>{{ section.title }}</h2>

				<p class="prose" v-if="section.excerpt">
					<ContentRenderer :value="section" :excerpt="true"> </ContentRenderer>
				</p>
			</li>
		</ul>

		<v-btn :to="`/lesson/${lessonURL}/${sections[0].title}/${sections[0].steps[0].title}`">Lets Go!</v-btn>
	</NuxtLayout>
</template>
