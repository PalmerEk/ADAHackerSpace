<script setup>
	const props = defineProps({
		lesson: {
			type: Object,
			required: true,
		},
		currentSection: {
			type: String,
			required: false,
		},
		currentStep: {
			type: String,
			required: false,
		},
	});

	const sections = computed(() => {
		return Object.keys(props.lesson)
			.filter((k) => {
				return k !== "overview";
			})
			.map((k, i) => {
				const section = props.lesson[k];

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

	const isActiveSection = (section) => {
		return props.currentSection === section.title;
	};

	const isActiveStep = (step) => {
		return props.currentStep === step.title;
	};
</script>

<template>
	<v-img :src="lesson.overview.image" class="pr-4 pb-4 rounded-t-lg" />

	<v-timeline side="end" align="start">
		<v-timeline-item v-for="section in sections" :key="section._id" icon-color="green" icon="mdi-check" :size="10" density="compact">
			<div class="d-flex">
				<strong :class="[{ active: isActiveSection(section) }]">{{ section.title }}</strong>
				<div>
					<v-timeline side="end" align="start" :line-thickness="0">
						<v-timeline-item v-for="step in section.steps" :key="step._id" icon-color="gray" icon="mdi-lock-outline" :size="5" density="compact">
							<div class="d-flex">
								<NuxtLink :to="`/lesson/PalmerEk/jubilant-sniffle/${section.title}/${step.title}`" :class="[{ active: isActiveStep(step) }]">
									{{ step.title }}
								</NuxtLink>
							</div>
						</v-timeline-item>
					</v-timeline>
				</div>
			</div>
		</v-timeline-item>
	</v-timeline>

	<!-- TODO: %Complete? -->
	<!-- <v-sheet>
		<v-progress-linear color="success" model-value="20" :height="60"></v-progress-linear>
	</v-sheet> -->
</template>

<style scoped>
	.active {
		color: #4caf50;
	}
</style>
