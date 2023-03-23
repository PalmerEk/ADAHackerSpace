<script setup>
	import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";

	definePageMeta({
		layout: "lesson",
	});

	const route = useRoute();
	const { isLoading, getLesson, getStep } = useLessons();
	const lesson = await getLesson(route.params.id);

	const { step, prevStep, nextStep } = await getStep(lesson, route.params.step_number);
</script>

<!-- NOTE: Probably need to move the page structure to the layout -->
<!-- include slots for TOC, TOCFooter,  Content and ContentFooter -->
<template>
	<main v-if="lesson">
		<div class="">
			<div class="flex flex-row">
				<div class="basis-3/12">
					<TOC :lesson="lesson" :section="step.sectionIndx" :step="step.stepIndx" />
				</div>

				<div class="basis-9/12 p-8">
					<article class="prose">
						<h1>{{ step.section.title }}</h1>
						<ContentRenderer :value="step.content">
							<ContentRendererMarkdown :value="step.content" :excerpt="true" />
						</ContentRenderer>
					</article>

					<!-- Next/Prev -->
					<div class="flex flex-row">
						<div class="basis-1/2 place-self-start">
							<NuxtLink v-if="prevStep" :to="`/lesson/${route.params.id}/step/${prevStep.absStepNumber}`">
								<button
									type="button"
									class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
								>
									<ArrowLeftIcon class="h-6 w-6 text-gray-500" /> {{ prevStep.content.title }}
								</button>
							</NuxtLink>
						</div>

						<div class="basis-1/2 place-self-end">
							<NuxtLink v-if="nextStep" :to="`/lesson/${route.params.id}/step/${nextStep.absStepNumber}`">
								<button
									type="button"
									class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
								>
									<ArrowRightIcon class="h-6 w-6 text-gray-500" /> {{ nextStep.content.title }}
								</button>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
