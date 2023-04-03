<script setup>
	const props = defineProps({
		link: {
			type: Object,
			required: true,
		},
		depth: {
			type: Number,
			required: false,
			default: 0,
		},
		maxDepth: {
			type: Number,
			required: false,
			default: 2,
		},
	});

	const isOverview = computed(() => {
		return props.link._path.endsWith("overview");
	});
</script>

<template>
	<div v-if="!isOverview && depth < maxDepth">
		<!-- Section header -->
		<h3 v-if="depth === 0">{{ link.title }}</h3>
		<h4 v-else>
			<NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
		</h4>

		<v-list :lines="false" density="compact" nav>
			<v-list-item v-for="item in link.children" :key="item._path" active-color="primary">
				<v-list-item-title>
					<LessonTOCLink :link="item" :depth="depth + 1" :max-depth="maxDepth" />
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</div>
</template>
