<script setup>
	const route = useRoute();
	const lessonURL = route.params.slug.join("/");
	const { getLessonByURL } = useLessons();
	const lesson = await getLessonByURL(lessonURL);

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

	const sectionsSteps = (section) => {
		return Object.keys(section);
	};
</script>

<template>
	<main>
		<div>
			<div class="flex flex-row">
				<LessonCard :lesson="lesson" />
			</div>
			<!-- <pre>{{ lesson }}</pre> -->
			<ul>
				<li v-for="section in sections" :key="section._id">
					<h2>{{ section.title }}</h2>

					<p class="prose" v-if="section.excerpt">
						<ContentRenderer :value="section">
							<ContentRendererMarkdown :value="section" :excerpt="true" />
						</ContentRenderer>
					</p>
					<ul>
						<li v-for="step in section.steps" :key="step._id">
							{{ step.title }}
							<!-- <p class="prose" v-if="step.excerpt">
								<ContentRenderer :value="step.excerpt">
									<ContentRendererMarkdown :value="step.excerpt" />
								</ContentRenderer>
							</p> -->
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</main>
</template>
