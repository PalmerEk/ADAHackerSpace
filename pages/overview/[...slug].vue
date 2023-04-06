<script setup>
	const route = useRoute();
	const slug = route.params.slug;

	const contentURL = slug.join("/");
	const lessonURL = slug.slice(0, -1).join("/");

	const { data: content } = await useAsyncData(contentURL, () => {
		return queryContent(contentURL).findOne();
	});

	const { data: surrounding } = await useAsyncData(`nav_${lessonURL}`, () => {
		return queryContent(lessonURL).where({ _partial: false }).only(["_path", "title"]).sort({ _file: 1 }).findSurround(`/${contentURL}`);
	});

	const next = computed(() => {
		const [prev, next] = surrounding.value;
		return next;
	});

	const prev = computed(() => {
		const [prev, next] = surrounding.value;
		return prev;
	});

	const breadcrumbs = ref([
		{
			title: "Builds",
			href: "/builds",
		},
		{
			title: content.value.title,
			href: route.fullPath,
		},
	]);
</script>

<template>
	<NuxtLayout name="lesson">
		<template #toc>
			<v-navigation-drawer>
				<LessonTOC :lessonURL="lessonURL" />
			</v-navigation-drawer>
		</template>

		<div>
			<v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

			<v-img :src="content.image" :aspectRatio="1.7778"></v-img>

			<ContentRenderer :value="content">
				<ContentRendererMarkdown :value="content" />
			</ContentRenderer>
		</div>

		<v-sheet height="56" width="100%" style="z-index: 1004; position: fixed; left: 0; bottom: 0">
			<v-btn rounded="xl" size="large" block :to="next._path">Start This Build</v-btn>
		</v-sheet>
	</NuxtLayout>
</template>
