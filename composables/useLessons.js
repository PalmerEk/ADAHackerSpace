import { createGlobalState, usePreferredLanguages } from "@vueuse/core";
import markdownParser from "@nuxt/content/transformers/markdown";

// This is all shit code, just trying to get something working

export const useLessons = createGlobalState(() => {
	const languages = usePreferredLanguages();
	const language = ref("en");

	const isReady = ref(false);
	const isLoading = ref(0);
	const error = ref(undefined);

	const lessons = ref(null);

	// TODO: Get this from the blockchain (based on the policy id)
	// TODO, fetch lessons from the blockchain
	const fetchLessons = async () => {
		error.value = undefined;
		isLoading.value++;

		// Grab the available lesson ids from the gateway
		const lessonIds = await $fetch("/api/preview/lessons");
		// Get the details of each lesson
		const approvedLessons = await Promise.all(
			lessonIds.map(async (id) => {
				return await $fetch(`/api/preview/lessons/${id}`);
			})
		);

		// lessons.value = await Promise.all(
		// 	approvedLessons.map(async (lesson) => {
		// 		const docket = await fetch(lesson.docket).then((res) => res.json());
		// 		return { ...lesson, docket };
		// 	})
		// );
	};

	const fetchStepsContent = async (steps) => {
		return await Promise.all(
			steps.map(async (stepURL) => {
				return await markdownParser.parse(stepURL, await $fetch(stepURL));
			})
		);
	};

	const getLessonByURL = async (url) => {
		isLoading.value++;
		let lesson = null;
		try {
			lesson = await $fetch(`/api/lessons/${url}`);

			// Determine the best available language based on the user's browser settings, default to english
			language.value = languages.value.reduceRight((bestLang, lang) => {
				if (lesson[lang.slice(0, 2)]) bestLang = lang.slice(0, 2);
				return bestLang;
			}, "en");

			return lesson[language.value];
		} catch (err) {
			error.value = err;
		} finally {
			isLoading.value--;
			if (error.value) return null;
		}
	};

	const getLesson = async (lesson_id) => {
		isLoading.value++;
		let lesson = null;
		try {
			if (!lessons.value) await fetchLessons();

			lesson = lessons.value.find((lesson) => lesson.id === lesson_id);

			// Determine the best available language based on the user's browser settings, default to english
			language.value = languages.value.reduceRight((bestLang, lang) => {
				if (lesson.docket.sections[0][lang.slice(0, 2)]) bestLang = lang.slice(0, 2);
				return bestLang;
			}, "en");

			// update the docket to replace the sections with the content from the markdown files (in the correct language)
			lesson.docket.sections = await Promise.all(
				lesson.docket.sections.map(async (section) => {
					// already loaded correct language.  This is somewhat iffy, probably should replace original section but instead add new content section
					// but don't want rest of system to have to deal with languages as it's very unlikely the user will switch languages in the middle of a session
					if (section[language.value]) return { title: section[language.value].title, steps: await fetchStepsContent(section[language.value].steps) };
					return section;
				})
			);
		} catch (err) {
			error.value = err;
		} finally {
			isLoading.value--;
			if (error.value) return null;
			return lesson;
		}
	};

	// get a specific step from a lesson (0 indexed)
	const _getStep = async (lesson, absolute_step_number) => {
		const result = { sectionIndx: 0, section: null, stepIndx: 0, content: null, absStepNumber: absolute_step_number };

		let stepCount = 0;
		for (let i = 0; i < lesson.docket.sections.length; i++) {
			for (let j = 0; j < lesson.docket.sections[i].steps.length; j++) {
				if (stepCount === absolute_step_number) {
					result.sectionIndx = i;
					result.stepIndx = j;
					result.section = lesson.docket.sections[i];
					result.content = result.section.steps[j];
				}
				stepCount++;
			}
		}

		if (!result.content) return null;
		return result;
	};

	const getStep = async (lesson, absolute_step_number) => {
		const absStep = parseInt(absolute_step_number);
		return {
			step: await _getStep(lesson, absStep),
			prevStep: await _getStep(lesson, absStep - 1),
			nextStep: await _getStep(lesson, absStep + 1),
		};
	};

	const init = async () => {
		await fetchLessons();
	};

	init();

	return {
		lessons: readonly(lessons),
		language: readonly(language),

		getLesson,
		getLessonByURL,
		getStep,

		isReady,
		isLoading,
		error,
	};
});
