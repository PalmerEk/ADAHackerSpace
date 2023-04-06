<script setup>
	import { usePreferredLanguages } from "@vueuse/core";

	// Get the users preferred language
	const languages = usePreferredLanguages();
	const language = languages.value[0].slice(0, 2);

	// Fetch all the lessons for the current language
	const { data: navigation } = await useAsyncData("navigation", () => {
		return fetchContentNavigation(
			queryContent(`/lessons/${language}`)
				//.where({ published: { $exists: true } })
				.sort({ date: -1 })
		);
	});

	// We can skip the top 2 levels (lessons and language)
	const lessons = computed(() => {
		return navigation.value[0].children[0].children;
	});
</script>

<template>
	<NuxtLayout>
		<v-container fluid>
			<v-row dense>
				<v-col v-for="lesson in lessons" :key="lesson._path" :cols="4">
					<LessonCard :lesson="lesson" />
				</v-col>
			</v-row>
		</v-container>
	</NuxtLayout>
</template>
