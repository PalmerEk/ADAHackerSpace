<script setup>
	import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";

	definePageMeta({
		layout: "lesson",
	});

	const route = useRoute();
	const { isReady, getLesson } = useLessons();

	const currentLesson = ref({});
	const currentStep = ref(null);
	const steps = ref([]);

	const setLesson = async () => {
		const syllabus = getLesson(route.params.id);
		const { lesson, steps: lessonSteps, getStep } = await useLesson(syllabus);
		currentLesson.value = lesson;

		currentStep.value = await getStep(route.params.step_number);
		steps.value = lessonSteps.value;
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
			<div class="flex flex-row">
				<div class="basis-1/12">
					<TOC :steps="steps" :currentStep="currentStep" :currentLesson="currentLesson" />
				</div>

				<article class="prose basis-11/12 p-8 max-w-[100%]">
					<ContentRenderer v-if="currentStep" :value="currentStep">
						<h1>{{ currentStep.title }}</h1>
						<ContentRendererMarkdown :value="currentStep" />
					</ContentRenderer>
				</article>
			</div>

			<div class="grid grid-cols-2 pb-10">
				<div class="place-self-start pl-10">
					<NuxtLink v-if="currentStep.prevStep" :to="`/lesson/${route.params.id}/step/${currentStep.prevStep.ordinal}`">
						<button
							type="button"
							class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
						>
							<ArrowLeftIcon class="h-6 w-6 text-gray-500" /> {{ currentStep.prevStep.title }}
						</button>
					</NuxtLink>
				</div>

				<div class="place-self-end pr-10">
					<NuxtLink v-if="currentStep.nextStep" :to="`/lesson/${route.params.id}/step/${currentStep.nextStep.ordinal}`">
						<button
							type="button"
							class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
						>
							<ArrowRightIcon class="h-6 w-6 text-gray-500" /> {{ currentStep.nextStep.title }}
						</button>
					</NuxtLink>
				</div>
			</div>
		</div>
	</main>
	<!-- TODO: Rewards? -->
	<!-- Maybe this is handled by a desginated "currentStep" page for the lesson? -->
	<!-- TODO: Start Lesson -->
</template>
