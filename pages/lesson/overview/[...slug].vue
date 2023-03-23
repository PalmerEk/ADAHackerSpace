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
</script>

<template>
	<NuxtLayout name="lesson">
		<template #toc> <LessonTOC :sections="sections" :image="overview.image" /> </template>

		<v-card>
			<v-card-title class="text-white" v-text="overview.title"></v-card-title>
			<v-img :src="overview.image" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px" cover> </v-img>

			<v-card-actions>
				<ul>
					<li v-for="section in sections" :key="section._id">
						<h2>{{ section.title }}</h2>

						<p class="prose" v-if="section.excerpt">
							<ContentRenderer :value="section">
								<ContentRendererMarkdown :value="section" :excerpt="true" />
							</ContentRenderer>
						</p>
					</li>
				</ul>
			</v-card-actions>

			<v-btn :to="`/lesson/${lessonURL}/${sections[1].title}/${sections[1].steps[1].title}`">Lets Go!</v-btn>
		</v-card>
	</NuxtLayout>
</template>
