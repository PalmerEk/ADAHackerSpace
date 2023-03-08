import { createGlobalState } from "@vueuse/core";
import markdownParser from "@nuxt/content/transformers/markdown";

// This is all shit code, just trying to get something working

export const useLessons = createGlobalState(() => {
	const LESSON_POLICY_ID = "a890e508e5fb46eb1ad098043d3961d7ad5fc1662391b23a8a59e5e3";

	const isReady = ref(false);
	const isLoading = ref(false);
	const error = ref(undefined);

	// TODO: Get this from the blockchain (based on the policy id)
	const LESSON_URLS = ["/lessons/test1/syllabus.json"];
	const lessons = ref([]);

	// TODO, fetch lessons from the blockchain
	// thought here is that lessons are created by whomever then submitted for approval
	// once approved, an NFT is generated and sent to the creator.  That NFT contains a link to to syllabus (ipfs?)
	// the syllabus contains the links to the lesson content, rewards, etc.
	const init = async () => {
		error.value = undefined;
		isReady.value = false;
		isLoading.value = true;

		const requests = LESSON_URLS.map((url) => {
			return fetch(url).then(function (response) {
				return response.json();
			});
		});

		// Resolve all the promises
		Promise.all(requests)
			.then((results) => {
				lessons.value = results;
				isReady.value = true;
				isLoading.value = false;
			})
			.catch((e) => {
				console.log("error loading lessons", e);
				error.value = e;
			});
	};

	const getLesson = (id) => {
		return lessons.value.find((lesson) => lesson.id === id);
	};

	init();

	return {
		lessons: readonly(lessons),

		getLesson,

		isReady,
		isLoading,
		error,
	};
});

export const useLesson = (syllabus) =>
	createGlobalState(async () => {
		const isReady = ref(false);
		const isLoading = ref(false);
		const error = ref(undefined);

		const lesson = ref({});
		const steps = ref([]);

		// if syllabus is a string, assume it's a URL
		// if it's an object, assume it's the syllabus
		// const syllabusURL = typeof syllabus === "string" ? syllabus : syllabus.url;

		if (typeof syllabus === "string") {
			lesson.value = (await fetch(syllabus)).json();
		} else {
			//lesson.value = { ...syllabus, overviewMD: await markdownParser.parse(syllabus.overview, await (await fetch(syllabus.overview)).text()) };
			lesson.value = syllabus;
		}

		const init = async () => {
			error.value = undefined;
			isReady.value = true;
			isLoading.value = false;
		};

		init();

		const getStep = async (step) => {
			if (typeof step !== "number") step = parseInt(step);

			if (step >= lesson.value.steps.length) return null;
			if (step < 0) return null;

			if (steps.value[step]) return steps.value[step];

			const stepURL = lesson.value.steps[step].source;

			steps.value[step] = await markdownParser.parse(stepURL, await $fetch(stepURL));
			steps.value[step].ordinal = step;
			steps.value[step].prevStep = step > 0 ? await getStep(step - 1) : null;
			steps.value[step].nextStep = step < lesson.value.steps.length ? await getStep(step + 1) : null;

			return steps.value[step];
		};

		return {
			lesson: readonly(lesson),

			getStep,
			steps,

			isReady,
			isLoading,
			error,
		};
	})();
