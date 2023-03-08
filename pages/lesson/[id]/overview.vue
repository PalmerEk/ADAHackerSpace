<script setup>
	definePageMeta({
		layout: "lesson",
	});

	const route = useRoute();
	const { isReady, getLesson } = useLessons();

	const currentStep = ref(null);
	const steps = ref([]);

	const setLesson = async () => {
		console.log(route.params.id);
		const syllabus = getLesson(route.params.id);
		const { steps: lessonSteps, getStep } = await useLesson(syllabus);
		steps.value = lessonSteps.value;

		currentStep.value = await getStep(0);
	};

	if (isReady.value) {
		setLesson();
	} else {
		watch(
			() => isReady.value,
			(val) => {
				if (val) {
					setLesson();
				}
			}
		);
	}
</script>

<template>
	<main>
		<div v-if="currentStep">
			<h2>What you'll Learn</h2>
			<hr />
			<div class="flex flex-row">
				<article class="prose basis-12/12 p-8 max-w-[100%]">
					<ContentRenderer v-if="currentStep" :value="currentStep">
						<ContentRendererMarkdown :value="currentStep" :excerpt="true" />
					</ContentRenderer>
				</article>
			</div>

			<h3>How it goes</h3>
			<hr />
			TODO: List of steps

			<h2>What you'll Get</h2>
			TODO: Rewards
			<hr />
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
