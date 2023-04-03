<script setup>
	const props = defineProps({
		lessonURL: {
			type: String,
			required: false,
		},
		currentURL: {
			type: String,
			required: false,
		},
		maxDepth: {
			type: Number,
			required: false,
			default: 2,
		},
	});

	const findRoot = (nav) => {
		const root = nav.find((item) => item._path === `/${props.lessonURL}`);
		if (root) return root.children;
		return findRoot(nav[0].children);
	};

	const { data: navigation } = await useAsyncData(`toc_${props.lessonURL}`, () => {
		return fetchContentNavigation(queryContent(props.lessonURL).where({ _partial: false }).sort({ _file: 1 }));
	});

	const rootNav = computed(() => {
		return findRoot(navigation.value);
	});
</script>

<template>
	<nav>
		<!-- TODO: follow allong (spy) -->
		<!-- TODO: Highligh current lesson/section -->
		<!-- TODO: Remove "link" formating -->
		<LessonTOCLink v-for="item in rootNav" :key="item._path" :link="item" :depth="0" :max-depth="maxDepth" />
	</nav>
</template>
