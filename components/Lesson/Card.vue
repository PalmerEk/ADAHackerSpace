<script setup>
	const props = defineProps({
		lesson: {
			type: Object,
			required: true,
		},
	});

	const overview = computed(() => props.lesson.overview);
</script>

<template>
	<v-card>
		<NuxtLink :to="`/lesson/overview/${lesson.id}`">
			<v-img :src="overview.image" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" cover>
				<v-card-title class="text-white" v-text="overview.title"></v-card-title>
			</v-img>
		</NuxtLink>

		<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

			<v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

			<v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
		</v-card-actions>
	</v-card>
</template>
